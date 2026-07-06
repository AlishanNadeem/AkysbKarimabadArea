import { useCallback } from "react"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { HOME_STATS, HOME_UPCOMING_EVENTS } from "../../helpers/data"
import { getGreeting } from "../../helpers/general"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { selectUser } from "../../redux/selectors"

const useHomeController = () => {

    const user = useSelector(selectUser)

    const onCreateEvent = useCallback(() => {
        navigate(ROUTES.MANAGE_EVENT)
    }, [])

    const onBrowseEvents = useCallback(() => {
        navigate(ROUTES.EVENTS)
    }, [])

    const onNewRegistration = useCallback(() => {
        navigate(ROUTES.MANAGE_REGISTRATION)
    }, [])

    const onViewRegistrations = useCallback(() => {
        navigate(ROUTES.VIEW_REGISTRATIONS)
    }, [])

    const onEditEvent = useCallback((id) => {
        navigate(ROUTES.MANAGE_EVENT, { id })
    }, [])

    return {
        values: {
            greeting: getGreeting(),
            today_date: dayjs().format("dddd, MMMM D, YYYY"),
            user_name: user?.name ?? "Member",
            user_subtitle: user?.role?.name,
            stats: HOME_STATS,
            upcoming_events: HOME_UPCOMING_EVENTS,
        },
        functions: {
            onCreateEvent,
            onBrowseEvents,
            onNewRegistration,
            onViewRegistrations,
            onEditEvent,
        },
    }
}

export default useHomeController
