import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, SHADOW, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Text from "../Text"

const HomeStatCard = ({ data }) => {

    const { label, value, icon } = data

    return (
        <View style={styles.container}>
            <Icon source={icon} size={24} color={colors.dark_gray} />
            <Text size={24} weight="bold">{value}</Text>
            <Text size={13} color={colors.gray}>{label}</Text>
        </View>
    )
}

export default memo(HomeStatCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: heightPixel(4),
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(8),
        borderRadius: heightPixel(12),
        backgroundColor: colors.card,
        borderWidth: heightPixel(1),
        borderColor: colors.border,

        ...SHADOW.sm,
    },
})
