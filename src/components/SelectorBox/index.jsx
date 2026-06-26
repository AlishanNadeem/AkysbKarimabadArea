import { memo } from "react"
import { StyleSheet } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"
import Touchable from "../Touchable"

const SelectorBox = ({ label, selected, onPress }) => {
    return (
        <Touchable
            onPress={onPress}
            style={[styles.container, selected && styles.selected]}
        >
            <Text
                size={14}
                weight={selected ? "semibold" : "regular"}
                color={selected ? colors.white : colors.text_secondary}
            >
                {label}
            </Text>
        </Touchable>
    )
}

export default memo(SelectorBox)

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(8),
        borderRadius: widthPixel(8),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.border,
    },
    selected: {
        backgroundColor: colors.light_primary,
        borderColor: colors.light_primary,
    },
})
