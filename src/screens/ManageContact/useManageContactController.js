import { useNavigation, useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import images from "../../assets/images"
import { useModal } from "../../contexts/ModalContext"
import { CONTACTS } from "../../helpers/data"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"

const manage_contact_schema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    relationship: Yup.string().required("Relationship is required"),
    phone: Yup.string()
        .required("Phone number is required")
})

const initial = {
    full_name: "",
    relationship: "",
    phone: "",
}

const useManageContactController = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { showInfoModal } = useModal()
    const { value: image_modal, toggle: toggleImageModal } = useToggle(false)
    const { value: relationship_modal, toggle: toggleRelationshipModal } = useToggle(false)
    const { image, openCamera, openGallery } = useImagePicker({
        onImageSelected: (selected) => {
        }
    })

    const { id } = route.params || {}
    const is_editing = !!id

    useEffect(() => {
        navigation.setOptions({
            title: is_editing ? "Update Contact" : "Add New Contact"
        })
    }, [is_editing])

    const formik = useFormik({
        initialValues: initial,
        validationSchema: manage_contact_schema,
        onSubmit: async (values, { resetForm }) => {
            showInfoModal({
                title: "Thank You!",
                message: is_editing
                    ? "You have successfully updated the ICE contact."
                    : "You have successfully created a new ICE contact.",
                onConfirm: goBack,
            })
            resetForm()
        }
    })

    useEffect(() => {
        if (is_editing) {

            const contact = CONTACTS.find(item => item.id === id)

            if (contact) {
                formik.setValues({
                    full_name: contact.name,
                    relationship: contact.relation,
                    phone: contact.phone,
                })
            }

        }
    }, [id])

    return {
        values: {
            formik,
            image: image || images.dummy,
            image_modal,
            relationship_modal,
            button_text: is_editing ? "Update" : "Save"
        },
        functions: {
            toggleImageModal,
            toggleRelationshipModal,
            openCamera,
            openGallery,
        },
    }
}

export default useManageContactController