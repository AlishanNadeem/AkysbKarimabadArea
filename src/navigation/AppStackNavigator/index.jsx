import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, NAVIGATORS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import AlertDetails from "../../screens/AlertDetails"
import ChangePassword from "../../screens/ChangePassword"
import CheckInSetting from "../../screens/CheckInSetting"
import EditProfile from "../../screens/EditProfile"
import ManageEvent from "../../screens/ManageEvent"
import Map from "../../screens/Map"
import BottomNavigator from "../BottomNavigator"
import DailyCheckIn from "../../screens/DailyCheckIn"

const Stack = createStackNavigator()

const AppStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={GLOBAL_HEADER_OPTIONS}>
            <Stack.Screen name={NAVIGATORS.BOTTOM} component={BottomNavigator} options={ROUTES_OPTIONS[NAVIGATORS.BOTTOM]} />

            <Stack.Screen name={ROUTES.CHECKIN_SETTINGS} component={CheckInSetting} options={ROUTES_OPTIONS[ROUTES.CHECKIN_SETTINGS]} />
            <Stack.Screen name={ROUTES.MANAGE_EVENT} component={ManageEvent} options={ROUTES_OPTIONS[ROUTES.MANAGE_EVENT]} />
            <Stack.Screen name={ROUTES.ALERT_DETAILS} component={AlertDetails} options={ROUTES_OPTIONS[ROUTES.ALERT_DETAILS]} />
            <Stack.Screen name={ROUTES.MAP} component={Map} options={ROUTES_OPTIONS[ROUTES.MAP]} />
            <Stack.Screen name={ROUTES.DAILY_CHECK_IN} component={DailyCheckIn} options={ROUTES_OPTIONS[ROUTES.DAILY_CHECK_IN]} />

            {/* Profile */}
            <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} options={ROUTES_OPTIONS[ROUTES.CHANGE_PASSWORD]} />
            <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} options={ROUTES_OPTIONS[ROUTES.EDIT_PROFILE]} />

        </Stack.Navigator>
    )
}

export default AppStackNavigator