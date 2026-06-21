import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"
import { setAlertMode } from "../../redux/slices/general.slice"

const OPTIONS = [
    { label: "Doing good", value: "doing_good" },
    { label: "Need help", value: "need_help" },
]

const useDailyCheckInController = () => {

    const dispatch = useDispatch()
    const { showInfoModal } = useModal()

    const [selected, setSelected] = useState(null)

    const onSubmit = useCallback(() => {

        if (selected === "doing_good") {

            showInfoModal({
                title: "All Done!",
                button_text: "Return Home",
                onConfirm: goBack
            })

        } else if (selected === "need_help") {

            dispatch(setAlertMode("all"))

            showInfoModal({
                title: "Thank You!",
                message: "Alert has been sent successfully",
                onConfirm: goBack
            })

        }

    }, [selected])

    return {
        values: {
            options: OPTIONS,
            selected,
            can_submit: !!selected,
        },
        functions: {
            onSelect: setSelected,
            onSubmit,
        }
    }
}

export default useDailyCheckInController