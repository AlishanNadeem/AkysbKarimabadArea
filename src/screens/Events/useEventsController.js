import { useCallback, useMemo } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import { useGetEventsQuery } from "../../redux/apis/Event"

const matchesEventSearch = (event, query) => {
    const q = query.toLowerCase()
    return (
        event.name?.toLowerCase().includes(q)
        || event.venue?.toLowerCase().includes(q)
        || event.type?.toLowerCase().includes(q)
        || event.status?.toLowerCase().includes(q)
    )
}

const useEventsController = () => {

    const { data, isLoading, isFetching, refetch } = useGetEventsQuery()
    const { search, debounced, onChange: onSearchChange } = useSearch()

    const events = data?.data ?? []

    const filtered_events = useMemo(() => {
        if (!debounced.trim()) return events
        return events.filter((item) => matchesEventSearch(item, debounced))
    }, [events, debounced])

    const onCreate = useCallback(() => {
        navigate(ROUTES.MANAGE_EVENT)
    }, [])

    const onEdit = useCallback((id) => {
        navigate(ROUTES.MANAGE_EVENT, { id })
    }, [])

    return {
        values: {
            search,
            data: filtered_events,
            isLoading,
            refreshing: isFetching,
            has_search: !!debounced.trim(),
        },
        functions: {
            onSearchChange,
            onCreate,
            onEdit,
            onRefresh: refetch,
        },
    }
}

export default useEventsController
