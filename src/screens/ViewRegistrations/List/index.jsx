import { ActivityIndicator, StyleSheet, View } from "react-native"
import FlatList from "../../../components/FlatList"
import Input from "../../../components/Input"
import RegistrationListCard from "../../../components/RegistrationListCard"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import PrimaryLayout from "../../../layouts/PrimaryLayout"
import useListController from "./useListController"

const List = () => {

    const { values, functions } = useListController()

    return (
        <PrimaryLayout header background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text weight="semibold" size={14} color={colors.text_secondary}>
                        {values.data.length} registration{values.data.length !== 1 ? "s" : ""} found
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
                        data={values.data}
                        separator={12}
                        refreshing={values.refreshing}
                        onRefresh={functions.onRefresh}
                        empty={{
                            title: values.has_search ? "No Results" : "No Registrations",
                            description: values.has_search
                                ? "No registrations match your search."
                                : "There are no registrations for this event yet.",
                            ...(!values.has_search && {
                                action: {
                                    label: "Register New",
                                    onPress: functions.onNewRegistration,
                                },
                            }),
                        }}
                        keyExtractor={(item) => item._id ?? item.id}
                        renderItem={({ item }) => (
                            <RegistrationListCard
                                data={item}
                                onPress={functions.onPress}
                                onAccept={functions.onAccept}
                                onReject={functions.onReject}
                                loading_id={values.loading_id}
                            />
                        )}
                    />
                )}
            </View>
        </PrimaryLayout>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(12),
    },
    header: {
        gap: heightPixel(4),
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(40),
    },
})
