import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import ActivityLogCard from "../../components/ActivityLogCard"
import DailyCheckInCard from "../../components/DailyCheckInCard"
import DashboardStatCard from "../../components/DashboardStatCard"
import FlatList from "../../components/FlatList"
import Row from "../../components/Row"
import SOSAlertCard from "../../components/SOSAlertCard"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { ACTIVITY_LOGS } from "../../helpers/data"
import { getGreeting } from "../../helpers/general"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useHomeController from "./useHomeController"


const Home = () => {

    const { values, functions } = useHomeController()

    return (
        <PrimaryLayout header bottom_tab scrollable background>
            <View style={styles.container}>
                {
                    values.alert_mode &&
                    <SOSAlertCard
                        onPress={functions.onAlert}
                        data={{
                            timestamp: "2026-04-23T17:15:00",
                            ...(values.alert_mode === "user" ? { user: { name: "Max", relation: "Daughter" } } : {})
                        }}
                    />
                }
                <DailyCheckInCard
                    data={{
                        greeting: getGreeting(),
                        description: "It's time for your daily wellness check-in. How are you feeling today?",
                        progress: values.timer
                    }}
                    onPress={functions.onCheckIn}
                />


                <Row gap={16}>
                    <DashboardStatCard
                        data={{
                            label: "Checking Up",
                            title: "Next Check-In",
                            value: "5h 15m Remaining",
                            progress: 70,
                            icon: images.clock,
                            background_color: colors.lightest_primary,
                            icon_background: colors.dark_primary,
                        }}
                    />
                    <DashboardStatCard
                        data={{
                            label: "Checking Up",
                            title: "ICE Contacts",
                            value: "4 Active Contacts",
                            progress: 70,
                            icon: images.shield,
                            background_color: colors.yellowish_primary,
                            icon_background: colors.light_primary,
                        }}
                    />
                </Row>
                <Text size={19} weight="semibold">Activity Log</Text>
                <FlatList
                    data={ACTIVITY_LOGS}
                    renderItem={({ item }) => <ActivityLogCard data={item} />}
                />
            </View>
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16)
    }
})

export default Home