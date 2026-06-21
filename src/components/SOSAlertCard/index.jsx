import React, { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { global_styles } from "../../helpers/styles"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const SOSAlertCard = ({ data, onPress }) => {

    const { timestamp, user } = data
    const { date, time } = formatDate(timestamp)

    return (
        <Touchable onPress={onPress} disabled={!onPress} style={styles.container}>
            <Icon source={images.siren} size={26} />
            <Text size={20} weight="semibold">SOS Alert Sent</Text>
            <View style={styles.info_container}>
                <Text size={16}>Emergency Responders Notified</Text>
                {
                    user && (
                        <Text size={16}>Sent To: {user.name} ({user.relation})</Text>
                    )
                }
            </View>
            <Row justify="center" align="center" gap={12}>
                <Row gap={5} align="center" style={global_styles.auto_width}>
                    <Icon size={16} source={images.clock_animated} />
                    <Text>{time}</Text>
                </Row>
                <View style={styles.divider} />
                <Row gap={5} align="center" style={global_styles.auto_width}>
                    <Icon size={16} source={images.calendar_animated} />
                    <Text>{date}</Text>
                </Row>
            </Row>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(6),
        paddingVertical: heightPixel(25),
        backgroundColor: colors.danger,
        borderRadius: widthPixel(24),
        justifyContent: "center",
        alignItems: "center",
    },
    info_container: {
        alignItems: "center",
    },
    divider: {
        height: heightPixel(16),
        width: widthPixel(1),
        backgroundColor: colors.white,
    },
})

export default memo(SOSAlertCard)