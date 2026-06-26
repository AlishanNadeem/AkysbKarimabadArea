import { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { formatParticipantPhone } from "../../helpers/participant"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const ParticipantRosterCard = ({ data, onRemove }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Row align="center" justify="space-between">
                    <Text size={15} weight="semibold">{data.name}</Text>
                    <View style={[styles.badge, data.is_existing ? styles.badge_existing : styles.badge_new]}>
                        <Text size={11} weight="semibold" color={data.is_existing ? colors.light_primary : colors.text_secondary}>
                            {data.is_existing ? "Existing" : "New"}
                        </Text>
                    </View>
                </Row>
                {data.membership_id ? (
                    <Text size={13} color={colors.text_secondary}>YSB ID: {data.membership_id}</Text>
                ) : null}
                {data.phone?.number ? (
                    <Text size={13} color={colors.text_secondary}>{formatParticipantPhone(data.phone)}</Text>
                ) : null}
            </View>
            <Icon
                source={images.trash}
                size={18}
                color={colors.danger}
                onPress={() => onRemove?.(data.local_id)}
            />
        </View>
    )
}

export default memo(ParticipantRosterCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(12),
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        borderWidth: heightPixel(1),
        borderColor: colors.border_brand,
        backgroundColor: colors.surface_brand,
    },
    content: {
        flex: 1,
        gap: heightPixel(4),
    },
    badge: {
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(3),
        borderRadius: heightPixel(6),
    },
    badge_existing: {
        backgroundColor: colors.white,
    },
    badge_new: {
        backgroundColor: colors.surface_brand_strong,
    },
})
