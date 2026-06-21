import { StyleSheet, View } from "react-native"
import AlertInfoCard from "../../components/AlertInfoCard"
import Button from "../../components/Button"
import SOSAlertCard from "../../components/SOSAlertCard"
import Text from "../../components/Text"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useAlertDetailsController from "./useAlertDetailsController"

const AlertDetails = () => {

    const { values, functions } = useAlertDetailsController()

    return (
        <PrimaryLayout background header>
            <View style={styles.container}>
                {
                    values.alert_mode &&
                    <SOSAlertCard
                        data={{
                            timestamp: "2026-04-23T17:15:00",
                            ...(values.alert_mode === "user" ? { user: { name: "Max", relation: "Daughter" } } : {})
                        }}
                    />
                }
                {
                    values.info.map((item, index) => (
                        <AlertInfoCard key={index} data={item} onPressAction={item.onPressAction} />
                    ))
                }
                <Button onPress={functions.onStopAlert} type="danger">I am safe - Stop Alert</Button>
                <Text>A 'Safe' Notification will be sent to all ICE contacts.</Text>
            </View>
        </PrimaryLayout>
    )
}

export default AlertDetails

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(21)
    }
})