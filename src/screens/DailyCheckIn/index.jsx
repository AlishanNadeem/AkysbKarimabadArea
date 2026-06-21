import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useDailyCheckInController from "./useDailyCheckInController"

const DailyCheckIn = () => {

    const { values, functions } = useDailyCheckInController()

    return (
        <PrimaryLayout header background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text size={19} weight="semibold">We care about you, how are you doing?</Text>
                    <Text size={16}>Just a quick daily check-in to see how you feel.</Text>
                </View>
                {
                    values.options.map((option) => (
                        <Touchable
                            key={option.value}
                            onPress={() => functions.onSelect(option.value)}
                            style={styles.option}
                        >
                            <Row justify="space-between">
                                <Text weight="semibold" color={colors.black}>{option.label}</Text>
                                <View style={styles.radio}>
                                    {
                                        values.selected === option.value &&
                                        <View style={styles.radio_selected} />
                                    }
                                </View>
                            </Row>
                        </Touchable>
                    ))
                }
                <Button type="danger" onPress={functions.onSubmit} disabled={!values.can_submit}>Submit</Button>
            </View>
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(30),
    },
    header: {
        gap: heightPixel(6),
    },
    option: {
        paddingHorizontal: widthPixel(21),
        paddingVertical: heightPixel(20),
        borderRadius: widthPixel(10),
        backgroundColor: colors.yellowish_primary,
    },
    radio: {
        width: widthPixel(20),
        height: widthPixel(20),
        borderRadius: widthPixel(10),
        borderWidth: heightPixel(1.5),
        borderColor: colors.danger,
        alignItems: "center",
        justifyContent: "center"
    },
    radio_selected: {
        width: widthPixel(10),
        height: widthPixel(10),
        borderRadius: widthPixel(10),
        backgroundColor: colors.danger
    },
})

export default DailyCheckIn