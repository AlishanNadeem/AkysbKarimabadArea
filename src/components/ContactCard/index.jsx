import { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { global_styles } from "../../helpers/styles"
import Button from "../Button"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const ContactCard = ({ data, onAlert, onEdit, onDelete, index = 0 }) => {

    const { name, relation, phone } = data
    const is_even = index % 2 === 0

    return (
        <Row
            align="center"
            gap={12}
            style={[styles.container, { backgroundColor: is_even ? colors.lightest_primary : colors.yellowish_primary }]}
        >
            <Icon
                source={images.profile_bottom}
                size={36}
                space
                rounded="half"
                background={colors.dark_primary}
            />

            <View style={styles.info}>
                <Text size={16} weight="semibold" color={colors.black}>{name}</Text>
                <Text size={16} color={colors.dark_gray}>{relation} - {phone}</Text>
            </View>

            <View style={styles.actions}>
                <Row gap={5} style={global_styles.auto_width}>
                    <Icon source={images.trash} size={24} onPress={onDelete} />
                    <Icon source={images.edit} size={24} onPress={onEdit} />
                </Row>
                <View style={styles.alert_button}>
                    <Button size="sm" onPress={onAlert}>Alert</Button>
                </View>
            </View>

        </Row>
    )
}

export default memo(ContactCard)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthPixel(19),
        paddingVertical: heightPixel(8),
        borderRadius: widthPixel(13),
    },
    info: {
        flex: 1,
        gap: heightPixel(2),
    },
    actions: {
        gap: heightPixel(8),
        alignItems: "flex-end",
        width: "25%"
    },
    alert_button: {
        width: "100%"
    },
})