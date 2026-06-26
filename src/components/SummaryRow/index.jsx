import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"

const SummaryRow = ({ label, value, highlight = false, last = false }) => {
    if (!value && value !== 0) return null

    return (
        <View style={[styles.row, {
            borderBottomWidth: last ? 0 : heightPixel(1),
        }]}>
            <Text size={13} color={colors.text_secondary} style={styles.label}>{label}</Text>
            <Text
                size={14}
                weight={highlight ? "semibold" : "regular"}
                color={highlight ? colors.light_primary : colors.black}
                style={styles.value}
            >
                {value}
            </Text>
        </View>
    )
}

export default memo(SummaryRow)

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: widthPixel(12),
        paddingVertical: heightPixel(8),

        borderBottomColor: colors.border,
    },
    label: {
        flex: 0.4,
    },
    value: {
        flex: 0.6,
        textAlign: "right",
    },
})
