import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { BOTTOM_BAR_BOTTOM_PADDING, BOTTOM_BAR_HEIGHT, heightPixel, widthPixel } from "../../helpers/metrics"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import Configure from "../../screens/Configure"
import Contacts from "../../screens/Contacts"
import Home from "../../screens/Home"
import MyProfile from "../../screens/MyProfile"

const Tab = createBottomTabNavigator()

const TabIcon = ({ source, label, focused }) => (
    <View style={styles.tab_item}>
        <Icon
            source={source}
            size={20}
            color={focused ? colors.light_primary : colors.white}
        />
        <Text
            size={10}
            lines={1}
            weight={"semibold"}
            color={focused ? colors.light_primary : colors.white}
        >
            {label}
        </Text>
    </View>
)

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                ...GLOBAL_HEADER_OPTIONS,
                tabBarShowLabel: false,
                tabBarStyle: styles.tab_bar,
                tabBarIconStyle: styles.tab_bar_item
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={images.home_bottom} label="Home" focused={focused} />
                    ),
                    ...ROUTES_OPTIONS[ROUTES.HOME]
                }}
            />
            <Tab.Screen
                name={ROUTES.CONTACTS}
                component={Contacts}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={images.home_contact} label="Contacts" focused={focused} />
                    ),
                    ...ROUTES_OPTIONS[ROUTES.CONTACTS]
                }}
            />
            <Tab.Screen
                name={ROUTES.CONFIGURE}
                component={Configure}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={images.home_configure} label="Configure" focused={focused} />
                    ),
                    ...ROUTES_OPTIONS[ROUTES.CONFIGURE]
                }}
            />
            <Tab.Screen
                name={ROUTES.MY_PROFILE}
                component={MyProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={images.home_profile} label="Profile" focused={focused} />
                    ),
                    ...ROUTES_OPTIONS[ROUTES.MY_PROFILE]
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    tab_bar: {
        position: "absolute",
        bottom: BOTTOM_BAR_BOTTOM_PADDING,
        marginHorizontal: widthPixel(20),
        backgroundColor: colors.dark_primary,
        borderRadius: heightPixel(40),
        height: BOTTOM_BAR_HEIGHT,
        borderTopWidth: 0,
        paddingHorizontal: 0,
        paddingBottom: 0,
        paddingTop: 0,
        overflow: "hidden"
    },
    tab_bar_item: {
        flex: 1,
        width: "100%",
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
    },
    tab_item: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: heightPixel(6),
    },
})