import images from "../assets/images";
import HeaderLeft from "../components/Navigation/HeaderLeft";
import HeaderRight from "../components/Navigation/HeaderRight";
import HeaderTitle from "../components/Navigation/HeaderTitle";
import colors from "./colors";
import { GLOBAL_HORIZONTAL_PADDING, HEADER_HEIGHT } from "./metrics";
import { goBack, navigate, openDrawer } from "./navigation";

const screenOptionsWithTitle = (title, type = "primary") => ({
    headerTitle: ({ children }) => (
        <HeaderTitle title={title || children} type={type} />
    ),
})

const HEADER_LEFT = {
    back: () => <HeaderLeft icon={images.back} onPress={goBack} type="secondary" />,
    drawer: () => <HeaderLeft icon={images.drawer} onPress={openDrawer} />,
    none: null,
}

const HEADER_RIGHT = {
    notifications: () => <HeaderRight icon={images.notifications} onPress={() => navigate(ROUTES.NOTIFICATIONS)} />,
    none: null,
}

export const NAVIGATORS = {
    AUTH_STACK: "AuthStackNavigator",
    APP_DRAWER: "AppDrawerNavigator",
    APP_STACK: "AppStackNavigator",
}

export const ROUTES = {
    // Auth
    ONBOARDING: "Onboarding",
    LOGIN: "Login",
    SIGNUP: "Signup",
    FORGET_PASSWORD: "ForgetPassword",
    VERIFY_CODE: "VerifyCode",
    SET_PASSWORD: "SetPassword",

    HOME: "Home",
    EVENTS: "Events",
    MY_PROFILE: "MyProfile",

    MANAGE_EVENT: "ManageEvent",
    MANAGE_REGISTRATION: "ManageRegistration",

    CONTACT_US: "ContactUs",
    CHANGE_PASSWORD: "ChangePassword",
    EDIT_PROFILE: "EditProfile",
    NOTIFICATIONS: "Notifications",

}

export const ROUTES_OPTIONS = {

    [NAVIGATORS.APP_STACK]: {
        headerShown: false,
    },

    [ROUTES.ONBOARDING]: {
        headerShown: false,
    },

    [ROUTES.LOGIN]: {
        headerShown: false,
    },

    [ROUTES.SIGNUP]: {
        headerShown: false,
    },

    [ROUTES.FORGET_PASSWORD]: {
        headerShown: false,
    },

    [ROUTES.VERIFY_CODE]: {
        headerShown: false,
    },

    [ROUTES.SET_PASSWORD]: {
        headerShown: false,
    },

    [ROUTES.HOME]: {
        headerShown: false,
        in_drawer: true,
        drawer_label: "Home",
    },

    [ROUTES.EVENTS]: {
        headerShown: false,
    },

    [ROUTES.MY_PROFILE]: {
        headerShown: false,
    },

    [ROUTES.MANAGE_EVENT]: {
        ...screenOptionsWithTitle(),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.MANAGE_REGISTRATION]: {
        ...screenOptionsWithTitle("Event Registration"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.CONTACT_US]: {
        ...screenOptionsWithTitle("Contact Us"),
        headerLeft: HEADER_LEFT.drawer,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.CHANGE_PASSWORD]: {
        ...screenOptionsWithTitle("Change Password"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.EDIT_PROFILE]: {
        ...screenOptionsWithTitle("Edit Profile"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.NOTIFICATIONS]: {
        ...screenOptionsWithTitle("Notifications"),
        headerLeft: HEADER_LEFT.back,
    },

}

export const GLOBAL_HEADER_OPTIONS = {
    headerShown: true,
    headerTitleAlign: "left",
    headerTransparent: true,
    headerTintColor: colors.white,
    headerBackButtonVisible: false,
    headerLeftContainerStyle: { paddingLeft: GLOBAL_HORIZONTAL_PADDING },
    headerRightContainerStyle: { paddingRight: GLOBAL_HORIZONTAL_PADDING },
    headerStyle: { height: HEADER_HEIGHT },
    // animation: "slide_from_right",
}