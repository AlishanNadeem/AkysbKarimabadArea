import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Checkbox from "../../../components/Checkbox"
import Input from "../../../components/Input"
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

    return (
        <PrimaryLayout header background scrollable>
            <View style={styles.container}>
                <RegistrationStepIndicator current={2} total={4} />

                <View style={styles.header}>
                    <Text size={19} weight="semibold">Search Participant</Text>
                    <Text size={14} color={colors.text_secondary}>
                        Search by contact number or YSB ID, or register a new participant.
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
                        <Button size="sm" type="secondary" onPress={functions.onRegisterNew}>
                            Add New Participant
                        </Button>
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

                    <Row gap={10}>
                        <View style={styles.half_field}>
                            <Button size="sm" type="primary" onPress={functions.runSearch}>
                                Search Participant
                            </Button>
                        </View>
                        <View style={styles.half_field}>
                            <Button size="sm" type="secondary" onPress={functions.onRegisterNew}>
                                Register New
                            </Button>
                        </View>
                    </Row>
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

                {values.participants.length > 0 && (
                    <Button onPress={functions.onContinue}>
                        Continue ({values.participants.length})
                    </Button>
                )}
            </View>
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
    half_field: {
        flex: 1,
    },
})
