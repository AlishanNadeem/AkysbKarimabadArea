import { ActivityIndicator, StyleSheet, View } from "react-native"
import FlatList from "../../../components/FlatList"
import Input from "../../../components/Input"
import RegistrationEventCard from "../../../components/RegistrationEventCard"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import PrimaryLayout from "../../../layouts/PrimaryLayout"
import useSelectEventController from "./useSelectEventController"

const SelectEvent = () => {

    const { values, functions } = useSelectEventController()

    return (
        <PrimaryLayout header background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text size={19} weight="semibold">Select an Event</Text>
                    <Text size={14} color={colors.text_secondary}>
                        Choose an event to view its registrations.
                    </Text>
                </View>

                <Input
                    placeholder="Search ..."
                    value={values.search}
                    onChangeText={functions.onSearchChange}
                />

                {values.isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={colors.light_primary} />
                    </View>
                ) : (
                    <FlatList
                        data={values.events}
                        separator={12}
                        refreshing={values.refreshing}
                        onRefresh={functions.onRefresh}
                        empty={{
                            title: values.has_search ? "No Results" : "No Events Available",
                            description: values.has_search
                                ? "No events match your search."
                                : "There are no published events available for registration.",
                        }}
                        keyExtractor={(item) => item._id ?? item.id}
                        renderItem={({ item }) => (
                            <RegistrationEventCard
                                data={item}
                                onSelect={functions.onSelectEvent}
                            />
                        )}
                    />
                )}
            </View>
        </PrimaryLayout>
    )
}

export default SelectEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
    },
    header: {
        gap: heightPixel(6),
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(40),
    },
})
