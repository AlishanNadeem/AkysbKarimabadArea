import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import DateTimeInput from "../../components/DateTimeInput"
import Row from "../../components/Row"
import SelectorBox from "../../components/SelectorBox"
import Text from "../../components/Text"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCheckInSettingController from "./useCheckInSettingController"

const CheckInSetting = () => {

    const { values, functions } = useCheckInSettingController()

    return (
        <PrimaryLayout background header scrollable>
            <View style={styles.container}>

                <DateTimeInput
                    label="First Check - In Time"
                    placeholder="Select time"
                    value={values.time}
                    onChangeText={functions.setTime}
                    type="time"
                />

                <Text size={19} weight="semibold">Daily Frequency</Text>
                <Row justify="space-between" style={styles.options_row}>
                    {
                        values.frequency_options.map((item) => (
                            <SelectorBox
                                key={item}
                                label={item}
                                selected={values.frequency === item}
                                onPress={() => functions.setFrequency(item)}
                            />
                        ))
                    }
                </Row>

                <Text size={19} weight="semibold">Interval Gap</Text>
                <Row justify="space-between" style={styles.options_row}>
                    {
                        values.interval_options.map((item) => (
                            <SelectorBox
                                key={item}
                                label={item}
                                selected={values.interval === item}
                                onPress={() => functions.setInterval(item)}
                            />
                        ))
                    }
                </Row>

                <Text size={19} weight="semibold">SOS Alert Delay</Text>
                <Row justify="space-between" style={styles.options_row}>
                    {
                        values.sos_options.map((item) => (
                            <SelectorBox
                                key={item}
                                label={item}
                                selected={values.sos === item}
                                onPress={() => functions.setSos(item)}
                            />
                        ))
                    }
                </Row>

                <Button type="danger" onPress={functions.onSave}>Save</Button>

            </View>
        </PrimaryLayout>
    )
}

export default CheckInSetting

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(23),
    },
    options_row: {
        flexWrap: "wrap",
        rowGap: heightPixel(13)
    },
})