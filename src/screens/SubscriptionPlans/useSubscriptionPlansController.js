import { useCallback } from "react"
import { useModal } from "../../contexts/ModalContext"
import usePagination from "../../hooks/usePagination"
import { SUBSCRIPTION_PLANS } from "../../helpers/data"
import { reset } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"

const useSubscriptionPlansController = () => {

    const { showInfoModal } = useModal()

    const { data, nextPage, resetPage, refreshing, loading_more } = usePagination({ source: SUBSCRIPTION_PLANS, page_size: 10 })

    const onPressContinue = useCallback((plan) => {

        const modal_text = plan?.modal_text

        showInfoModal({
            title: "Thank You!",
            message: modal_text,
            onConfirm: () => {
                setTimeout(() => {
                    showInfoModal({
                        title: "Login",
                        message: "Account created successfully login now",
                        onConfirm: () => {
                            reset(ROUTES.LOGIN)
                        }
                    })
                }, 500)
            }
        })

    }, [])

    const onRefresh = useCallback(() => {
        resetPage() // need to pass refetch here
    }, [data])

    return {
        values: {
            data,
            isLoading: false,
            loading_more,
            refreshing
        },
        functions: {
            onPressContinue,
            nextPage,
            onRefresh
        },
    }
}

export default useSubscriptionPlansController