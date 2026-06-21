import { memo } from "react"
import Icon from "../../Icon"

const HeaderRight = ({ icon, onPress }) => {
    return (
        <Icon source={icon} onPress={onPress} size={28} />
    )
}

export default memo(HeaderRight)