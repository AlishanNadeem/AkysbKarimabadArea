import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import RegistrationStepIndicator from "../../../components/RegistrationStepIndicator"
import Row from "../../../components/Row"
import SelectorBox from "../../../components/SelectorBox"
import SummaryRow from "../../../components/SummaryRow"
import SummarySection from "../../../components/SummarySection"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import PrimaryLayout from "../../../layouts/PrimaryLayout"
import useConfirmationController from "./useConfirmationController.js"

const Confirmation = () => {

    const { values, functions } = useConfirmationController()
    const { formik } = values

    return (
        <PrimaryLayout header background scrollable>
            <View style={styles.container}>
                <RegistrationStepIndicator current={3} />

                <View style={styles.header}>
                    <Text size={19} weight="semibold">Confirm Registration</Text>
                    <Text size={14} color={colors.gray}>
                        Review all details before completing the registration.
                    </Text>
                </View>

                <SummarySection title="Event Details">
                    {values.event_summary.map((item) => (
                        <SummaryRow
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlight={item.highlight}
                        />
                    ))}
                </SummarySection>

                <SummarySection title={`Participants (${values.participants.length})`}>
                    {values.participants_summary.map((participant) => (
                        <View key={participant.title} style={styles.participant_block}>
                            <Text size={14} weight="semibold" color={colors.light_primary}>
                                {participant.title}
                            </Text>
                            {participant.rows.map((row) => (
                                <SummaryRow
                                    key={`${participant.title}-${row.label}`}
                                    label={row.label}
                                    value={row.value}
                                />
                            ))}
                        </View>
                    ))}
                </SummarySection>

                <SummarySection title="Payment">
                    {values.is_paid_event && (
                        <>
                            <SummaryRow
                                label="Participants"
                                value={values.participants.length.toString()}
                            />
                            <SummaryRow
                                label="Fee per participant"
                                value={`Rs. ${values.per_participant_fee}`}
                            />
                        </>
                    )}
                    <SummaryRow
                        label="Total Amount"
                        value={values.is_paid_event ? `Rs. ${values.amount_paid}` : "Free"}
                        highlight
                    />

                    {values.is_paid_event && (
                        <>
                            <View style={styles.payment_field}>
                                <Text size={14} color={colors.gray}>Payment Status</Text>
                                <Row gap={8} style={styles.options_row}>
                                    {values.payment_statuses.map((item) => (
                                        <SelectorBox
                                            key={item.value}
                                            label={item.label}
                                            selected={formik.values.status === item.value}
                                            onPress={() => functions.setPaymentStatus(item.value)}
                                        />
                                    ))}
                                </Row>
                                {formik.touched.status && formik.errors.status && (
                                    <Text size={12} color={colors.danger}>{formik.errors.status}</Text>
                                )}
                            </View>

                            {formik.values.status === "paid" && (
                                <View style={styles.payment_field}>
                                    <Text size={14} color={colors.gray}>Payment Method</Text>
                                    <Row gap={8} style={styles.options_row}>
                                        {values.payment_methods.map((item) => (
                                            <SelectorBox
                                                key={item.value}
                                                label={item.label}
                                                selected={formik.values.method === item.value}
                                                onPress={() => functions.setPaymentMethod(item.value)}
                                            />
                                        ))}
                                    </Row>
                                    {formik.touched.method && formik.errors.method && (
                                        <Text size={12} color={colors.danger}>{formik.errors.method}</Text>
                                    )}
                                </View>
                            )}

                            <View style={styles.payment_field}>
                                <Input
                                    type="textarea"
                                    label="Payment Notes"
                                    placeholder="Optional notes about payment"
                                    value={formik.values.notes}
                                    onChangeText={formik.handleChange("notes")}
                                    onBlur={formik.handleBlur("notes")}
                                    error={formik.touched.notes && formik.errors.notes}
                                />
                            </View>
                        </>
                    )}

                    {!values.is_paid_event && (
                        <View style={styles.free_notice}>
                            <Text size={14} color={colors.dark_gray}>
                                This is a free event. No payment is required.
                            </Text>
                        </View>
                    )}
                </SummarySection>

                <Button onPress={formik.handleSubmit} loading={values.isLoading}>
                    Register {values.participants.length > 1 ? `(${values.participants.length})` : ""}
                </Button>
            </View>
        </PrimaryLayout>
    )
}

export default Confirmation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(20),
        paddingBottom: heightPixel(30),
    },
    header: {
        gap: heightPixel(6),
    },
    participant_block: {
        paddingVertical: heightPixel(8),
        borderBottomWidth: heightPixel(1),
        borderBottomColor: colors.light_gray,
        gap: heightPixel(4),
    },
    payment_field: {
        paddingVertical: heightPixel(8),
        gap: heightPixel(8),
        borderBottomWidth: heightPixel(1),
        borderBottomColor: colors.light_gray,
    },
    options_row: {
        flexWrap: "wrap",
        rowGap: heightPixel(10),
    },
    free_notice: {
        paddingVertical: heightPixel(12),
    },
})
