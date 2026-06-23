import { useNavigation, useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useCallback, useEffect, useMemo, useState } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import {
    DEFAULT_COUNTRY,
    EVENTS,
    PAYMENT_METHODS,
    PAYMENT_STATUSES,
} from "../../helpers/data"
import { goBack } from "../../helpers/navigation"
import {
    emptyParticipantFields,
    mapParticipantToForm,
} from "../../helpers/participant"

const initial = {
    event: "",
    search: {
        country_code: DEFAULT_COUNTRY.code,
        dialing_code: DEFAULT_COUNTRY.calling_code,
        number: "",
    },
    ...emptyParticipantFields,
    amount_paid: 0,
    status: "active",
    payment: {
        status: "pending",
        method: "",
        notes: "",
    },
}

const getRegistrationSchema = (is_paid_event) => Yup.object().shape({
    event: Yup.string().required("Event is required"),
    participant: Yup.string().required("Please select a participant from search results"),
    name: Yup.string().required("Participant name is required"),
    age: Yup.number()
        .typeError("Age is required")
        .min(0, "Age must be at least 0")
        .required("Age is required"),
    jamatkhana: Yup.string().required("Jamatkhana is required"),
    amount_paid: Yup.number()
        .min(0, "Amount cannot be negative")
        .required("Amount is required"),
    payment: Yup.object({
        status: Yup.string()
            .oneOf(PAYMENT_STATUSES.map((item) => item.value))
            .optional(),
        method: is_paid_event
            ? Yup.string()
                .oneOf(PAYMENT_METHODS.map((item) => item.value))
                .required("Payment method is required")
            : Yup.string().nullable().optional(),
        notes: Yup.string()
            .max(200, "Notes cannot exceed 200 characters")
            .optional(),
    }).optional(),
})

const useManageRegistrationController = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { showInfoModal } = useModal()

    const { eventId } = route.params || {}

    const [search_results, setSearchResults] = useState([])
    const [is_searching, setIsSearching] = useState(false)
    const [has_searched, setHasSearched] = useState(false)

    const published_events = useMemo(
        () => EVENTS.filter((item) => item.status === "published"),
        []
    )

    const formik = useFormik({
        initialValues: {
            ...initial,
            event: eventId ?? "",
        },
        validationSchema: Yup.lazy((values) => {
            const selected_event = published_events.find(
                (item) => item._id === values.event || item.id === values.event
            )
            const is_paid_event = selected_event
                ? !selected_event.is_free && Number(selected_event.fees) > 0
                : false

            return getRegistrationSchema(is_paid_event)
        }),
        enableReinitialize: false,
        onSubmit: (values) => {
            const payload = {
                event: values.event,
                participant: values.participant,
                amount_paid: values.amount_paid,
                status: values.status,
                payment: values.payment,
            }

            console.log("Registration payload:", payload)
            showInfoModal({
                title: "Registration Saved",
                message: "Registration details are ready. API integration will be added later.",
                onConfirm: goBack,
            })
        },
    })

    const selected_event = useMemo(
        () => published_events.find(
            (item) => item._id === formik.values.event || item.id === formik.values.event
        ),
        [formik.values.event, published_events]
    )

    const is_paid_event = selected_event
        ? !selected_event.is_free && Number(selected_event.fees) > 0
        : false

    const has_participant = !!formik.values.participant

    useEffect(() => {
        navigation.setOptions({ title: "Event Registration" })
    }, [navigation])

    useEffect(() => {
        if (eventId) {
            formik.setFieldValue("event", eventId)
        }
    }, [eventId])

    useEffect(() => {
        const amount = is_paid_event ? Number(selected_event?.fees ?? 0) : 0
        formik.setFieldValue("amount_paid", amount)

        if (!is_paid_event) {
            formik.setFieldValue("payment.method", "")
            formik.setFieldValue("payment.status", "paid")
        } else if (formik.values.payment.status === "paid" && !formik.values.payment.method) {
            formik.setFieldValue("payment.status", "pending")
        }
    }, [selected_event?._id, is_paid_event])

    const clearParticipantFields = useCallback(() => {
        Object.entries(emptyParticipantFields).forEach(([key, value]) => {
            formik.setFieldValue(key, value)
        })
    }, [formik])

    const resetSearchState = useCallback(() => {
        setSearchResults([])
        setIsSearching(false)
        setHasSearched(false)
    }, [])

    const searchParticipants = useCallback(async () => {

    }, [])

    const onSearchPhoneChange = useCallback((number) => {
        formik.setFieldValue("search.number", number)
        resetSearchState()

        if (formik.values.participant) {
            clearParticipantFields()
        }
    }, [clearParticipantFields, formik, resetSearchState])

    const onSearchCountryChange = useCallback((country) => {
        formik.setFieldValue("search.country_code", country.code)
        formik.setFieldValue("search.dialing_code", country.calling_code)
        resetSearchState()

        if (formik.values.participant) {
            clearParticipantFields()
        }
    }, [clearParticipantFields, formik, resetSearchState])

    const selectParticipant = useCallback((participant) => {
        const mapped = mapParticipantToForm(participant)

        formik.setValues({
            ...formik.values,
            ...mapped,
            search: {
                country_code: participant.phone?.country_code ?? formik.values.search.country_code,
                dialing_code: participant.phone?.dialing_code ?? formik.values.search.dialing_code,
                number: participant.phone?.number ?? formik.values.search.number,
            },
        })

        setSearchResults([])
        setHasSearched(false)
    }, [formik])

    const setEvent = useCallback((item) => {
        formik.setFieldValue("event", item._id ?? item.id)
        formik.setFieldTouched("event", true)
    }, [formik])

    const setPaymentMethod = useCallback((value) => {
        formik.setFieldValue("payment.method", value)
        formik.setFieldTouched("payment.method", true)
    }, [formik])

    const show_no_results = has_searched
        && !is_searching
        && !search_results.length
        && !has_participant

    return {
        values: {
            formik,
            published_events,
            payment_methods: PAYMENT_METHODS,
            selected_event,
            is_paid_event,
            search_results,
            is_searching,
            has_participant,
            show_no_results,
        },
        functions: {
            setEvent,
            setPaymentMethod,
            onSearchPhoneChange,
            onSearchCountryChange,
            selectParticipant,
            searchParticipants,
        },
    }
}

export default useManageRegistrationController
