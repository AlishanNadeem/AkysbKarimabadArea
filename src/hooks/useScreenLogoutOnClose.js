import { useEffect, useRef } from "react"
import { AppState } from "react-native"
import { useDispatch } from "react-redux"
import { clearCredentials } from "../redux/slices/auth.slice"

export const useScreenLogoutOnClose = () => {

    const app_state = useRef(AppState.currentState)
    const dispatch = useDispatch()

    useEffect(() => {

        const subscription = AppState.addEventListener("change", handleAppStateChange)

        return () => {
            subscription.remove()
        }

    }, [])

    const handleAppStateChange = async (next_app_state) => {

        if (app_state.current.match(/active/) && next_app_state === "background") {
            dispatch(clearCredentials())
        }

        app_state.current = next_app_state

    }

}