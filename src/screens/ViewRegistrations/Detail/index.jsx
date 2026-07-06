import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Row from "../../../components/Row"
import SummaryRow from "../../../components/SummaryRow"
import SummarySection from "../../../components/SummarySection"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import PrimaryLayout from "../../../layouts/PrimaryLayout"
import useDetailController from "./useDetailController"

const Detail = () => {

    const { values, functions } = useDetailController()

    if (values.isLoading) {
        return (
            <PrimaryLayout header background>
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.light_primary} />
                </View>
            </PrimaryLayout>
        )
    }

    if (!values.registration) {
        return (
            <PrimaryLayout header background>
                <View style={styles.loader}>
                    <Text size={16} color={colors.text_secondary}>Registration not found.</Text>
                </View>
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header background scrollable>
            <View style={styles.container}>
                {values.event_summary.length > 0 && (
                    <SummarySection title="Event Details">
                        {values.event_summary.map((item, index) => (
                            <SummaryRow
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                highlight={item.highlight}
                                last={index === values.event_summary.length - 1}
                            />
                        ))}
                    </SummarySection>
                )}

                <SummarySection title="Registration Details">
                    {values.registration_summary.map((item, index) => (
                        <SummaryRow
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlight={item.highlight}
                            last={index === values.registration_summary.length - 1}
                        />
                    ))}
                </SummarySection>

                <SummarySection title={`Participants (${values.participants_summary.length})`}>
                    {values.participants_summary.map((participant) => (
                        <View key={participant.title} style={styles.participant_block}>
                            <Text size={16} weight="bold" color={colors.light_primary}>
                                {participant.title}
                            </Text>
                            {participant.rows.map((row, index) => (
                                <SummaryRow
                                    key={`${participant.title}-${row.label}`}
                                    label={row.label}
                                    value={row.value}
                                    last={index === participant.rows.length - 1}
                                />
                            ))}
                        </View>
                    ))}
                </SummarySection>

                {values.show_actions && (
                    <Row gap={10} style={styles.actions}>
                        <View style={styles.action_button}>
                            <Button
                                size="md"
                                type="primary"
                                loading={values.action_loading}
                                disabled={values.action_loading}
                                onPress={functions.onAccept}
                            >
                                Accept
                            </Button>
                        </View>
                        <View style={styles.action_button}>
                            <Button
                                size="md"
                                type="danger"
                                loading={values.action_loading}
                                disabled={values.action_loading}
                                onPress={functions.onReject}
                            >
                                Reject
                            </Button>
                        </View>
                    </Row>
                )}
            </View>
        </PrimaryLayout>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(20),
    },
    participant_block: {
        paddingVertical: heightPixel(8),
        gap: heightPixel(2),
    },
    actions: {
        marginTop: heightPixel(4),
    },
    action_button: {
        flex: 1,
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(40),
    },
})
