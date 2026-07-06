import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import Detail from "../../screens/ViewRegistrations/Detail"
import List from "../../screens/ViewRegistrations/List"
import SelectEvent from "../../screens/ViewRegistrations/SelectEvent"

const Stack = createStackNavigator()

const ViewRegistrationsStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={GLOBAL_HEADER_OPTIONS}
            initialRouteName={ROUTES.VIEW_REGISTRATIONS_SELECT_EVENT}
        >
            <Stack.Screen
                name={ROUTES.VIEW_REGISTRATIONS_SELECT_EVENT}
                component={SelectEvent}
                options={ROUTES_OPTIONS[ROUTES.VIEW_REGISTRATIONS_SELECT_EVENT]}
            />
            <Stack.Screen
                name={ROUTES.VIEW_REGISTRATIONS_LIST}
                component={List}
                options={ROUTES_OPTIONS[ROUTES.VIEW_REGISTRATIONS_LIST]}
            />
            <Stack.Screen
                name={ROUTES.VIEW_REGISTRATION_DETAIL}
                component={Detail}
                options={ROUTES_OPTIONS[ROUTES.VIEW_REGISTRATION_DETAIL]}
            />
        </Stack.Navigator>
    )
}

export default ViewRegistrationsStackNavigator
