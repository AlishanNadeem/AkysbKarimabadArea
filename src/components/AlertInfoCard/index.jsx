import React, { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const AlertInfoCard = ({ data, onPressAction }) => {

    const { icon, icon_background, background, title, description, action_text } = data

    return (
        <Row gap={13} style={[styles.container, { backgroundColor: background }]}>
            <Icon size={34} source={icon} rounded={"half"} space background={icon_background} />
            <View style={styles.content}>
                <Row justify="space-between" style={styles.row}>
                    <Text weight="semibold" color={colors.black}>{title}</Text>
                    <Touchable onPress={onPressAction} disabled={!onPressAction}>
                        <Text color={colors.danger} underline>{action_text}</Text>
                    </Touchable>
                </Row>
                <Text color={colors.gray} size={16}>{description}</Text>
            </View>
        </Row>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
        borderRadius: widthPixel(12),
    },
    content: {
        flex: 1,
        gap: heightPixel(9),
    },
    row: {
        width: "auto",
    },
})

export default memo(AlertInfoCard)