import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import PhoneInput from "../../components/PhoneInput"
import Row from "../../components/Row"
import DropDown from "../../components/DropDown"
import SelectorBox from "../../components/SelectorBox"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { formatParticipantPhone } from "../../helpers/participant"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useManageRegistrationController from "./useManageRegistrationController"

const ManageRegistration = () => {

    const { values, functions } = useManageRegistrationController()
    const { formik } = values

    return (
        <PrimaryLayout header background scrollable>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>

                    <Text size={19} weight="semibold">Participant Information</Text>

                    <PhoneInput
                        required
                        label="Contact Number"
                        value={formik.values.search.number}
                        onChangeText={functions.onSearchPhoneChange}
                        onChangeCountry={functions.onSearchCountryChange}
                        onBlur={formik.handleBlur("search.number")}
                        default_country={{
                            code: formik.values.search.country_code,
                            calling_code: formik.values.search.dialing_code,
                        }}
                    />

                    <Text size={13} color={colors.gray}>
                        Enter a contact number to search for a participant.
                    </Text>

                    {values.is_searching && (
                        <View style={styles.search_state}>
                            <ActivityIndicator size="small" color={colors.dark_gray} />
                            <Text size={13} color={colors.gray}>Searching participants...</Text>
                        </View>
                    )}

                    {values.show_no_results && (
                        <View style={styles.empty_results}>
                            <Text size={14} color={colors.dark_gray}>
                                No participant found for this contact number.
                            </Text>
                        </View>
                    )}

                    {values.search_results.length > 0 && (
                        <View style={styles.results}>
                            <Text size={14} weight="semibold">Select Participant</Text>
                            {values.search_results.map((item) => (
                                <Touchable
                                    key={item._id ?? item.id}
                                    onPress={() => functions.selectParticipant(item)}
                                >
                                    <View style={styles.result_item}>
                                        <Text size={15} weight="semibold">{item.name}</Text>
                                        <Text size={13} color={colors.gray}>
                                            {item.membership_id} · {formatParticipantPhone(item.phone)}
                                        </Text>
                                    </View>
                                </Touchable>
                            ))}
                        </View>
                    )}

                    {values.has_participant && (
                        <>
                            <Input
                                disabled
                                label="Full Name"
                                value={formik.values.name}
                            />

                            <Row gap={12}>
                                <View style={styles.half_field}>
                                    <Input
                                        disabled
                                        label="Age"
                                        value={formik.values.age}
                                    />
                                </View>
                                <View style={styles.half_field}>
                                    <Input
                                        disabled
                                        label="Membership ID"
                                        value={formik.values.membership_id}
                                    />
                                </View>
                            </Row>

                            <Input
                                disabled
                                label="Jamatkhana"
                                value={formik.values.jamatkhana}
                            />

                            <Input
                                disabled
                                label="WhatsApp Number"
                                value={formatParticipantPhone(formik.values.whatsapp)}
                            />

                            <Text size={16} weight="semibold">Emergency Contact</Text>

                            <Input
                                disabled
                                label="Contact Name"
                                value={formik.values.emergency_contact.name}
                            />

                            <Row gap={12}>
                                <View style={styles.half_field}>
                                    <Input
                                        disabled
                                        label="Relation"
                                        value={formik.values.emergency_contact.relation}
                                    />
                                </View>
                                <View style={styles.half_field}>
                                    <Input
                                        disabled
                                        label="Contact Phone"
                                        value={formatParticipantPhone(formik.values.emergency_contact.phone)}
                                    />
                                </View>
                            </Row>

                            {formik.touched.participant && formik.errors.participant && (
                                <Text size={12} color={colors.danger}>
                                    {formik.errors.participant}
                                </Text>
                            )}
                        </>
                    )}

                    <Text size={19} weight="semibold">Event Details</Text>

                    <DropDown
                        required
                        label="Event"
                        placeholder="Select event"
                        modalTitle="Select Event"
                        value={formik.values.event}
                        displayValue={values.selected_event?.name}
                        data={values.published_events}
                        keyExtractor={(item) => item._id ?? item.id}
                        getLabel={(item) => item.name}
                        onSelect={functions.setEvent}
                        error={formik.touched.event && formik.errors.event}
                    />

                    <Input
                        disabled
                        label="Amount Paid"
                        placeholder="0"
                        value={formik.values.amount_paid?.toString() ?? "0"}
                    />

                    {values.is_paid_event && (
                        <>
                            <Text size={19} weight="semibold">Payment</Text>

                            <Text size={14} color={colors.gray}>Payment Method</Text>
                            <Row gap={8} style={styles.options_row}>
                                {values.payment_methods.map((item) => (
                                    <SelectorBox
                                        key={item.value}
                                        label={item.label}
                                        selected={formik.values.payment.method === item.value}
                                        onPress={() => functions.setPaymentMethod(item.value)}
                                    />
                                ))}
                            </Row>
                            {formik.touched.payment?.method && formik.errors.payment?.method && (
                                <Text size={12} color={colors.danger}>
                                    {formik.errors.payment.method}
                                </Text>
                            )}

                            <Input
                                type="textarea"
                                label="Payment Notes"
                                placeholder="Optional notes about payment"
                                value={formik.values.payment.notes}
                                onChangeText={formik.handleChange("payment.notes")}
                                onBlur={formik.handleBlur("payment.notes")}
                                error={formik.touched.payment?.notes && formik.errors.payment?.notes}
                            />
                        </>
                    )}

                    {!values.is_paid_event && values.selected_event && (
                        <View style={styles.free_notice}>
                            <Text size={14} color={colors.dark_gray}>
                                This is a free event. No payment details are required.
                            </Text>
                        </View>
                    )}

                    <Button onPress={formik.handleSubmit}>
                        Register
                    </Button>

                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default ManageRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(20),
        paddingBottom: heightPixel(30),
    },
    half_field: {
        flex: 1,
    },
    search_state: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(8),
    },
    empty_results: {
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        backgroundColor: colors.light_gray,
    },
    results: {
        gap: heightPixel(8),
    },
    result_item: {
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        backgroundColor: colors.white,
        gap: heightPixel(4),
    },
    options_row: {
        flexWrap: "wrap",
        rowGap: heightPixel(10),
    },
    free_notice: {
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        backgroundColor: colors.light_gray,
    },
})
