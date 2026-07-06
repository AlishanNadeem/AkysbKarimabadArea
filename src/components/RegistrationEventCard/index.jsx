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

const BANNER_HEIGHT = heightPixel(120)

const RegistrationEventCard = ({ data, onSelect, selected = false }) => {

    const {
        name,
        type,
        venue,
        date,
        time,
        fees,
        image_url,
        is_free,
    } = data

    const type_label = EVENT_TYPES.find((item) => item.value === type)?.label ?? type
    const { date: date_label } = formatDate(date?.from, { relative: false })
    const time_label = time?.from && time?.to ? `${time.from} - ${time.to}` : ""
    const fee_label = is_free || fees === 0 ? "Free" : `Rs. ${fees}`

    return (
        <Touchable onPress={() => onSelect?.(data)}>
            <View style={[styles.container, selected && styles.selected]}>
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
                                <Icon source={images.calendar} size={32} color={colors.gray} />
                            </View>
                        )
                    }
                    <View style={styles.select_indicator}>
                        <Icon
                            source={images.arrow_right}
                            size={14}
                            color={selected ? colors.white : colors.light_primary}
                        />
                    </View>
                </View>

                <View style={styles.body}>
                    <Text size={16} weight="semibold" lines={2}>{name}</Text>
                    <Text size={13} color={colors.gray} lines={1}>
                        {type_label} · {venue}
                    </Text>

                    {date_label ? (
                        <Row align="center" gap={6} style={styles.meta_row}>
                            <Icon source={images.calendar} size={13} color={colors.gray} />
                            <Text size={12} color={colors.dark_gray}>{date_label}</Text>
                        </Row>
                    ) : null}

                    {time_label ? (
                        <Row align="center" gap={6} style={styles.meta_row}>
                            <Icon source={images.clock} size={13} color={colors.gray} />
                            <Text size={12} color={colors.dark_gray}>{time_label}</Text>
                        </Row>
                    ) : null}

                    <Row align="center" justify="space-between" style={styles.footer}>
                        <Text size={13} weight="semibold" color={colors.light_primary}>{fee_label}</Text>
                        <Text size={12} color={colors.gray}>Tap to select</Text>
                    </Row>
                </View>
            </View>
        </Touchable>
    )
}

export default memo(RegistrationEventCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: heightPixel(14),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1.5),
        borderColor: colors.border,
        overflow: "hidden",
    },
    selected: {
        borderColor: colors.light_primary,
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
    select_indicator: {
        position: "absolute",
        top: heightPixel(10),
        right: widthPixel(10),
        width: heightPixel(30),
        height: heightPixel(30),
        borderRadius: heightPixel(15),
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(12),
        gap: heightPixel(4),
    },
    meta_row: {
        width: "auto",
    },
    footer: {
        marginTop: heightPixel(4),
    },
})
