import { memo } from "react"
import { StyleSheet, View } from "react-native"
import dayjs from "dayjs"
import { PAYMENT_STATUSES, REGISTRATION_STATUSES } from "../../helpers/data"
import colors from "../../helpers/colors"
import { heightPixel, SHADOW, widthPixel } from "../../helpers/metrics"
import Button from "../Button"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const PAYMENT_BADGE_STYLES = {
    pending: {
        background: "#FFF3E0",
        text: colors.orange,
    },
    paid: {
        background: colors.dark_primary_10,
        text: "#2E7D32",
    },
}

const STATUS_BADGE_STYLES = {
    active: {
        background: colors.primary_10,
        text: colors.light_primary,
    },
    cancelled: {
        background: colors.pinkish_red,
        text: colors.danger,
    },
}

const RegistrationListCard = ({ data, onPress, onAccept, onReject, loading_id }) => {

    const {
        _id,
        id,
        participants = [],
        status,
        payment,
        created_at,
        amount_paid,
    } = data

    const registration_id = _id ?? id
    const primary_name = participants[0]?.participant_data?.name ?? "Unknown"
    const participant_count = participants.length
    const payment_label = PAYMENT_STATUSES.find((item) => item.value === payment?.status)?.label ?? payment?.status
    const status_label = REGISTRATION_STATUSES.find((item) => item.value === status)?.label ?? status
    const payment_style = PAYMENT_BADGE_STYLES[payment?.status] ?? PAYMENT_BADGE_STYLES.pending
    const status_style = STATUS_BADGE_STYLES[status] ?? STATUS_BADGE_STYLES.active
    const date_label = created_at ? dayjs(created_at).format("MMM D, YYYY") : ""
    const amount_label = amount_paid > 0 ? `Rs. ${amount_paid}` : "Free"
    const show_actions = payment?.status === "paid" && status !== "cancelled"
    const is_loading = loading_id === registration_id

    return (
        <View style={styles.container}>
            <Touchable onPress={() => onPress?.(registration_id)}>
                <View style={styles.body}>
                    <Row align="center" justify="space-between">
                        <Text size={16} weight="semibold" style={styles.name}>{primary_name}</Text>
                        <View style={styles.count_badge}>
                            <Text size={12} color={colors.light_primary}>
                                {participant_count} {participant_count === 1 ? "participant" : "participants"}
                            </Text>
                        </View>
                    </Row>

                    <Row align="center" justify="space-between" style={styles.meta_row}>
                        <Text size={13} color={colors.text_secondary}>
                            {date_label}{date_label ? " · " : ""}{amount_label}
                        </Text>
                        <Row gap={6}>
                            <View style={[styles.badge, { backgroundColor: payment_style.background }]}>
                                <Text size={12} color={payment_style.text}>{payment_label}</Text>
                            </View>
                            <View style={[styles.badge, { backgroundColor: status_style.background }]}>
                                <Text size={12} color={status_style.text}>{status_label}</Text>
                            </View>
                        </Row>
                    </Row>
                </View>
            </Touchable>

            {show_actions && (
                <Row gap={10} style={styles.actions}>
                    <View style={styles.action_button}>
                        <Button
                            size="sm"
                            type="primary"
                            loading={is_loading}
                            disabled={is_loading}
                            onPress={() => onAccept?.(registration_id)}
                        >
                            Accept
                        </Button>
                    </View>
                    <View style={styles.action_button}>
                        <Button
                            size="sm"
                            type="danger"
                            loading={is_loading}
                            disabled={is_loading}
                            onPress={() => onReject?.(registration_id)}
                        >
                            Reject
                        </Button>
                    </View>
                </Row>
            )}
        </View>
    )
}

export default memo(RegistrationListCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: heightPixel(14),
        backgroundColor: colors.card,
        borderWidth: heightPixel(1),
        borderColor: colors.border,
        overflow: "hidden",
        ...SHADOW.sm,
    },
    body: {
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(14),
        gap: heightPixel(8),
    },
    name: {
        flex: 1,
    },
    count_badge: {
        backgroundColor: colors.primary_10,
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(4),
        borderRadius: heightPixel(8),
    },
    meta_row: {
        flexWrap: "wrap",
        gap: heightPixel(6),
    },
    badge: {
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(4),
        borderRadius: heightPixel(8),
    },
    actions: {
        paddingHorizontal: widthPixel(14),
        paddingBottom: heightPixel(14),
    },
    action_button: {
        flex: 1,
    },
})
