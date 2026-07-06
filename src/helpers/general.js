import { Platform } from "react-native"

export const getGreeting = () => {

    const hour = new Date().getHours()

    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    if (hour < 21) return "Good Evening"
    return "Good Night"

}

export const convertToFormData = (values) => {

    const form_data = new FormData()

    const appendValue = (key, value) => {

        if (value === undefined || value === null) return

        if (typeof value === "object" && value.uri) {
            form_data.append(key, {
                uri:
                    Platform.OS === "ios"
                        ? value.uri.replace("file://", "")
                        : value.uri,
                name: value.name || `photo_${Date.now()}.jpg`,
                type: value.type || "image/jpeg",
            })
            return
        }

        if (value instanceof Date) {
            form_data.append(key, value.toISOString())
            return
        }

        if (typeof value === "object" && !Array.isArray(value)) {
            Object.entries(value).forEach(([nested_key, nested_value]) => {
                appendValue(`${key}[${nested_key}]`, nested_value)
            })
            return
        }

        form_data.append(key, String(value))

    }

    Object.entries(values).forEach(([key, value]) => {
        appendValue(key, value)
    })

    return form_data

}