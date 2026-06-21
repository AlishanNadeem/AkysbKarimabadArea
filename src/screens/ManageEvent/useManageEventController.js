import { useNavigation, useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useCallback, useEffect, useMemo } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { EVENT_TYPES, EVENTS } from "../../helpers/data"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"

const parseTimeValue = (time) => {
    if (!time) return null
    const [hours, minutes] = time.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
}

const mapEventToFormValues = (event) => ({
    name: event.name ?? "",
    description: event.description ?? "",
    type: event.type ?? "",
    date_from: event.date?.from ? new Date(event.date.from) : null,
    date_to: event.date?.to ? new Date(event.date.to) : null,
    time_from: parseTimeValue(event.time?.from),
    time_to: parseTimeValue(event.time?.to),
    venue: event.venue ?? "",
    fees: event.fees?.toString() ?? "",
    age_from: event.age?.from?.toString() ?? "",
    age_to: event.age?.to?.toString() ?? "",
    max_registrations_enabled: event.max_registrations?.enabled ?? false,
    max_registrations_limit: event.max_registrations?.limit?.toString() ?? "",
    registration_deadline: event.registration_deadline
        ? new Date(event.registration_deadline)
        : null,
    image: event.image ?? null,
})

const getEventSchema = (is_editing) => Yup.object().shape({
    name: Yup.string()
        .min(2, "Event name must be at least 2 characters")
        .max(100, "Event name cannot exceed 100 characters")
        .required("Event name is required"),
    description: Yup.string()
        .test(
            "min-if-provided",
            "Description must be at least 10 characters",
            (value) => !value || value.trim().length === 0 || value.trim().length >= 10
        ),
    type: Yup.string()
        .oneOf(EVENT_TYPES.map((item) => item.value), "Please select an event type")
        .required("Event type is required"),
    date_from: is_editing
        ? Yup.date().required("Start date is required")
        : Yup.date()
            .required("Start date is required")
            .min(new Date(), "Start date must be in the future"),
    date_to: Yup.date()
        .required("End date is required")
        .min(Yup.ref("date_from"), "End date must be after start date"),
    time_from: Yup.date().required("Start time is required"),
    time_to: Yup.date().required("End time is required"),
    venue: Yup.string()
        .min(2, "Venue must be at least 2 characters")
        .required("Venue is required"),
    fees: Yup.string()
        .test("valid-fees", "Fees cannot be negative", (value) => {
            if (!value || value.trim() === "") return true
            const fees = Number(value)
            return !Number.isNaN(fees) && fees >= 0
        }),
    age_from: Yup.string()
        .test("valid-age-from", "Age must be at least 0", (value) => {
            if (!value || value.trim() === "") return true
            const age = Number(value)
            return !Number.isNaN(age) && age >= 0
        }),
    age_to: Yup.string()
        .test("valid-age-to", "Maximum age must be greater than minimum age", function (value) {
            if (!value || value.trim() === "") return true
            const age_to = Number(value)
            if (Number.isNaN(age_to)) return false
            const age_from = this.parent.age_from
            if (!age_from || age_from.trim() === "") return age_to >= 0
            return age_to >= Number(age_from)
        }),
    max_registrations_enabled: Yup.boolean(),
    max_registrations_limit: Yup.number().when("max_registrations_enabled", {
        is: true,
        then: (schema) => schema
            .min(1, "Registration limit must be at least 1")
            .required("Registration limit is required"),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    registration_deadline: is_editing
        ? Yup.date().nullable().optional()
        : Yup.date()
            .nullable()
            .min(new Date(), "Registration deadline must be in the future")
            .optional(),
})

const initial = {
    name: "",
    description: "",
    type: "",
    date_from: null,
    date_to: null,
    time_from: null,
    time_to: null,
    venue: "",
    fees: "",
    age_from: "",
    age_to: "",
    max_registrations_enabled: false,
    max_registrations_limit: "",
    registration_deadline: null,
    image: null,
}

const useManageEventController = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { showInfoModal } = useModal()
    const { value: image_modal, toggle: toggleImageModal } = useToggle(false)

    const { id } = route.params || {}
    const is_editing = !!id
    const event = is_editing ? EVENTS.find((item) => item.id === id) : null

    const validationSchema = useMemo(
        () => getEventSchema(is_editing),
        [is_editing]
    )

    useEffect(() => {
        navigation.setOptions({
            title: is_editing ? "Update Event" : "Create Event",
        })
    }, [is_editing, navigation])

    const formik = useFormik({
        initialValues: initial,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            showInfoModal({
                title: is_editing ? "Event Updated" : "Event Created",
                message: is_editing
                    ? "Your event has been updated successfully."
                    : "Your event has been saved successfully.",
                onConfirm: () => {
                    if (!is_editing) resetForm()
                    goBack()
                },
            })
        },
    })

    const { openCamera, openGallery, clearImage } = useImagePicker({
        onImageSelected: (selected) => formik.setFieldValue("image", selected),
    })

    useEffect(() => {
        if (is_editing && event) {
            formik.setValues(mapEventToFormValues(event))
        }
    }, [id])

    const setEventType = (value) => {
        formik.setFieldValue("type", value)
        formik.setFieldTouched("type", true)
    }

    const onRemoveImage = useCallback(() => {
        clearImage()
    }, [clearImage])

    return {
        values: {
            formik,
            image_modal,
            event_types: EVENT_TYPES,
            is_editing,
            button_text: is_editing ? "Update Event" : "Create Event",
        },
        functions: {
            toggleImageModal,
            openCamera,
            openGallery,
            onRemoveImage,
            setEventType,
        },
    }
}

export default useManageEventController
