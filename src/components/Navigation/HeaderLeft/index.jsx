import { memo } from "react"
import Icon from "../../Icon"
import colors from "../../../helpers/colors"

const HeaderLeft = ({ color, icon, onPress, type = "primary", size }) => {

    let props = {}

    if (type === "secondary") {
        props.background = colors.surface_brand
        props.rounded = "half"
        props.space = true
    }

    return (
        <Icon source={icon} onPress={onPress} size={size ?? 29} color={color ?? colors.black} {...props} />
    )
}

export default memo(HeaderLeft)