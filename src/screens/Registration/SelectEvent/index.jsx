import { ActivityIndicator, StyleSheet, View } from "react-native"
import FlatList from "../../../components/FlatList"
import RegistrationEventCard from "../../../components/RegistrationEventCard"
import RegistrationStepIndicator from "../../../components/RegistrationStepIndicator"
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
                <RegistrationStepIndicator current={1} />

                <View style={styles.header}>
                    <Text size={19} weight="semibold">Select an Event</Text>
                    <Text size={14} color={colors.gray}>
                        Choose the event you want to register a participant for.
                    </Text>
                </View>

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
                            title: "No Events Available",
                            description: "There are no published events available for registration.",
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
