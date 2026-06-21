import { StyleSheet, View } from "react-native"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import Button from "../../components/Button"
import Input from "../../components/Input"
import FlatList from "../../components/FlatList"
import ContactCard from "../../components/ContactCard"
import { heightPixel } from "../../helpers/metrics"
import useContactsController from "./useContactsController"

const Contacts = () => {

    const { values, functions } = useContactsController()

    return (
        <PrimaryLayout header background>
            <View style={styles.container}>

                <View style={styles.add_button}>
                    <Button size="sm" onPress={functions.onAdd}>Add</Button>
                </View>

                <Input
                    placeholder="Search ..."
                    value={values.search}
                    onChangeText={functions.onSearchChange}
                />

                <FlatList
                    data={values.contacts}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    onEndReached={functions.onLoadMore}
                    separator={12}
                    empty={{
                        title: "No Contacts",
                        description: "You have no contacts yet. Add one!",
                    }}
                    renderItem={({ item, index }) => (
                        <ContactCard
                            index={index}
                            data={item}
                            onAlert={() => functions.onAlert(item.id)}
                            onEdit={() => functions.onEdit(item.id)}
                            onDelete={() => functions.onDelete(item.id)}
                        />
                    )}
                />

            </View>
        </PrimaryLayout>
    )
}

export default Contacts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
    },
    add_button: {
        width: "30%",
        alignSelf: "flex-end",
    },
})