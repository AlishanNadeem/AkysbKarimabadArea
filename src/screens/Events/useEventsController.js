import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetEventsQuery } from "../../redux/apis/Event"

const useEventsController = () => {

    const { data, isLoading, isFetching, refetch } = useGetEventsQuery()

    const onCreate = useCallback(() => {
        navigate(ROUTES.MANAGE_EVENT)
    }, [])

    const onEdit = useCallback((id) => {
        navigate(ROUTES.MANAGE_EVENT, { id })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            isLoading,
            refreshing: isFetching,
        },
        functions: {
            onCreate,
            onEdit,
            onRefresh: refetch,
        },
    }
}

export default useEventsController
