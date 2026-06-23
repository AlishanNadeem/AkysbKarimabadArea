import { createDrawerNavigator } from "@react-navigation/drawer"
import CustomDrawer from "../../components/Navigation/CustomDrawer"
import { GLOBAL_HEADER_OPTIONS, NAVIGATORS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import ContactUs from "../../screens/ContactUs"
import Notifications from "../../screens/Notifications"
import AppStackNavigator from "../AppStackNavigator"

const Drawer = createDrawerNavigator()

const AppDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                ...GLOBAL_HEADER_OPTIONS,
                drawerStyle: { width: "100%" },
                drawerType: "slide"
            }}
        >

            <Drawer.Screen name={NAVIGATORS.APP_STACK} component={AppStackNavigator} options={ROUTES_OPTIONS[NAVIGATORS.APP_STACK]} />
            <Drawer.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} options={ROUTES_OPTIONS[ROUTES.NOTIFICATIONS]} />
            <Drawer.Screen name={ROUTES.CONTACT_US} component={ContactUs} options={ROUTES_OPTIONS[ROUTES.CONTACT_US]} />

        </Drawer.Navigator>
    )
}

export default AppDrawerNavigator
