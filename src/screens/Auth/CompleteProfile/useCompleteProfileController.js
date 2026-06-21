import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import { useModal } from "../../../contexts/ModalContext"
import { DEFAULT_COUNTRY } from "../../../helpers/data"
import { useScreenLogoutOnClose } from "../../../hooks/useScreenLogoutOnClose"
import { useCompleteProfileMutation } from "../../../redux/apis/User"

const complete_profile_schema = Yup.object().shape({
    country_code: Yup.string()
        .required("Country code is required"),
    dialing_code: Yup.string()
        .required("Dialing code is required"),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]*$/, "Invalid phone number format")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
    date_of_birth: Yup.date()
        .nullable(),
    emergency_notes: Yup.string()
        .max(500, "Emergency note must not exceed 500 characters"),
})

const initial = {
    country_code: DEFAULT_COUNTRY.code,
    dialing_code: DEFAULT_COUNTRY.calling_code,
    phone: "",
    date_of_birth: null,
    emergency_notes: "",
}

const useCompleteProfileController = () => {

    useScreenLogoutOnClose()

    const { showInfoModal } = useModal()

    const [submit, { isLoading, isSuccess }] = useCompleteProfileMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: complete_profile_schema,
        onSubmit: async (values) => submit(values)
    })

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({
                title: "Success!",
                message: "Profile created successfully! Please buy a subscription plan to proceed further.",
                // onConfirm: () => navigate(ROUTES.SUBSCRIPTION_PLANS)
            })
        }
    }, [isSuccess])

    return {
        values: {
            formik,
            isLoading,
        },
        functions: {
        },
    }
}

export default useCompleteProfileController