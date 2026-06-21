import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { selectAlertMode } from "../../redux/selectors"

const useHomeController = () => {


    const [timer, setTimer] = useState(60)
    const intervalRef = useRef(null)

    const startTimer = () => {
        setTimer(60)
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    useEffect(() => {
        startTimer()
        return () => clearInterval(intervalRef.current)
    }, [])

    const alert_mode = useSelector(selectAlertMode)

    const onCheckIn = useCallback(() => {
        navigate(ROUTES.DAILY_CHECK_IN)
    }, [])

    const onAlert = useCallback(() => {
        navigate(ROUTES.ALERT_DETAILS)
    }, [])

    return {
        values: {
            alert_mode, timer
        },
        functions: {
            onAlert,
            onCheckIn
        }
    }
}

export default useHomeController