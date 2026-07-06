import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import Confirmation from "../../screens/Registration/Confirmation"
import ParticipantDetails from "../../screens/Registration/ParticipantDetails"
import ParticipantInfo from "../../screens/Registration/ParticipantInfo"
import SelectEvent from "../../screens/Registration/SelectEvent"

const Stack = createStackNavigator()

const RegistrationStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={GLOBAL_HEADER_OPTIONS}
            initialRouteName={ROUTES.REGISTRATION_SELECT_EVENT}
        >
            <Stack.Screen
                name={ROUTES.REGISTRATION_SELECT_EVENT}
                component={SelectEvent}
                options={ROUTES_OPTIONS[ROUTES.REGISTRATION_SELECT_EVENT]}
            />
            <Stack.Screen
                name={ROUTES.REGISTRATION_PARTICIPANT_INFO}
                component={ParticipantInfo}
                options={ROUTES_OPTIONS[ROUTES.REGISTRATION_PARTICIPANT_INFO]}
            />
            <Stack.Screen
                name={ROUTES.REGISTRATION_PARTICIPANT_DETAILS}
                component={ParticipantDetails}
                options={ROUTES_OPTIONS[ROUTES.REGISTRATION_PARTICIPANT_DETAILS]}
            />
            <Stack.Screen
                name={ROUTES.REGISTRATION_CONFIRMATION}
                component={Confirmation}
                options={ROUTES_OPTIONS[ROUTES.REGISTRATION_CONFIRMATION]}
            />
        </Stack.Navigator>
    )
}

export default RegistrationStackNavigator
