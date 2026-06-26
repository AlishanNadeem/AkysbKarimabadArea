import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import ChangePassword from "../../screens/ChangePassword"
import EditProfile from "../../screens/EditProfile"
import Events from "../../screens/Events"
import Home from "../../screens/Home"
import ManageEvent from "../../screens/ManageEvent"
import RegistrationStackNavigator from "../RegistrationStackNavigator"
import MyProfile from "../../screens/MyProfile"

const Stack = createStackNavigator()

const AppStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={GLOBAL_HEADER_OPTIONS}>
            <Stack.Screen name={ROUTES.HOME} component={Home} options={ROUTES_OPTIONS[ROUTES.HOME]} />
            <Stack.Screen name={ROUTES.EVENTS} component={Events} options={ROUTES_OPTIONS[ROUTES.EVENTS]} />
            <Stack.Screen name={ROUTES.MY_PROFILE} component={MyProfile} options={ROUTES_OPTIONS[ROUTES.MY_PROFILE]} />

            <Stack.Screen name={ROUTES.MANAGE_EVENT} component={ManageEvent} options={ROUTES_OPTIONS[ROUTES.MANAGE_EVENT]} />
            <Stack.Screen name={ROUTES.MANAGE_REGISTRATION} component={RegistrationStackNavigator} options={ROUTES_OPTIONS[ROUTES.MANAGE_REGISTRATION]} />

            <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} options={ROUTES_OPTIONS[ROUTES.CHANGE_PASSWORD]} />
            <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} options={ROUTES_OPTIONS[ROUTES.EDIT_PROFILE]} />
        </Stack.Navigator>
    )
}

export default AppStackNavigator
