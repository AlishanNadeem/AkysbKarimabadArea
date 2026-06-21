import React, { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const ActivityLogCard = ({ data }) => {

    const { type, title, timestamp, user } = data

    const is_alert = type === "alert"

    return (
        <Row gap={13} style={[styles.container, { backgroundColor: is_alert ? colors.yellowish_primary : colors.lightest_primary }]}>
            <Icon
                source={is_alert ? images.alert : images.check_badge}
                rounded={"half"}
                space
                background={is_alert ? colors.pinkish_red : colors.leafy_green}
                size={34}
            />
            <View style={styles.text_container}>
                <Text color={colors.black}>{title} {is_alert && user && `- Sent To ${user.name} (${user.relation})`}</Text>
                <Text size={11} color={colors.dark_gray}>{formatDate(timestamp, { as_object: false, separator: "•" })}</Text>
            </View>
        </Row>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: heightPixel(16),
        paddingHorizontal: widthPixel(16),
        borderRadius: widthPixel(12),
    },
    text_container: {
        flex: 1,
        justifyContent: "center",
        gap: heightPixel(2)
    },
})

export default memo(ActivityLogCard)