import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"

const useEventsController = () => {

    const onCreate = useCallback(() => {
        navigate(ROUTES.MANAGE_EVENT)
    }, [])

    const onEdit = useCallback((id) => {
        navigate(ROUTES.MANAGE_EVENT, { id })
    }, [])

    return {
        values: {
            events: [],
        },
        functions: {
            onCreate,
            onEdit,
        },
    }
}

export default useEventsController
