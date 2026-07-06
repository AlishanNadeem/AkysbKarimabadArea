import { ScrollView, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import EventCard from "../../components/EventCard"
import HomeStatCard from "../../components/HomeStatCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useHomeController from "./useHomeController"
import Icon from "../../components/Icon"
import images from "../../assets/images"

const Home = () => {

    const { values, functions } = useHomeController()

    return (
        <PrimaryLayout header scrollable background>
            <View style={styles.container}>
                <View style={styles.greeting}>
                    <Row align="center" justify="space-between">
                        <Row align="center" gap={4} style={{
                            width: '50%',
                        }}>
                            <Text size={18} weight="semibold" color={colors.text_secondary}>{values.greeting}</Text>
                            <Icon source={images.hi_icon} size={24} color={colors.orange} />
                        </Row>
                        <Text size={13} color={colors.text_muted}>{values.today_date}</Text>
                    </Row>
                    <Text size={24} weight="bold">{values.user_name}</Text>
                    {values.user_subtitle ? (
                        <Text size={13} color={colors.text_secondary}>{values.user_subtitle}</Text>
                    ) : null}
                </View>
                <Button size="sm" type="primary" onPress={functions.onViewRegistrations}>
                    View Registrations
                </Button>

                <Row gap={10}>
                    {values.stats.map((item) => (
                        <HomeStatCard key={item.id} data={item} />
                    ))}
                </Row>

                <View style={styles.actions}>
                    <Row gap={10}>
                        <View style={styles.action_button}>
                            <Button size="sm" onPress={functions.onCreateEvent}>
                                Create Event
                            </Button>
                        </View>
                        <View style={styles.action_button}>
                            <Button size="sm" onPress={functions.onBrowseEvents}>
                                All Events
                            </Button>
                        </View>
                    </Row>
                    <Button size="sm" onPress={functions.onNewRegistration}>
                        New Registration
                    </Button>
                </View>

                <View style={styles.section}>
                    <Row align="center" justify="space-between">
                        <Text size={19} weight="semibold">Upcoming</Text>
                        <Text size={14} color={colors.text_secondary} onPress={functions.onBrowseEvents}>
                            View all
                        </Text>
                    </Row>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.upcoming_list}
                    >
                        {values.upcoming_events.map((item, index) => (
                            <View
                                key={item._id}
                                style={[styles.event_card, index > 0 && styles.event_card_spacing]}
                            >
                                <EventCard
                                    data={item}
                                    onEdit={functions.onEditEvent}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>

            </View>
        </PrimaryLayout >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(20),
    },
    greeting: {
        gap: heightPixel(4),
    },
    actions: {
        gap: heightPixel(10),
    },
    action_button: {
        flex: 1,
    },
    section: {
        gap: heightPixel(12),
    },
    upcoming_list: {
        paddingVertical: heightPixel(2),
    },
    event_card: {
        width: widthPixel(280),
    },
    event_card_spacing: {
        marginLeft: widthPixel(12),
    },
})
