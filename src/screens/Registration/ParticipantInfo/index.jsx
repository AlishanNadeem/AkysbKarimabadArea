import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Checkbox from "../../../components/Checkbox"
import Input from "../../../components/Input"
import KeyboardAvoidingWrapper from "../../../components/KeyboardAvoidingWrapper"
import ParticipantRosterCard from "../../../components/ParticipantRosterCard"
import PhoneInput from "../../../components/PhoneInput"
import RegistrationStepIndicator from "../../../components/RegistrationStepIndicator"
import Row from "../../../components/Row"
import SelectorBox from "../../../components/SelectorBox"
import Text from "../../../components/Text"
import Touchable from "../../../components/Touchable"
import colors from "../../../helpers/colors"
import { heightPixel, widthPixel } from "../../../helpers/metrics"
import PrimaryLayout from "../../../layouts/PrimaryLayout"
import useParticipantInfoController from "./useParticipantInfoController"

const ParticipantInfo = () => {

    const { values, functions } = useParticipantInfoController()
    const { draft_formik } = values

    return (
        <PrimaryLayout header background scrollable>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <RegistrationStepIndicator current={2} />

                    <View style={styles.header}>
                        <Text size={19} weight="semibold">Participant Information</Text>
                        <Text size={14} color={colors.text_secondary}>
                            Search by contact number or YSB ID, or register new participants.
                        </Text>
                    </View>

                    {values.event && (
                        <View style={styles.event_chip}>
                            <Text size={12} color={colors.text_muted}>Selected Event</Text>
                            <Text size={15} weight="semibold">{values.event.name}</Text>
                        </View>
                    )}

                    {values.participants.length > 0 && (
                        <View style={styles.roster_section}>
                            <Text size={16} weight="semibold">
                                Registered Participants ({values.participants.length})
                            </Text>
                            {values.participants.map((item) => (
                                <ParticipantRosterCard
                                    key={item.local_id}
                                    data={item}
                                    onRemove={functions.removeParticipant}
                                />
                            ))}
                        </View>
                    )}

                    <View style={styles.search_section}>
                        <Text size={16} weight="semibold">Search Participant</Text>
                        <Row gap={8} style={styles.options_row}>
                            {values.search_modes.map((item) => (
                                <SelectorBox
                                    key={item.value}
                                    label={item.label}
                                    selected={values.search_mode === item.value}
                                    onPress={() => functions.onSearchModeChange(item.value)}
                                />
                            ))}
                        </Row>

                        {values.search_mode === "phone" ? (
                            <PhoneInput
                                required
                                label="Contact Number"
                                value={values.phone_search.number}
                                onChangeText={functions.onSearchPhoneChange}
                                onChangeCountry={functions.onSearchCountryChange}
                                default_country={{
                                    code: values.phone_search.country_code,
                                    calling_code: values.phone_search.dialing_code,
                                }}
                            />
                        ) : (
                            <Input
                                required
                                label="YSB ID"
                                placeholder="e.g. AK-1024"
                                value={values.ysb_id_search}
                                onChangeText={functions.onYsbIdChange}
                            />
                        )}

                        <Button size="sm" type="primary" onPress={functions.runSearch}>
                            Search Participant
                        </Button>
                    </View>

                    {values.is_searching && (
                        <View style={styles.search_state}>
                            <ActivityIndicator size="small" color={colors.light_primary} />
                            <Text size={13} color={colors.text_secondary}>Searching participants...</Text>
                        </View>
                    )}

                    {values.search_results.length > 0 && (
                        <View style={styles.results}>
                            <Text size={14} weight="semibold">Select Participants</Text>
                            <Text size={13} color={colors.gray}>
                                You can select more than one participant from the results.
                            </Text>
                            {values.search_results.map((item) => {
                                const id = item._id ?? item.id
                                const is_checked = values.checked_result_ids.includes(id)

                                return (
                                    <Touchable
                                        key={id}
                                        onPress={() => functions.toggleResultCheck(id)}
                                    >
                                        <View style={[
                                            styles.result_item,
                                            is_checked && styles.result_item_selected,
                                        ]}>
                                            <Row align="center" gap={10}>
                                                <Checkbox
                                                    value={is_checked}
                                                    onChange={() => functions.toggleResultCheck(id)}
                                                />
                                                <View style={styles.result_content}>
                                                    <Text size={15} weight="semibold">{item.name}</Text>
                                                    <Text size={13} color={colors.text_secondary}>
                                                        {item.membership_id} · {functions.formatParticipantPhone(item.phone)}
                                                    </Text>
                                                </View>
                                            </Row>
                                        </View>
                                    </Touchable>
                                )
                            })}
                            {values.has_checked_results && (
                                <Button size="sm" type="secondary" onPress={functions.addSelectedFromSearch}>
                                    Add Selected ({values.checked_result_ids.length})
                                </Button>
                            )}
                        </View>
                    )}

                    {values.show_no_results && (
                        <View style={styles.empty_results}>
                            <Text size={14} weight="semibold" color={colors.text_primary}>
                                No participant found
                            </Text>
                            <Text size={13} color={colors.gray}>
                                Fill in the details below to register a new participant.
                            </Text>
                        </View>
                    )}

                    <View style={styles.form_section}>
                        <Text size={18} weight="bold">New Participant Details</Text>

                        <Input
                            required
                            label="Full Name"
                            placeholder="Enter full name"
                            value={draft_formik.values.name}
                            onChangeText={draft_formik.handleChange("name")}
                            onBlur={draft_formik.handleBlur("name")}
                            error={draft_formik.touched.name && draft_formik.errors.name}
                        />

                        <Row gap={12}>
                            <View style={styles.half_field}>
                                <Input
                                    required
                                    type="number"
                                    label="Age"
                                    placeholder="Enter age"
                                    value={draft_formik.values.age?.toString() ?? ""}
                                    onChangeText={draft_formik.handleChange("age")}
                                    onBlur={draft_formik.handleBlur("age")}
                                    error={draft_formik.touched.age && draft_formik.errors.age}
                                />
                            </View>
                            <View style={styles.half_field}>
                                <Input
                                    label="YSB ID"
                                    placeholder="Optional"
                                    value={draft_formik.values.membership_id}
                                    onChangeText={draft_formik.handleChange("membership_id")}
                                    onBlur={draft_formik.handleBlur("membership_id")}
                                />
                            </View>
                        </Row>

                        <PhoneInput
                            required
                            label="Contact Number"
                            value={draft_formik.values.phone?.number}
                            onChangeText={(number) => draft_formik.setFieldValue("phone.number", number)}
                            onChangeCountry={(country) => {
                                draft_formik.setFieldValue("phone.country_code", country.code)
                                draft_formik.setFieldValue("phone.dialing_code", country.calling_code)
                            }}
                            onBlur={draft_formik.handleBlur("phone.number")}
                            error={draft_formik.touched.phone?.number && draft_formik.errors.phone?.number}
                            default_country={{
                                code: draft_formik.values.phone?.country_code || values.phone_search.country_code,
                                calling_code: draft_formik.values.phone?.dialing_code || values.phone_search.dialing_code,
                            }}
                        />

                        <Input
                            label="Jamatkhana"
                            placeholder="Enter jamatkhana"
                            value={draft_formik.values.jamatkhana}
                            onChangeText={draft_formik.handleChange("jamatkhana")}
                            onBlur={draft_formik.handleBlur("jamatkhana")}
                            error={draft_formik.touched.jamatkhana && draft_formik.errors.jamatkhana}
                        />

                        <PhoneInput
                            label="WhatsApp Number"
                            value={draft_formik.values.whatsapp?.number}
                            onChangeText={functions.onWhatsappPhoneChange}
                            onChangeCountry={functions.onWhatsappCountryChange}
                            default_country={{
                                code: draft_formik.values.whatsapp?.country_code || values.phone_search.country_code,
                                calling_code: draft_formik.values.whatsapp?.dialing_code || values.phone_search.dialing_code,
                            }}
                        />

                        <Text size={16} weight="semibold">Emergency Contact</Text>

                        <Input
                            label="Contact Name"
                            placeholder="Enter name"
                            value={draft_formik.values.emergency_contact?.name}
                            onChangeText={draft_formik.handleChange("emergency_contact.name")}
                            onBlur={draft_formik.handleBlur("emergency_contact.name")}
                        />

                        <Row gap={12}>
                            <View style={styles.half_field}>
                                <Input
                                    label="Relation"
                                    placeholder="e.g. Father"
                                    value={draft_formik.values.emergency_contact?.relation}
                                    onChangeText={draft_formik.handleChange("emergency_contact.relation")}
                                    onBlur={draft_formik.handleBlur("emergency_contact.relation")}
                                />
                            </View>
                            <View style={styles.half_field}>
                                <PhoneInput
                                    label="Contact Phone"
                                    value={draft_formik.values.emergency_contact?.phone?.number}
                                    onChangeText={functions.onEmergencyPhoneChange}
                                    onChangeCountry={functions.onEmergencyCountryChange}
                                    default_country={{
                                        code: draft_formik.values.emergency_contact?.phone?.country_code || values.phone_search.country_code,
                                        calling_code: draft_formik.values.emergency_contact?.phone?.dialing_code || values.phone_search.dialing_code,
                                    }}
                                />
                            </View>
                        </Row>

                        <Row gap={10}>
                            <View style={styles.half_field}>
                                <Button size="sm" onPress={functions.addDraftParticipant}>
                                    Add Participant
                                </Button>
                            </View>
                            {values.participants.length > 0 && (
                                <View style={styles.half_field}>
                                    <Button size="sm" type="primary" onPress={functions.addDraftParticipant}>
                                        Add More
                                    </Button>
                                </View>
                            )}
                        </Row>
                    </View>

                    {values.participants.length > 0 && (
                        <Button onPress={functions.onContinue}>
                            Continue ({values.participants.length})
                        </Button>
                    )}
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default ParticipantInfo

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
    roster_section: {
        gap: heightPixel(10),
    },
    search_section: {
        gap: heightPixel(12),
    },
    options_row: {
        flexWrap: "wrap",
        rowGap: heightPixel(10),
    },
    search_state: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(8),
    },
    empty_results: {
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        backgroundColor: colors.surface_brand,
        gap: heightPixel(4),
    },
    results: {
        gap: heightPixel(8),
    },
    result_item: {
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        borderWidth: heightPixel(1),
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    result_item_selected: {
        borderColor: colors.light_primary,
        backgroundColor: colors.surface_brand_strong,
    },
    result_content: {
        flex: 1,
        gap: heightPixel(4),
    },
    form_section: {
        gap: heightPixel(16),
        borderTopWidth: heightPixel(1),
        borderColor: colors.border,
        paddingTop: heightPixel(20),
    },
    half_field: {
        flex: 1,
    },
})
