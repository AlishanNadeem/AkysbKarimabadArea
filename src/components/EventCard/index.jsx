import { memo } from "react"
import { Image, StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { EVENT_TYPES } from "../../helpers/data"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const BANNER_HEIGHT = heightPixel(150)

const STATUS_STYLES = {
    draft: {
        background: "#F0F0F0",
        text: colors.dark_gray,
    },
    published: {
        background: "#E3F2FD",
        text: "#1565C0",
    },
    postponed: {
        background: "#FFF3E0",
        text: "#E65100",
    },
    cancelled: {
        background: "#FFEBEE",
        text: colors.danger,
    },
    completed: {
        background: "#E8F5E9",
        text: "#2E7D32",
    },
}

const getStatusStyle = (status) => STATUS_STYLES[status] ?? STATUS_STYLES.draft

const EventCard = ({ data, onEdit }) => {

    const {
        name,
        type,
        venue,
        date,
        time,
        fees,
        status,
        image_url,
        is_free,
    } = data

    const type_label = EVENT_TYPES.find((item) => item.value === type)?.label ?? type
    const { date: date_label } = formatDate(date?.from, { relative: false })
    const time_label = time?.from && time?.to ? `${time.from} - ${time.to}` : ""
    const fee_label = is_free || fees === 0 ? "Free" : `Rs. ${fees}`
    const status_style = getStatusStyle(status)

    return (
        <Touchable onPress={() => onEdit?.(data?._id)}>
            <View style={styles.container}>
                <View style={styles.banner}>
                    {
                        image_url ? (
                            <Image
                                source={{ uri: image_url }}
                                style={styles.banner_image}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.banner_placeholder}>
                                <Icon source={images.calendar} size={36} color={colors.gray} />
                            </View>
                        )
                    }

                    <View style={styles.edit_button}>
                        <Icon source={images.edit} size={16} color={colors.dark_gray} />
                    </View>
                </View>

                <View style={styles.body}>
                    <Text size={16} weight="semibold" lines={2}>{name}</Text>

                    <Text size={14} color={colors.gray} lines={1}>
                        {type_label} · {venue}
                    </Text>

                    {date_label ? (
                        <Row align="center" gap={6} style={styles.meta_row}>
                            <Icon source={images.calendar} size={14} color={colors.gray} />
                            <Text size={13} color={colors.dark_gray}>{date_label}</Text>
                        </Row>
                    ) : null}

                    {time_label ? (
                        <Row align="center" gap={6} style={styles.meta_row}>
                            <Icon source={images.clock} size={14} color={colors.gray} />
                            <Text size={13} color={colors.dark_gray}>{time_label}</Text>
                        </Row>
                    ) : null}

                    <Row align="center" justify="space-between" style={styles.footer}>
                        <Text size={13} weight="semibold">{fee_label}</Text>
                        {status && (
                            <View style={[styles.status_badge, { backgroundColor: status_style.background }]}>
                                <Text size={12} color={status_style.text} style={styles.status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Text>
                            </View>
                        )}
                    </Row>
                </View>
            </View>
        </Touchable>
    )
}

export default memo(EventCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: heightPixel(14),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.border,
        overflow: "hidden",
    },
    banner: {
        height: BANNER_HEIGHT,
        backgroundColor: colors.light_gray,
    },
    banner_image: {
        width: "100%",
        height: "100%",
    },
    banner_placeholder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    edit_button: {
        position: "absolute",
        top: heightPixel(10),
        right: widthPixel(10),
        width: heightPixel(32),
        height: heightPixel(32),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(12),
        gap: heightPixel(5),
    },
    meta_row: {
        width: "auto",
    },
    footer: {
        marginTop: heightPixel(4),
    },
    status_badge: {
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(4),
        borderRadius: heightPixel(10),
    },
    status: {
        textTransform: "capitalize",
    },
})
