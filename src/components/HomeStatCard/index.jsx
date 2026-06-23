import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Text from "../Text"

const HomeStatCard = ({ data }) => {

    const { label, value, icon } = data

    return (
        <View style={styles.container}>
            <Icon source={icon} size={18} color={colors.dark_gray} />
            <Text size={22} weight="semibold">{value}</Text>
            <Text size={12} color={colors.gray}>{label}</Text>
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
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
})
