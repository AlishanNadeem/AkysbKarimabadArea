import { useNavigation, useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useCallback, useEffect, useMemo } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { EVENT_TYPES, EVENTS } from "../../helpers/data"
import { convertToFormData } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import { useCreateEventMutation } from "../../redux/apis/Event"

const parseTimeValue = (time) => {
    if (!time) return null
    const [hours, minutes] = time.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
}

const formatTimeValue = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

const mapEventToFormValues = (event) => ({
    name: event.name ?? "",
    description: event.description ?? "",
    type: event.type ?? "",
    date: {
        from: event.date?.from ? new Date(event.date.from) : null,
        to: event.date?.to ? new Date(event.date.to) : null,
    },
    time: {
        from: parseTimeValue(event.time?.from),
        to: parseTimeValue(event.time?.to),
    },
    age: event.age ? {
        from: event.age.from != null ? Number(event.age.from) : null,
        to: event.age.to != null ? Number(event.age.to) : null,
    } : undefined,
    venue: event.venue ?? "",
    fees: event.fees != null ? Number(event.fees) : 0,
    max_registrations: {
        enabled: event.max_registrations?.enabled ?? false,
        limit: event.max_registrations?.limit != null
            ? Number(event.max_registrations.limit)
            : null,
    },
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
        .transform((value) => value?.trim() || undefined)
        .min(10, "Description must be at least 10 characters")
        .optional(),
    type: Yup.string()
        .oneOf(EVENT_TYPES.map((item) => item.value), "Please select an event type")
        .required("Event type is required"),
    date: Yup.object({
        from: is_editing
            ? Yup.date().required("Start date is required")
            : Yup.date()
                .required("Start date is required")
                .min(new Date(), "Start date must be in the future"),
        to: Yup.date()
            .required("End date is required")
            .min(Yup.ref("from"), "End date must be after start date"),
    }).required(),
    time: Yup.object({
        from: Yup.date().required("Start time is required"),
        to: Yup.date().required("End time is required"),
    }).required(),
    age: Yup.object({
        from: Yup.number()
            .min(0, "Age must be at least 0")
            .nullable()
            .optional(),
        to: Yup.number()
            .min(Yup.ref("from"), "Maximum age must be greater than minimum age")
            .nullable()
            .optional(),
    }).optional(),
    venue: Yup.string()
        .min(2, "Venue must be at least 2 characters")
        .required("Venue is required"),
    fees: Yup.number()
        .min(0, "Fees cannot be negative")
        .optional(),
    max_registrations: Yup.object({
        enabled: Yup.boolean().required(),
        limit: Yup.number().when("enabled", {
            is: true,
            then: (schema) => schema
                .min(1, "Registration limit must be at least 1")
                .required("Registration limit is required"),
            otherwise: (schema) => schema.nullable().optional(),
        }),
    }).optional(),
    registration_deadline: is_editing
        ? Yup.date().nullable().optional()
        : Yup.date()
            .nullable()
            .min(new Date(), "Registration deadline must be in the future")
            .optional(),
    image: Yup.mixed().nullable().optional(),
})

const initial = {
    name: "",
    description: "",
    type: "",
    date: {
        from: null,
        to: null,
    },
    time: {
        from: null,
        to: null,
    },
    venue: "",
    fees: 0,
    max_registrations: {
        enabled: false,
        limit: null,
    },
    registration_deadline: null,
    image: null,
}

const useManageEventController = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { showInfoModal } = useModal()
    const { value: image_modal, toggle: toggleImageModal } = useToggle(false)
    const [createEvent, { isLoading, isSuccess }] = useCreateEventMutation()

    const { id } = route.params || {}
    const is_editing = !!id
    const event = is_editing ? EVENTS.find((item) => item.id === id) : null

    const validationSchema = useMemo(
        () => getEventSchema(is_editing),
        [is_editing]
    )

    const formik = useFormik({
        initialValues: initial,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {

            if (is_editing) {
                showInfoModal({
                    title: "Event Updated",
                    message: "Your event has been updated successfully.",
                    onConfirm: goBack,
                })
                return
            }

            let payload = { ...values, time: { from: formatTimeValue(values.time.from), to: formatTimeValue(values.time.to) } }
            console.log(payload)
            payload = convertToFormData(payload)
            console.log(payload)
            createEvent(payload)

        },
    })

    const { openCamera, openGallery, clearImage } = useImagePicker({
        onImageSelected: (selected) => formik.setFieldValue("image", selected),
    })

    useEffect(() => {
        navigation.setOptions({
            title: is_editing ? "Update Event" : "Create Event",
        })
    }, [is_editing, navigation])

    useEffect(() => {
        if (is_editing && event) {
            formik.setValues(mapEventToFormValues(event))
        }
    }, [id])

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({
                title: "Event Created",
                message: "Your event has been saved successfully.",
                onConfirm: () => {
                    formik.resetForm()
                    clearImage()
                    goBack()
                },
            })
        }
    }, [isSuccess])

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
            isLoading,
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
