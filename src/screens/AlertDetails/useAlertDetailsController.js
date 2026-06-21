import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { goBack, navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { selectAlertMode } from "../../redux/selectors"
import { setAlertMode } from "../../redux/slices/general.slice"

const useAlertDetailsController = () => {

    const dispatch = useDispatch()
    const alert_mode = useSelector(selectAlertMode)

    const onStopAlert = useCallback(() => {
        dispatch(setAlertMode(null))
        goBack()
    }, [])

    const onMap = useCallback(() => {
        navigate(ROUTES.MAP)
    }, [])

    const INFO = [
        {
            icon: images.check_badge,
            icon_background: colors.leafy_green,
            background: colors.lightest_primary,
            title: "Alert SMS Details",
            action_text: "Sent via SMS",
            onPressAction: null,
            description: "EMERGENCY: Edward Anton is unresponsive. Last check-in missed at 04:15 PM. View live location and https://lifecheck.app/track/ruth-m"
        },
        {
            icon: images.pin,
            icon_background: colors.dark_primary,
            background: colors.yellowish_primary,
            title: "Live Location Tracking",
            action_text: "Open Map",
            onPressAction: onMap,
            description: "Broadcasting now"
        },
    ]

    return {
        values: {
            alert_mode,
            info: INFO
        },
        functions: {
            onStopAlert
        }
    }
}

export default useAlertDetailsController