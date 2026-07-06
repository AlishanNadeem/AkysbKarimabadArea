import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { theme } from "../../helpers/theme"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Text from "../Text"

const HomeStatCard = ({ data }) => {

    const { label, value, icon } = data

    return (
        <View style={[theme.card, styles.container]}>
            <Icon source={icon} size={18} color={colors.light_primary} />
            <Text size={22} weight="semibold" color={colors.light_primary}>{value}</Text>
            <Text size={12} color={colors.text_secondary}>{label}</Text>
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
    },
})
