import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import KeyboardAvoidingWrapper from "../../../components/KeyboardAvoidingWrapper"
import PhoneInput from "../../../components/PhoneInput"
import RegistrationStepIndicator from "../../../components/RegistrationStepIndicator"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel, widthPixel } from "../../../helpers/metrics"
import PrimaryLayout from "../../../layouts/PrimaryLayout"
import useParticipantDetailsController from "./useParticipantDetailsController"

const ParticipantDetails = () => {

    const { values, functions } = useParticipantDetailsController()
    const { formik } = values

    return (
        <PrimaryLayout header background scrollable>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <RegistrationStepIndicator current={3} total={4} />

                    <View style={styles.header}>
                        <Text size={19} weight="semibold">New Participant Details</Text>
                        <Text size={14} color={colors.text_secondary}>
                            Fill in the details below to register a new participant.
                        </Text>
                    </View>

                    {values.event && (
                        <View style={styles.event_chip}>
                            <Text size={12} color={colors.text_muted}>Selected Event</Text>
                            <Text size={15} weight="semibold">{values.event.name}</Text>
                        </View>
                    )}

                    <Input
                        required
                        label="Full Name"
                        placeholder="Enter full name"
                        value={formik.values.name}
                        onChangeText={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        error={formik.touched.name && formik.errors.name}
                    />

                    <Row gap={12}>
                        <View style={styles.half_field}>
                            <Input
                                required
                                type="number"
                                label="Age"
                                placeholder="Enter age"
                                value={formik.values.age?.toString() ?? ""}
                                onChangeText={formik.handleChange("age")}
                                onBlur={formik.handleBlur("age")}
                                error={formik.touched.age && formik.errors.age}
                            />
                        </View>
                        <View style={styles.half_field}>
                            <Input
                                label="YSB ID"
                                placeholder="Optional"
                                value={formik.values.membership_id}
                                onChangeText={formik.handleChange("membership_id")}
                                onBlur={formik.handleBlur("membership_id")}
                            />
                        </View>
                    </Row>

                    <PhoneInput
                        required
                        label="Contact Number"
                        value={formik.values.phone?.number}
                        onChangeText={(number) => formik.setFieldValue("phone.number", number)}
                        onChangeCountry={(country) => {
                            formik.setFieldValue("phone.country_code", country.code)
                            formik.setFieldValue("phone.dialing_code", country.calling_code)
                        }}
                        onBlur={formik.handleBlur("phone.number")}
                        error={formik.touched.phone?.number && formik.errors.phone?.number}
                        default_country={{
                            code: formik.values.phone?.country_code,
                            calling_code: formik.values.phone?.dialing_code,
                        }}
                    />

                    <Input
                        label="Jamatkhana"
                        placeholder="Enter jamatkhana"
                        value={formik.values.jamatkhana}
                        onChangeText={formik.handleChange("jamatkhana")}
                        onBlur={formik.handleBlur("jamatkhana")}
                        error={formik.touched.jamatkhana && formik.errors.jamatkhana}
                    />

                    <PhoneInput
                        label="WhatsApp Number"
                        value={formik.values.whatsapp?.number}
                        onChangeText={functions.onWhatsappPhoneChange}
                        onChangeCountry={functions.onWhatsappCountryChange}
                        default_country={{
                            code: formik.values.whatsapp?.country_code,
                            calling_code: formik.values.whatsapp?.dialing_code,
                        }}
                    />

                    <Text size={16} weight="semibold">Emergency Contact</Text>

                    <Input
                        label="Contact Name"
                        placeholder="Enter name"
                        value={formik.values.emergency_contact?.name}
                        onChangeText={formik.handleChange("emergency_contact.name")}
                        onBlur={formik.handleBlur("emergency_contact.name")}
                    />

                    <Row gap={12}>
                        <View style={styles.half_field}>
                            <Input
                                label="Relation"
                                placeholder="e.g. Father"
                                value={formik.values.emergency_contact?.relation}
                                onChangeText={formik.handleChange("emergency_contact.relation")}
                                onBlur={formik.handleBlur("emergency_contact.relation")}
                            />
                        </View>
                        <View style={styles.half_field}>
                            <PhoneInput
                                label="Contact Phone"
                                value={formik.values.emergency_contact?.phone?.number}
                                onChangeText={functions.onEmergencyPhoneChange}
                                onChangeCountry={functions.onEmergencyCountryChange}
                                default_country={{
                                    code: formik.values.emergency_contact?.phone?.country_code,
                                    calling_code: formik.values.emergency_contact?.phone?.dialing_code,
                                }}
                            />
                        </View>
                    </Row>

                    <Button onPress={functions.onSaveParticipant}>
                        Save Participant
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default ParticipantDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
        paddingBottom: heightPixel(30),
    },
    header: {
        gap: heightPixel(6),
    },
    event_chip: {
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        backgroundColor: colors.surface_brand,
        gap: heightPixel(4),
        borderWidth: heightPixel(1),
        borderColor: colors.border_brand,
    },
    half_field: {
        flex: 1,
    },
})
