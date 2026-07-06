import { useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { DEFAULT_COUNTRY } from "../../../helpers/data"
import { navigate } from "../../../helpers/navigation"
import {
    createEmptyParticipantDraft,
    createRosterEntry,
    formatParticipantPhone,
    getParticipantKey,
    mapParticipantToForm,
    mergeParticipants,
} from "../../../helpers/participant"
import { ROUTES } from "../../../helpers/routes"
import { useLazySearchParticipantQuery } from "../../../redux/apis/Registration"
import {
    selectRegistrationEvent,
    selectRegistrationParticipants,
} from "../../../redux/selectors"
import { setRegistrationParticipants } from "../../../redux/slices/registration.slice"

const SEARCH_MODES = [
    { value: "phone", label: "Contact Number" },
    { value: "ysb_id", label: "YSB ID" },
]

const draft_schema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
        .required("Full name is required"),
    age: Yup.number()
        .transform((value, original) => (original === "" || original == null ? undefined : Number(original)))
        .typeError("Age is required")
        .min(0, "Age must be at least 0")
        .max(120, "Age cannot exceed 120")
        .required("Age is required"),
    phone: Yup.object({
        number: Yup.string()
            .min(7, "Phone number must be at least 7 digits")
            .required("Contact number is required"),
    }),
    jamatkhana: Yup.string()
        .max(100, "Jamatkhana cannot exceed 100 characters")
        .optional(),
    membership_id: Yup.string().optional(),
    whatsapp: Yup.object({
        number: Yup.string().optional(),
    }).optional(),
    emergency_contact: Yup.object({
        name: Yup.string().max(100).optional(),
        relation: Yup.string().max(50).optional(),
        phone: Yup.object({
            number: Yup.string().optional(),
        }).optional(),
    }).optional(),
})

