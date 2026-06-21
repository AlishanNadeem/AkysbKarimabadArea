import FlatList from "../../components/FlatList"
import SubscriptionCard from "../../components/SubscriptionCard"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useSubscriptionPlansController from "./useSubscriptionPlansController"

const SubscriptionPlans = () => {

    const { values, functions } = useSubscriptionPlansController()

    return (
        <PrimaryLayout background header>
            <FlatList
                data={values.data}
                renderItem={({ item }) => <SubscriptionCard data={item} onPress={() => functions.onPressContinue(item)} />}
                onEndReached={functions.nextPage}
                loading_more={values.loading_more}
                refreshing={values.refreshing}
                onRefresh={functions.onRefresh}
                empty={{
                    title: "No Plans Found",
                    description: "Pull to refresh"
                }}
            />
        </PrimaryLayout>
    )
}

export default SubscriptionPlans