import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useGetEventsQuery } from "../../../redux/apis/Event"
import { setRegistrationEvent, resetRegistration } from "../../../redux/slices/registration.slice"
import { navigate } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"

const useSelectEventController = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetRegistration())
    }, [dispatch])
    const { data, isLoading, isFetching, refetch } = useGetEventsQuery()

    const published_events = (data?.data ?? []).filter(
        (item) => item.status === "published"
    )

    const onSelectEvent = useCallback((event) => {
        dispatch(setRegistrationEvent(event))
        navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_PARTICIPANT_INFO })
    }, [dispatch])

    return {
        values: {
            events: published_events,
            isLoading,
            refreshing: isFetching,
        },
        functions: {
            onSelectEvent,
            onRefresh: refetch,
        },
    }
}

export default useSelectEventController
