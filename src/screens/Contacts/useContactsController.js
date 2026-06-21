import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { CONTACTS } from "../../helpers/data"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import usePagination from "../../hooks/usePagination"
import useSearch from "../../hooks/useSearch"
import { setAlertMode } from "../../redux/slices/general.slice"

const useContactsController = () => {

    const dispatch = useDispatch()

    const { showInfoModal, showConfirmModal } = useModal()

    const { search, debounced, onChange: onSearchChange } = useSearch()

    const filtered_contacts = CONTACTS.filter(c =>
        c.name.toLowerCase().includes(debounced.toLowerCase()) ||
        c.relation.toLowerCase().includes(debounced.toLowerCase())
    )

    const { data, refreshing, loading_more, has_more, resetPage, nextPage } = usePagination({
        source: filtered_contacts,
        page_size: 10,
    })

    const onAdd = useCallback(() => {
        navigate(ROUTES.MANAGE_CONTACT)
    }, [])

    const onEdit = useCallback((id) => {
        navigate(ROUTES.MANAGE_CONTACT, { id })
    }, [])

    const onDelete = useCallback(async (id) => {

        const confirmed = await showConfirmModal({
            title: "Delete Contact",
            message: "Are you sure you want to delete the following ICE contact?"
        })

        if (confirmed) {
            setTimeout(() => {
                showInfoModal({
                    title: "Thank You!",
                    message: "ICE contact has been deleted."
                })
            }, 200)
        }

    }, [])

    const onAlert = useCallback(async (id) => {

        const confirmed = await showConfirmModal({
            title: "Alert Contact",
            message: "Are you sure you want to send an alert to the following contact?"
        })

        if (confirmed) {

            dispatch(setAlertMode("user"))

            setTimeout(() => {
                showInfoModal({
                    title: "Thank You!",
                    message: "Alert sent successfully to the selected contact."
                })
            }, 200)
        }

    }, [])

    return {
        values: {
            search,
            contacts: data,
            refreshing,
            loading_more,
            has_more,
        },
        functions: {
            onSearchChange,
            onAdd,
            onEdit,
            onDelete,
            onAlert,
            onRefresh: resetPage,
            onLoadMore: nextPage,
        }
    }
}

export default useContactsController