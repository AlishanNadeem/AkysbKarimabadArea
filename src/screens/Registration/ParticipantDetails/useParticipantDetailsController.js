import { useFormik } from "formik"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goBack, navigate } from "../../../helpers/navigation"
import {
    createEmptyParticipantDraft,
    createRosterEntry,
    mergeParticipants,
} from "../../../helpers/participant"
import { participantDraftSchema } from "../../../helpers/participantSchema"
import { ROUTES } from "../../../helpers/routes"
import {
    selectParticipantDraft,
    selectRegistrationEvent,
    selectRegistrationParticipants,
} from "../../../redux/selectors"
import {
    setParticipantDraft,
    setRegistrationParticipants,
} from "../../../redux/slices/registration.slice"

const useParticipantDetailsController = () => {

    const dispatch = useDispatch()
    const event = useSelector(selectRegistrationEvent)
    const saved_participants = useSelector(selectRegistrationParticipants)
    const participant_draft = useSelector(selectParticipantDraft)

    const formik = useFormik({
        initialValues: participant_draft ?? createEmptyParticipantDraft(),
        validationSchema: participantDraftSchema,
        enableReinitialize: true,
        onSubmit: () => {},
    })

    useEffect(() => {
        if (!event) {
            navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_SELECT_EVENT })
            return
        }
        if (!participant_draft) {
            navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_PARTICIPANT_INFO })
        }
    }, [event, participant_draft])

    const onWhatsappPhoneChange = useCallback((number) => {
        formik.setFieldValue("whatsapp.number", number)
    }, [formik])

    const onWhatsappCountryChange = useCallback((country) => {
        formik.setFieldValue("whatsapp.country_code", country.code)
        formik.setFieldValue("whatsapp.dialing_code", country.calling_code)
    }, [formik])

    const onEmergencyPhoneChange = useCallback((number) => {
        formik.setFieldValue("emergency_contact.phone.number", number)
    }, [formik])

    const onEmergencyCountryChange = useCallback((country) => {
        formik.setFieldValue("emergency_contact.phone.country_code", country.code)
        formik.setFieldValue("emergency_contact.phone.dialing_code", country.calling_code)
    }, [formik])

    const onSaveParticipant = useCallback(async () => {
        const errors = await formik.validateForm()
        formik.setTouched({
            name: true,
            age: true,
            phone: { number: true },
            jamatkhana: true,
            membership_id: true,
        })

        if (Object.keys(errors).length) return

        const entry = createRosterEntry(formik.values, false)
        const updated = mergeParticipants(saved_participants, [entry])
        dispatch(setRegistrationParticipants(updated))
        dispatch(setParticipantDraft(null))
        goBack()
    }, [formik, saved_participants, dispatch])

    return {
        values: {
            formik,
            event,
        },
        functions: {
            onSaveParticipant,
            onWhatsappPhoneChange,
            onWhatsappCountryChange,
            onEmergencyPhoneChange,
            onEmergencyCountryChange,
        },
    }
}

export default useParticipantDetailsController
