import React, { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import ProgressBar from "../ProgressBar"
import Row from "../Row"
import Text from "../Text"

const DashboardStatCard = ({ data }) => {

    const { label, title, value, progress, icon, background_color, icon_background } = data

    return (
        <View style={[styles.container, { backgroundColor: background_color }]}>
            <Row align="center">
                <View style={styles.label_container}>
                    <Text size={11} color={colors.dark_gray}>{label}</Text>
                </View>
                <Icon source={icon} rounded={"half"} space size={24} background={icon_background} />
            </Row>
            <View>
                <Text color={colors.black}>{title}</Text>
                <Text color={colors.black}>{value}</Text>
            </View>
            <ProgressBar background_color={icon_background} progress={progress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
        borderRadius: widthPixel(20),
        paddingVertical: heightPixel(16),
        paddingHorizontal: widthPixel(16),
    },
    label_container: {
        flex: 1,
    },
})

export default memo(DashboardStatCard)