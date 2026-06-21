import { useFormik } from "formik"
import { useCallback, useEffect } from "react"
import * as Yup from "yup"
import { navigate, replace } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import { useForgetPasswordMutation } from "../../../redux/apis/Auth"

const forget_password_schema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
})

const initial = {
    email: "",
}

const useForgotPasswordController = () => {

    const [submit, { data, isLoading, isSuccess }] = useForgetPasswordMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: forget_password_schema,
        onSubmit: async (values) => submit(values)
    })

    useEffect(() => {
        if (isSuccess) {
            navigate(ROUTES.VERIFY_CODE, data?.data)
        }
    }, [isSuccess, data])

    const onBackToLogin = useCallback(() => {
        replace(ROUTES.LOGIN)
    }, [])

    return {
        values: {
            formik,
            isLoading
        },
        functions: {
            onBackToLogin
        },
    }
}

export default useForgotPasswordController