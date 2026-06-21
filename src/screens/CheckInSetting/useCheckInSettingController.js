// useCheckInSettingController.js
import { useCallback, useState } from "react"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"

const FREQUENCY_OPTIONS = ["Once", "Twice", "Thrice"]
const INTERVAL_OPTIONS = ["2 Hours", "4 Hours", "6 Hours"]
const SOS_OPTIONS = ["5 Mins", "20 Mins", "40 Mins", "1 Hours"]

const useCheckInSettingController = () => {

    const { showInfoModal } = useModal()

    const [time, setTime] = useState(null)
    const [frequency, setFrequency] = useState(FREQUENCY_OPTIONS[0])
    const [interval, setInterval] = useState(INTERVAL_OPTIONS[0])
    const [sos, setSos] = useState(SOS_OPTIONS[0])

    const onSave = useCallback(() => {
        showInfoModal({
            title: "Thank You!",
            message: "We have successfuly saved your preference.",
            onConfirm: goBack
        })
    }, [])

    return {
        values: {
            time,
            frequency,
            interval,
            sos,
            frequency_options: FREQUENCY_OPTIONS,
            interval_options: INTERVAL_OPTIONS,
            sos_options: SOS_OPTIONS,
        },
        functions: {
            setTime,
            setFrequency,
            setInterval,
            setSos,
            onSave,
        }
    }
}

export default useCheckInSettingController