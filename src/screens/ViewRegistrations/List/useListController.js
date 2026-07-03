import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { useModal } from "../../../contexts/ModalContext"
import { PAYMENT_STATUSES, REGISTRATION_STATUSES } from "../../../helpers/data"
import { navigate } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import useSearch from "../../../hooks/useSearch"
import { useGetEventsQuery } from "../../../redux/apis/Event"
import {
    useGetRegistrationsByEventQuery,
    useUpdateRegistrationStatusMutation,
} from "../../../redux/apis/Registration"
import { resetRegistration, setRegistrationEvent } from "../../../redux/slices/registration.slice"

const matchesRegistrationSearch = (registration, query) => {
    const q = query.toLowerCase()

    const participant_names = registration.participants
        ?.map((item) => item.participant_data?.name)
        .filter(Boolean)
        .join(" ")
        .toLowerCase() ?? ""

    const membership_ids = registration.participants
        ?.map((item) => item.participant_data?.membership_id)
        .filter(Boolean)
        .join(" ")
        .toLowerCase() ?? ""

    const payment_label = PAYMENT_STATUSES.find(
        (item) => item.value === registration.payment?.status
    )?.label?.toLowerCase() ?? ""

    const status_label = REGISTRATION_STATUSES.find(
        (item) => item.value === registration.status
    )?.label?.toLowerCase() ?? ""

    return (
        participant_names.includes(q)
        || membership_ids.includes(q)
        || registration.payment?.status?.toLowerCase().includes(q)
        || payment_label.includes(q)
        || registration.status?.toLowerCase().includes(q)
        || status_label.includes(q)
    )
}

const useListController = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute()
    const { event_id, event_name } = route.params ?? {}
    const { showConfirmModal, showInfoModal } = useModal()
    const [loading_id, setLoading_id] = useState(null)
    const { search, debounced, onChange: onSearchChange } = useSearch()

    const { data: events_data } = useGetEventsQuery()
    const { data, isLoading, isFetching, refetch } = useGetRegistrationsByEventQuery(
        { event_id },
        { skip: !event_id }
    )

    const [updateRegistrationStatus] = useUpdateRegistrationStatusMutation()

    const event = useMemo(() =>
        (events_data?.data ?? []).find(
            (item) => (item._id ?? item.id) === event_id
        ),
    [events_data, event_id])

    const registrations = data?.data ?? []

    const filtered_registrations = useMemo(() => {
        if (!debounced.trim()) return registrations
        return registrations.filter((item) => matchesRegistrationSearch(item, debounced))
    }, [registrations, debounced])

    useEffect(() => {
        if (event_name) {
            navigation.setOptions({ title: event_name })
        }
    }, [event_name, navigation])

    useEffect(() => {
        if (!event_id) {
            navigate(ROUTES.VIEW_REGISTRATIONS, { screen: ROUTES.VIEW_REGISTRATIONS_SELECT_EVENT })
        }
    }, [event_id])

    const onPress = useCallback((registration_id) => {
        navigate(ROUTES.VIEW_REGISTRATIONS, {
            screen: ROUTES.VIEW_REGISTRATION_DETAIL,
            params: { registration_id, event_id, event_name },
        })
    }, [event_id, event_name])

    const handleAction = useCallback(async (registration_id, action) => {
        const is_accept = action === "accept"
        const confirmed = await showConfirmModal({
            title: is_accept ? "Accept Registration" : "Reject Registration",
            message: is_accept
                ? "Mark this registration payment as paid?"
                : "Are you sure you want to reject this registration?",
        })

        if (!confirmed) return

        setLoading_id(registration_id)

        try {
            await updateRegistrationStatus({ id: registration_id, action }).unwrap()
            showInfoModal({
                title: is_accept ? "Payment Accepted" : "Registration Rejected",
                message: is_accept
                    ? "The registration payment has been marked as paid."
                    : "The registration has been rejected.",
            })
        } catch {
            showInfoModal({
                title: "Error",
                message: "Something went wrong. Please try again.",
            })
        } finally {
            setLoading_id(null)
        }
    }, [showConfirmModal, showInfoModal, updateRegistrationStatus])

    const onAccept = useCallback((registration_id) => {
        handleAction(registration_id, "accept")
    }, [handleAction])

    const onReject = useCallback((registration_id) => {
        handleAction(registration_id, "reject")
    }, [handleAction])

    const onNewRegistration = useCallback(() => {
        dispatch(resetRegistration())
        if (event) {
            dispatch(setRegistrationEvent(event))
            navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_PARTICIPANT_INFO })
            return
        }
        navigate(ROUTES.MANAGE_REGISTRATION)
    }, [dispatch, event])

    return {
        values: {
            search,
            data: filtered_registrations,
            isLoading,
            refreshing: isFetching,
            loading_id,
            has_search: !!debounced.trim(),
        },
        functions: {
            onSearchChange,
            onPress,
            onAccept,
            onReject,
            onNewRegistration,
            onRefresh: refetch,
        },
    }
}

export default useListController
