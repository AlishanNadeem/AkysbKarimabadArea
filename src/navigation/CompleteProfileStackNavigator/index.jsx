import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import CompleteProfile from "../../screens/Auth/CompleteProfile"

const Stack = createStackNavigator()

const CompleteProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={GLOBAL_HEADER_OPTIONS}>
            <Stack.Screen name={ROUTES.COMPLETE_PROFILE} component={CompleteProfile} options={ROUTES_OPTIONS[ROUTES.COMPLETE_PROFILE]} />
        </Stack.Navigator>
    )
}

export default CompleteProfileStackNavigator