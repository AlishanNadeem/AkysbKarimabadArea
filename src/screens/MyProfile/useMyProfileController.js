import { useCallback } from "react"
import { useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { selectUser } from "../../redux/selectors"

const useMyProfileController = () => {

    const user = useSelector(selectUser)

    const onChangePassword = useCallback(() => {
        navigate(ROUTES.CHANGE_PASSWORD)
    }, [])

    const onEditProfile = useCallback(() => {
        navigate(ROUTES.EDIT_PROFILE)
    }, [])

    return {
        values: {
            user: user ?? {}
        },
        functions: {
            onChangePassword,
            onEditProfile
        }
    }
}

export default useMyProfileController