import { memo } from "react"
import Icon from "../../Icon"
import colors from "../../../helpers/colors"

const HeaderLeft = ({ icon, onPress, type = "primary" }) => {

    let props = {}

    if (type === "secondary") {
        props.background = colors.surface_brand
        props.rounded = "half"
        props.space = true
    }

    return (
        <Icon source={icon} onPress={onPress} size={29} color={colors.black} {...props} />
    )
}

export default memo(HeaderLeft)