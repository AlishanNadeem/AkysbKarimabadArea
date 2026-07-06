import { useFormik } from "formik"
import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../../contexts/ModalContext"
import { EVENT_TYPES, PAYMENT_METHODS, PAYMENT_STATUSES } from "../../../helpers/data"
import { formatDate } from "../../../helpers/date"
import { navigate } from "../../../helpers/navigation"
import { formatParticipantPhone } from "../../../helpers/participant"
import { NAVIGATORS, ROUTES } from "../../../helpers/routes"
import { useCreateRegistrationMutation } from "../../../redux/apis/Registration"
import {
    selectRegistrationEvent,
    selectRegistrationParticipants,
    selectRegistrationPayment,
} from "../../../redux/selectors"
import {
    resetRegistration,
    setRegistrationPayment,
} from "../../../redux/slices/registration.slice"

const getPaymentSchema = (is_paid_event) => Yup.object().shape({
    status: Yup.string()
        .oneOf(PAYMENT_STATUSES.map((item) => item.value))
        .required("Payment status is required"),
    method: is_paid_event
        ? Yup.string().when("status", {
            is: "paid",
            then: (schema) => schema
                .oneOf(PAYMENT_METHODS.map((item) => item.value))
                .required("Payment method is required"),
            otherwise: (schema) => schema.nullable().optional(),
        })
        : Yup.string().nullable().optional(),
    notes: Yup.string()
        .max(200, "Notes cannot exceed 200 characters")
        .optional(),
})

const useConfirmationController = () => {

    const dispatch = useDispatch()
    const { showInfoModal } = useModal()

    const event = useSelector(selectRegistrationEvent)
    const participants = useSelector(selectRegistrationParticipants)
    const saved_payment = useSelector(selectRegistrationPayment)

    const [createRegistration, { isLoading, isSuccess }] = useCreateRegistrationMutation()

    const is_paid_event = event
        ? !event.is_free && Number(event.fees) > 0
        : false

    const per_participant_fee = is_paid_event ? Number(event?.fees ?? 0) : 0
    const amount_paid = per_participant_fee * participants.length

    const formik = useFormik({
        initialValues: {
            status: saved_payment.status ?? (is_paid_event ? "pending" : "paid"),
            method: saved_payment.method ?? "",
            notes: saved_payment.notes ?? "",
        },
        validationSchema: Yup.lazy(() => getPaymentSchema(is_paid_event)),
        enableReinitialize: true,
        onSubmit: (values) => {
            const payload = {
                event: event?._id ?? event?.id,
                participants: participants.map((item) => ({
                    participant: item.participant || null,
                    is_existing: item.is_existing,
                    participant_data: item,
                })),
                amount_paid,
                status: "active",
                payment: {
                    ...values,
                    amount_paid,
                },
            }

            dispatch(setRegistrationPayment({
                ...values,
                amount_paid,
            }))

            createRegistration(payload)
        },
    })

    useEffect(() => {
        if (!event || !participants.length) {
            navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_SELECT_EVENT })
        }
    }, [event, participants])

    useEffect(() => {
        dispatch(setRegistrationPayment({
            status: formik.values.status,
            method: formik.values.method,
            notes: formik.values.notes,
            amount_paid,
        }))
    }, [formik.values.status, formik.values.method, formik.values.notes, amount_paid, dispatch])

    useEffect(() => {
        if (isSuccess) {
            const count = participants.length
            const message = count === 1
                ? `${participants[0].name} has been registered for ${event?.name} successfully.`
                : `${count} participants have been registered for ${event?.name} successfully.`

            showInfoModal({
                title: "Registration Complete",
                message,
                onConfirm: () => {
                    dispatch(resetRegistration())
                    navigate(NAVIGATORS.APP_DRAWER, {
                        screen: NAVIGATORS.APP_STACK,
                        params: { screen: ROUTES.HOME },
                    })
                },
            })
        }
    }, [isSuccess])

    const setPaymentStatus = useCallback((value) => {
        formik.setFieldValue("status", value)
        formik.setFieldTouched("status", true)
        if (value !== "paid") {
            formik.setFieldValue("method", "")
        }
    }, [formik])

    const setPaymentMethod = useCallback((value) => {
        formik.setFieldValue("method", value)
        formik.setFieldTouched("method", true)
    }, [formik])

    const event_summary = useMemo(() => {
        if (!event) return []
        const type_label = EVENT_TYPES.find((item) => item.value === event.type)?.label ?? event.type
        const { date: date_label } = formatDate(event.date?.from, { relative: false })
        const time_label = event.time?.from && event.time?.to
            ? `${event.time.from} - ${event.time.to}`
            : ""
        const fee_label = event.is_free || event.fees === 0 ? "Free" : `Rs. ${event.fees}`

        return [
            { label: "Event", value: event.name },
            { label: "Type", value: type_label },
            { label: "Venue", value: event.venue },
            { label: "Date", value: date_label },
            { label: "Time", value: time_label },
            { label: "Fee per participant", value: fee_label, highlight: true },
        ]
    }, [event])

    const participants_summary = useMemo(() =>
        participants.map((participant, index) => ({
            title: `Participant ${index + 1}`,
            rows: [
                { label: "Full Name", value: participant.name },
                { label: "Age", value: participant.age?.toString() },
                { label: "Contact", value: formatParticipantPhone(participant.phone) },
                { label: "YSB ID", value: participant.membership_id },
                { label: "Jamatkhana", value: participant.jamatkhana },
                { label: "Type", value: participant.is_existing ? "Existing Member" : "New Registration" },
            ],
        })),
    [participants])

    return {
        values: {
            formik,
            event,
            participants,
            is_paid_event,
            per_participant_fee,
            amount_paid,
            isLoading,
            event_summary,
            participants_summary,
            payment_statuses: PAYMENT_STATUSES,
            payment_methods: PAYMENT_METHODS,
        },
        functions: {
            setPaymentStatus,
            setPaymentMethod,
        },
    }
}

export default useConfirmationController
