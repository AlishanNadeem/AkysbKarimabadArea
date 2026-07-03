import { useCallback, useEffect, useMemo, useState } from "react"
import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import { useModal } from "../../../contexts/ModalContext"
import { EVENTS, PAYMENT_METHODS, PAYMENT_STATUSES, REGISTRATION_STATUSES } from "../../../helpers/data"
import { navigate } from "../../../helpers/navigation"
import { formatParticipantPhone } from "../../../helpers/participant"
import { ROUTES } from "../../../helpers/routes"
import {
    useGetRegistrationByIdQuery,
    useUpdateRegistrationStatusMutation,
} from "../../../redux/apis/Registration"

const useDetailController = () => {

    const route = useRoute()
    const { registration_id, event_id } = route.params ?? {}
    const { showConfirmModal, showInfoModal } = useModal()
    const [action_loading, setAction_loading] = useState(false)

    const { data, isLoading, refetch } = useGetRegistrationByIdQuery(
        { id: registration_id },
        { skip: !registration_id }
    )

    const [updateRegistrationStatus] = useUpdateRegistrationStatusMutation()

    const registration = data?.data

    useEffect(() => {
        if (!registration_id) {
            navigate(ROUTES.VIEW_REGISTRATIONS, { screen: ROUTES.VIEW_REGISTRATIONS_SELECT_EVENT })
        }
    }, [registration_id])

    const event = useMemo(() => {
        if (!registration?.event) return null
        return EVENTS.find((item) => (item._id ?? item.id) === registration.event) ?? null
    }, [registration?.event])

    const show_actions = registration?.payment?.status === "pending"
        && registration?.status !== "cancelled"

    const registration_summary = useMemo(() => {
        if (!registration) return []
        const payment_label = PAYMENT_STATUSES.find(
            (item) => item.value === registration.payment?.status
        )?.label ?? registration.payment?.status
        const status_label = REGISTRATION_STATUSES.find(
            (item) => item.value === registration.status
        )?.label ?? registration.status
        const method_label = PAYMENT_METHODS.find(
            (item) => item.value === registration.payment?.method
        )?.label ?? registration.payment?.method

        return [
            { label: "Registration Date", value: dayjs(registration.created_at).format("MMM D, YYYY h:mm A") },
            { label: "Status", value: status_label, highlight: true },
            { label: "Payment Status", value: payment_label, highlight: true },
            ...(registration.payment?.method ? [{ label: "Payment Method", value: method_label }] : []),
            {
                label: "Total Amount",
                value: registration.amount_paid > 0 ? `Rs. ${registration.amount_paid}` : "Free",
                highlight: true,
            },
            ...(registration.payment?.notes ? [{ label: "Notes", value: registration.payment.notes }] : []),
        ]
    }, [registration])

    const event_summary = useMemo(() => {
        if (!event) return []
        return [
            { label: "Event", value: event.name },
            { label: "Venue", value: event.venue },
            { label: "Fee per participant", value: event.is_free || event.fees === 0 ? "Free" : `Rs. ${event.fees}` },
        ]
    }, [event])

    const participants_summary = useMemo(() => {
        if (!registration?.participants) return []
        return registration.participants.map((item, index) => ({
            title: `Participant ${index + 1}`,
            rows: [
                { label: "Full Name", value: item.participant_data?.name },
                { label: "Age", value: item.participant_data?.age?.toString() },
                { label: "Contact", value: formatParticipantPhone(item.participant_data?.phone) },
                { label: "YSB ID", value: item.participant_data?.membership_id || "—" },
                { label: "Jamatkhana", value: item.participant_data?.jamatkhana },
                { label: "Type", value: item.is_existing ? "Existing Member" : "New Registration" },
            ],
        }))
    }, [registration?.participants])

    const handleAction = useCallback(async (action) => {
        const is_accept = action === "accept"
        const confirmed = await showConfirmModal({
            title: is_accept ? "Accept Registration" : "Reject Registration",
            message: is_accept
                ? "Mark this registration payment as paid?"
                : "Are you sure you want to reject this registration?",
        })

        if (!confirmed) return

        setAction_loading(true)

        try {
            await updateRegistrationStatus({ id: registration_id, action }).unwrap()
            await refetch()
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
            setAction_loading(false)
        }
    }, [registration_id, showConfirmModal, showInfoModal, updateRegistrationStatus, refetch])

    const onAccept = useCallback(() => handleAction("accept"), [handleAction])
    const onReject = useCallback(() => handleAction("reject"), [handleAction])

    return {
        values: {
            registration,
            isLoading,
            show_actions,
            action_loading,
            registration_summary,
            event_summary,
            participants_summary,
            event_id,
        },
        functions: {
            onAccept,
            onReject,
        },
    }
}

export default useDetailController
