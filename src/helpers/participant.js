import { DEFAULT_COUNTRY } from "./data"

export const mapParticipantToForm = (participant) => ({
    participant: participant._id ?? participant.id ?? "",
    name: participant.name ?? "",
    age: participant.age != null ? String(participant.age) : "",
    jamatkhana: participant.jamatkhana ?? "",
    membership_id: participant.membership_id ?? "",
    phone: {
        country_code: participant.phone?.country_code ?? "",
        dialing_code: participant.phone?.dialing_code ?? "",
        number: participant.phone?.number ?? "",
    },
    whatsapp: {
        country_code: participant.whatsapp?.country_code ?? "",
        dialing_code: participant.whatsapp?.dialing_code ?? "",
        number: participant.whatsapp?.number ?? "",
    },
    emergency_contact: {
        name: participant.emergency_contact?.name ?? "",
        relation: participant.emergency_contact?.relation ?? "",
        phone: {
            country_code: participant.emergency_contact?.phone?.country_code ?? "",
            dialing_code: participant.emergency_contact?.phone?.dialing_code ?? "",
            number: participant.emergency_contact?.phone?.number ?? "",
        },
    },
})

export const formatParticipantPhone = (phone) => {
    if (!phone?.number) return ""
    return `${phone.dialing_code ?? ""} ${phone.number}`.trim()
}

export const emptyParticipantFields = {
    participant: "",
    name: "",
    age: "",
    jamatkhana: "",
    membership_id: "",
    phone: {
        country_code: "",
        dialing_code: "",
        number: "",
    },
    whatsapp: {
        country_code: "",
        dialing_code: "",
        number: "",
    },
    emergency_contact: {
        name: "",
        relation: "",
        phone: {
            country_code: "",
            dialing_code: "",
            number: "",
        },
    },
}

export const createEmptyParticipantDraft = (country = DEFAULT_COUNTRY) => ({
    ...emptyParticipantFields,
    phone: {
        country_code: country.code,
        dialing_code: country.calling_code,
        number: "",
    },
    whatsapp: {
        country_code: country.code,
        dialing_code: country.calling_code,
        number: "",
    },
    emergency_contact: {
        name: "",
        relation: "",
        phone: {
            country_code: country.code,
            dialing_code: country.calling_code,
            number: "",
        },
    },
})

export const getParticipantKey = (participant) =>
    participant.participant || participant.local_id || ""

export const createRosterEntry = (fields, is_existing = false) => ({
    ...fields,
    is_existing,
    local_id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
})

export const mergeParticipants = (existing, incoming) => {
    const keys = new Set(existing.map(getParticipantKey))
    const merged = [...existing]

    incoming.forEach((item) => {
        const key = getParticipantKey(item)
        if (!key || keys.has(key)) return
        keys.add(key)
        merged.push(item)
    })

    return merged
}
