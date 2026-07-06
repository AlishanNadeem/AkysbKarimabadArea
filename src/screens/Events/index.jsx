import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import EventCard from "../../components/EventCard"
import FlatList from "../../components/FlatList"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useEventsController from "./useEventsController"

const Events = () => {

    const { values, functions } = useEventsController()

    return (
        <PrimaryLayout header background>
            <View style={styles.container}>
                <Button onPress={functions.onCreate}>Create New Event</Button>
                <FlatList
                    data={values.data}
                    separator={12}
                    refreshing={values.refreshing}
                    onRefresh={functions.onRefresh}
                    empty={{
                        title: "No Events",
                        description: "There are no events yet. Create one to get started.",
                    }}
                    renderItem={({ item }) => (
                        <EventCard
                            data={item}
                            onEdit={functions.onEdit}
                        />
                    )}
                    loading={values.isLoading}
                />
            </View>
        </PrimaryLayout>
    )
}

export default Events

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