const useParticipantInfoController = () => {

    const dispatch = useDispatch()
    const event = useSelector(selectRegistrationEvent)
    const saved_participants = useSelector(selectRegistrationParticipants)

    const [search_mode, setSearchMode] = useState("phone")
    const [phone_search, setPhoneSearch] = useState({
        country_code: DEFAULT_COUNTRY.code,
        dialing_code: DEFAULT_COUNTRY.calling_code,
        number: "",
    })
    const [ysb_id_search, setYsbIdSearch] = useState("")
    const [search_results, setSearchResults] = useState([])
    const [checked_result_ids, setCheckedResultIds] = useState([])
    const [has_searched, setHasSearched] = useState(false)
    const [participants, setParticipants] = useState(saved_participants)

    const [triggerSearch, { isFetching: is_searching }] = useLazySearchParticipantQuery()

    const draft_formik = useFormik({
        initialValues: createEmptyParticipantDraft(),
        validationSchema: draft_schema,
        enableReinitialize: false,
        onSubmit: () => {},
    })

    useEffect(() => {
        if (!event) {
            navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_SELECT_EVENT })
        }
    }, [event])

    const resetDraftForm = useCallback((prefill_phone) => {
        const draft = createEmptyParticipantDraft({
            code: phone_search.country_code,
            calling_code: phone_search.dialing_code,
        })

        if (prefill_phone) {
            draft.phone.number = prefill_phone
            draft.whatsapp.number = prefill_phone
        }

        draft_formik.resetForm({ values: draft })
    }, [draft_formik, phone_search.country_code, phone_search.dialing_code])

    const runSearch = useCallback(async () => {
        if (search_mode === "phone") {
            const number = phone_search.number?.trim()
            if (!number || number.length < 7) return

            setHasSearched(true)
            setCheckedResultIds([])

            const result = await triggerSearch({
                type: "phone",
                number,
                dialing_code: phone_search.dialing_code,
            })

            const results = result?.data?.data ?? []
            setSearchResults(results)

            if (!results.length) {
                resetDraftForm(number)
            }
        } else {
            const membership_id = ysb_id_search?.trim()
            if (!membership_id || membership_id.length < 3) return

            setHasSearched(true)
            setCheckedResultIds([])

            const result = await triggerSearch({
                type: "ysb_id",
                membership_id,
            })

            const results = result?.data?.data ?? []
            setSearchResults(results)

            if (!results.length) {
                resetDraftForm()
            }
        }
    }, [search_mode, phone_search, ysb_id_search, triggerSearch, resetDraftForm])

    const onSearchPhoneChange = useCallback((number) => {
        setPhoneSearch((prev) => ({ ...prev, number }))
        setSearchResults([])
        setCheckedResultIds([])
        setHasSearched(false)
    }, [])

    const onSearchCountryChange = useCallback((country) => {
        setPhoneSearch((prev) => ({
            ...prev,
            country_code: country.code,
            dialing_code: country.calling_code,
        }))
        setSearchResults([])
        setCheckedResultIds([])
        setHasSearched(false)
    }, [])

    const onYsbIdChange = useCallback((value) => {
        setYsbIdSearch(value)
        setSearchResults([])
        setCheckedResultIds([])
        setHasSearched(false)
    }, [])

    const onSearchModeChange = useCallback((mode) => {
        setSearchMode(mode)
        setSearchResults([])
        setCheckedResultIds([])
        setHasSearched(false)
    }, [])

    const toggleResultCheck = useCallback((id) => {
        setCheckedResultIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }, [])

    const addSelectedFromSearch = useCallback(() => {
        const selected = search_results
            .filter((item) => checked_result_ids.includes(item._id ?? item.id))
            .map((item) => createRosterEntry(mapParticipantToForm(item), true))

        if (!selected.length) return

        setParticipants((prev) => mergeParticipants(prev, selected))
        setCheckedResultIds([])
    }, [search_results, checked_result_ids])

    const addDraftParticipant = useCallback(async () => {
        const errors = await draft_formik.validateForm()
        draft_formik.setTouched({
            name: true,
            age: true,
            phone: { number: true },
            jamatkhana: true,
            membership_id: true,
        })

        if (Object.keys(errors).length) return

        const entry = createRosterEntry(draft_formik.values, false)
        setParticipants((prev) => mergeParticipants(prev, [entry]))
        resetDraftForm()
    }, [draft_formik, resetDraftForm])

    const removeParticipant = useCallback((local_id) => {
        setParticipants((prev) => prev.filter((item) => item.local_id !== local_id))
    }, [])

    const onContinue = useCallback(() => {
        if (!participants.length) return
        dispatch(setRegistrationParticipants(participants))
        navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_CONFIRMATION })
    }, [participants, dispatch])

    const onWhatsappPhoneChange = useCallback((number) => {
        draft_formik.setFieldValue("whatsapp.number", number)
    }, [draft_formik])

    const onWhatsappCountryChange = useCallback((country) => {
        draft_formik.setFieldValue("whatsapp.country_code", country.code)
        draft_formik.setFieldValue("whatsapp.dialing_code", country.calling_code)
    }, [draft_formik])

    const onEmergencyPhoneChange = useCallback((number) => {
        draft_formik.setFieldValue("emergency_contact.phone.number", number)
    }, [draft_formik])

    const onEmergencyCountryChange = useCallback((country) => {
        draft_formik.setFieldValue("emergency_contact.phone.country_code", country.code)
        draft_formik.setFieldValue("emergency_contact.phone.dialing_code", country.calling_code)
    }, [draft_formik])

    const show_no_results = has_searched
        && !is_searching
        && !search_results.length

    const has_checked_results = checked_result_ids.length > 0

    return {
        values: {
            draft_formik,
            event,
            search_mode,
            search_modes: SEARCH_MODES,
            phone_search,
            ysb_id_search,
            search_results,
            checked_result_ids,
            is_searching,
            show_no_results,
            has_searched,
            participants,
            has_checked_results,
        },
        functions: {
            onSearchModeChange,
            onSearchPhoneChange,
            onSearchCountryChange,
            onYsbIdChange,
            runSearch,
            toggleResultCheck,
            addSelectedFromSearch,
            addDraftParticipant,
            removeParticipant,
            onContinue,
            onWhatsappPhoneChange,
            onWhatsappCountryChange,
            onEmergencyPhoneChange,
            onEmergencyCountryChange,
            formatParticipantPhone,
            getParticipantKey,
        },
    }
}

export default useParticipantInfoController
