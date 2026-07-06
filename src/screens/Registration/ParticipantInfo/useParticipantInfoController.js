import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import {
    setParticipantDraft,
    setRegistrationParticipants,
} from "../../../redux/slices/registration.slice"

const SEARCH_MODES = [
    { value: "phone", label: "Contact Number" },
    { value: "ysb_id", label: "YSB ID" },
]

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
    const [participants, setParticipants] = useState(saved_participants)

    const [triggerSearch, { isFetching: is_searching }] = useLazySearchParticipantQuery()

    useEffect(() => {
        if (!event) {
            navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_SELECT_EVENT })
        }
    }, [event])

    useEffect(() => {
        setParticipants(saved_participants)
    }, [saved_participants])

    const buildDraftPrefill = useCallback((prefill_phone, prefill_membership_id) => {
        const draft = createEmptyParticipantDraft({
            code: phone_search.country_code,
            calling_code: phone_search.dialing_code,
        })

        if (prefill_phone) {
            draft.phone.number = prefill_phone
            draft.whatsapp.number = prefill_phone
        }

        if (prefill_membership_id) {
            draft.membership_id = prefill_membership_id
        }

        return draft
    }, [phone_search.country_code, phone_search.dialing_code])

    const goToParticipantDetails = useCallback((draft) => {
        dispatch(setParticipantDraft(draft))
        navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_PARTICIPANT_DETAILS })
    }, [dispatch])

    const runSearch = useCallback(async () => {
        if (search_mode === "phone") {
            const number = phone_search.number?.trim()
            if (!number || number.length < 7) return

            setCheckedResultIds([])

            const result = await triggerSearch({
                type: "phone",
                number,
                dialing_code: phone_search.dialing_code,
            })

            const results = result?.data?.data ?? []
            setSearchResults(results)

            if (!results.length) {
                goToParticipantDetails(buildDraftPrefill(number))
            }
        } else {
            const membership_id = ysb_id_search?.trim()
            if (!membership_id || membership_id.length < 3) return

            setCheckedResultIds([])

            const result = await triggerSearch({
                type: "ysb_id",
                membership_id,
            })

            const results = result?.data?.data ?? []
            setSearchResults(results)

            if (!results.length) {
                goToParticipantDetails(buildDraftPrefill(null, membership_id))
            }
        }
    }, [search_mode, phone_search, ysb_id_search, triggerSearch, goToParticipantDetails, buildDraftPrefill])

    const onSearchPhoneChange = useCallback((number) => {
        setPhoneSearch((prev) => ({ ...prev, number }))
        setSearchResults([])
        setCheckedResultIds([])
    }, [])

    const onSearchCountryChange = useCallback((country) => {
        setPhoneSearch((prev) => ({
            ...prev,
            country_code: country.code,
            dialing_code: country.calling_code,
        }))
        setSearchResults([])
        setCheckedResultIds([])
    }, [])

    const onYsbIdChange = useCallback((value) => {
        setYsbIdSearch(value)
        setSearchResults([])
        setCheckedResultIds([])
    }, [])

    const onSearchModeChange = useCallback((mode) => {
        setSearchMode(mode)
        setSearchResults([])
        setCheckedResultIds([])
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

        const updated = mergeParticipants(participants, selected)
        setParticipants(updated)
        dispatch(setRegistrationParticipants(updated))
        setCheckedResultIds([])
        setSearchResults([])
    }, [search_results, checked_result_ids, participants, dispatch])

    const removeParticipant = useCallback((local_id) => {
        const updated = participants.filter((item) => item.local_id !== local_id)
        setParticipants(updated)
        dispatch(setRegistrationParticipants(updated))
    }, [participants, dispatch])

    const onContinue = useCallback(() => {
        if (!participants.length) return
        dispatch(setRegistrationParticipants(participants))
        navigate(ROUTES.MANAGE_REGISTRATION, { screen: ROUTES.REGISTRATION_CONFIRMATION })
    }, [participants, dispatch])

    const onRegisterNew = useCallback(() => {
        const prefill_phone = search_mode === "phone" ? phone_search.number?.trim() : null
        const prefill_membership_id = search_mode === "ysb_id" ? ysb_id_search?.trim() : null
        goToParticipantDetails(buildDraftPrefill(prefill_phone, prefill_membership_id))
    }, [search_mode, phone_search, ysb_id_search, goToParticipantDetails, buildDraftPrefill])

    const has_checked_results = checked_result_ids.length > 0

    return {
        values: {
            event,
            search_mode,
            search_modes: SEARCH_MODES,
            phone_search,
            ysb_id_search,
            search_results,
            checked_result_ids,
            is_searching,
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
            removeParticipant,
            onContinue,
            onRegisterNew,
            formatParticipantPhone,
            getParticipantKey,
        },
    }
}

export default useParticipantInfoController
