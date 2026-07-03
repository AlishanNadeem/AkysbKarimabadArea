import { useCallback, useMemo } from "react"
import { navigate } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import useSearch from "../../../hooks/useSearch"
import { useGetEventsQuery } from "../../../redux/apis/Event"

const matchesEventSearch = (event, query) => {
    const q = query.toLowerCase()
    return (
        event.name?.toLowerCase().includes(q)
        || event.venue?.toLowerCase().includes(q)
        || event.type?.toLowerCase().includes(q)
    )
}

const useSelectEventController = () => {

    const { data, isLoading, isFetching, refetch } = useGetEventsQuery()
    const { search, debounced, onChange: onSearchChange } = useSearch()

    const published_events = (data?.data ?? []).filter(
        (item) => item.status === "published"
    )

    const filtered_events = useMemo(() => {
        if (!debounced.trim()) return published_events
        return published_events.filter((item) => matchesEventSearch(item, debounced))
    }, [published_events, debounced])

    const onSelectEvent = useCallback((event) => {
        navigate(ROUTES.VIEW_REGISTRATIONS, {
            screen: ROUTES.VIEW_REGISTRATIONS_LIST,
            params: {
                event_id: event._id ?? event.id,
                event_name: event.name,
            },
        })
    }, [])

    return {
        values: {
            search,
            events: filtered_events,
            isLoading,
            refreshing: isFetching,
            has_search: !!debounced.trim(),
        },
        functions: {
            onSearchChange,
            onSelectEvent,
            onRefresh: refetch,
        },
    }
}

export default useSelectEventController
