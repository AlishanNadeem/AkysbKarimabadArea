import { StyleSheet, Switch, View } from "react-native"
import Text from "../../components/Text"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import Button from "../../components/Button"
import Row from "../../components/Row"
import Icon from "../../components/Icon"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import useConfigureController from "./useConfigureController"

const Configure = () => {

    const { values, functions } = useConfigureController()

    return (
        <PrimaryLayout background header>
            <View style={styles.container}>
                <View>
                    <View style={styles.section_header}>
                        <Text size={19} weight="semibold">Safety Center</Text>
                    </View>

                    <Row align="center" justify="space-between" style={styles.row_item}>
                        <Text>Check-in Reminders Setting</Text>
                        <Icon source={images.arrow_right} size={30} space rounded="half" background={colors.lightest_white} onPress={functions.onCheckInSettings} />
                    </Row>

                    <Row align="center" justify="space-between" style={styles.row_item}>
                        <Text>Location Sharing</Text>
                        <Switch
                            value={values.is_location_sharing_enabled}
                            onValueChange={functions.onLocationSharingToggle}
                            thumbColor={colors.white}
                            trackColor={{ true: colors.dark_primary, false: colors.dark_gray }}
                        />
                    </Row>

                    <Row align="center" justify="space-between" style={styles.row_item}>
                        <Text>Notifications</Text>
                        <Switch
                            value={values.is_notifications_enabled}
                            onValueChange={functions.onNotificationsToggle}
                            thumbColor={colors.white}
                            trackColor={{ true: colors.dark_primary, false: colors.dark_gray }}
                        />
                    </Row>
                </View>

                <View style={styles.alert_section}>
                    <Text size={19} weight="semibold">Alert Simulation</Text>
                    <Text>Use the button below to generate SOS alert in case of an emergency. This Alert will be broadcast to all your contacts.</Text>
                </View>

                <Button type="danger" onPress={functions.onTriggerAlert} icon={images.siren}>Trigger SOS Alert</Button>

            </View>
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(28),
    },
    section_header: {
        paddingVertical: heightPixel(18),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.lightest_white,
    },
    row_item: {
        paddingVertical: heightPixel(18),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.lightest_white,
    },
    alert_section: {
        gap: heightPixel(8),
    },
})

export default Configure