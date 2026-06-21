import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux"
import { NAVIGATORS } from "../../helpers/routes"
import { selectIsAuthenticated, selectUser } from "../../redux/selectors"
import AppDrawerNavigator from "../AppDrawerNavigator"
import AuthStackNavigator from "../AuthStackNavigator"
import CompleteProfileStackNavigator from "../CompleteProfileStackNavigator"

const Stack = createStackNavigator()

const MainStackNavigator = () => {

    const is_logged_in = useSelector(selectIsAuthenticated)
    const user = useSelector(selectUser)

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                is_logged_in ?
                    <>
                        {
                            !user?.profile_completed ?
                                <Stack.Screen name={NAVIGATORS.COMPLETE_PROFILE_STACK} component={CompleteProfileStackNavigator} />
                                :
                                <Stack.Screen name={NAVIGATORS.APP_DRAWER} component={AppDrawerNavigator} />
                        }
                    </> :
                    <Stack.Screen name={NAVIGATORS.AUTH_STACK} component={AuthStackNavigator} />
            }
        </Stack.Navigator>
    )
}

export default MainStackNavigator