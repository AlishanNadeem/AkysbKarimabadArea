import { memo } from "react"
import { StyleSheet } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"
import Touchable from "../Touchable"

const SelectorBox = ({ label, selected, onPress }) => {
    return (
        <Touchable
            ripple
            onPress={onPress}
            style={[styles.container, selected && styles.selected]}
        >
            <Text
                size={16}
                weight="semibold"
                color={selected ? colors.white : colors.black}
            >
                {label}
            </Text>
        </Touchable>
    )
}

export default memo(SelectorBox)

const styles = StyleSheet.create({
    container: {
        height: heightPixel(87),
        width: "30%",
        borderRadius: widthPixel(14),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.yellowish_primary,
    },
    selected: {
        backgroundColor: colors.danger,
    },
})