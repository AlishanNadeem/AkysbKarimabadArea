import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { goBack, navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useToggle from "../../hooks/useToggle"
import { setAlertMode } from "../../redux/slices/general.slice"

const useConfigureController = () => {

    const dispatch = useDispatch()
    const { showConfirmModal, showInfoModal } = useModal()

    const { value: is_location_sharing_enabled, toggle: toggleLocationSharing } = useToggle(false)
    const { value: is_notifications_enabled, toggle: toggleNotifications } = useToggle(false)

    const onTriggerAlert = useCallback(async () => {

        const confirmed = await showConfirmModal({
            title: "SOS Alert",
            message: "Are you sure you want to trigger SOS alert?"
        })

        if (confirmed) {

            dispatch(setAlertMode("all"))

            setTimeout(() => {
                showInfoModal({
                    title: "Thank You!",
                    message: "Alert has been sent successfully",
                    onConfirm: goBack
                })
            }, 300)

        }

    }, [])

    const onCheckInSettings = useCallback(() => {
        navigate(ROUTES.CHECKIN_SETTINGS)
    }, [])

    return {
        values: {
            is_location_sharing_enabled,
            is_notifications_enabled,
        },
        functions: {
            onLocationSharingToggle: toggleLocationSharing,
            onNotificationsToggle: toggleNotifications,
            onTriggerAlert,
            onCheckInSettings
        },
    }

}

export default useConfigureController