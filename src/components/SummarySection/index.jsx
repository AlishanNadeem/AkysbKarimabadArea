import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"

const SummarySection = ({ title, children }) => {
    return (
        <View style={styles.container}>
            <Text size={16} weight="semibold" style={styles.title}>{title}</Text>
            <View style={styles.card}>
                {children}
            </View>
        </View>
    )
}

export default memo(SummarySection)

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
    },
    title: {
        paddingHorizontal: widthPixel(2),
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: heightPixel(12),
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(4),
        overflow: "hidden",
    },
})
