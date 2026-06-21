import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import FlatList from "../../components/FlatList"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useEventsController from "./useEventsController"

const Events = () => {

    const { values, functions } = useEventsController()

    return (
        <PrimaryLayout header background bottom_tab>
            <View style={styles.container}>

                <View style={styles.add_button}>
                    <Button size="sm" onPress={functions.onCreate}>Create</Button>
                </View>

                <FlatList
                    data={values.events}
                    separator={12}
                    empty={{
                        title: "No Events",
                        description: "There are no events yet. Create one to get started.",
                    }}
                    renderItem={() => null}
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
    add_button: {
        width: "35%",
        alignSelf: "flex-end",
    },
})
