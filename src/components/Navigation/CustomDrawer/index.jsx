import {
    DrawerContentScrollView
} from "@react-navigation/drawer"
import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import images from "../../../assets/images"
import { useModal } from "../../../contexts/ModalContext"
import colors from "../../../helpers/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../helpers/metrics"
import { closeDrawer, navigate } from "../../../helpers/navigation"
import { NAVIGATORS, ROUTES } from "../../../helpers/routes"
import { selectUser } from "../../../redux/selectors"
import { clearCredentials } from "../../../redux/slices/auth.slice"
import Icon from "../../Icon"
import Row from "../../Row"
import Text from "../../Text"

const DRAWER = [
    {
        label: "Home",
        icon: images.drawer_home,
        route: NAVIGATORS.APP_STACK
    },
    {
        label: "Subscription Management",
        icon: images.drawer_subscription_management,
        route: ROUTES.SUBSCRIPTION_PLANS
    },
    {
        label: "Terms & Conditions",
        icon: images.drawer_terms,
        route: ROUTES.TERMS_AND_CONDITIONS
    },
    {
        label: "Privacy Policy",
        icon: images.drawer_content,
        route: ROUTES.PRIVACY_POLICY
    },
    {
        label: "About Us",
        icon: images.drawer_content,
        route: ROUTES.ABOUT_US
    },
    {
        label: "Contact Us",
        icon: images.drawer_contact_us,
        route: ROUTES.CONTACT_US
    },
    {
        label: "Log Out",
        icon: images.drawer_logout,
        type: "logout"
    }
]

const BackgroundWatermark = () => (
    <Image
        source={images.logo}
        style={styles.watermark}
        resizeMode="cover"
    />
)

const CustomDrawer = (props) => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const { showConfirmModal } = useModal()

    const onLogout = async () => {

        const confirmed = await showConfirmModal({
            title: "Logout",
            message: "Are you sure you want to logout?"
        })

        if (confirmed) {
            closeDrawer()
            dispatch(clearCredentials())
        }

    }

    const onPressItem = (item) => {
        if (item.type === "logout") {
            onLogout()
        } else if (item.route) {
            navigate(item.route)
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundWatermark />
            <DrawerContentScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                <Row style={styles.header} align="center" >
                    <Row gap={9} align="center" style={{ width: "auto", flex: 1 }}>
                        <Icon size={89} source={{ uri: user?.image_url }} rounded={"full"} border={colors.white} resize="cover" />
                        <View style={{ gap: heightPixel(4) }}>
                            <Text size={20}>{user?.name}</Text>
                            <Text size={14}>{user?.email}</Text>
                        </View>
                    </Row>
                    <Icon source={images.close} rounded={"full"} space background={colors.danger} size={40} onPress={closeDrawer} />
                </Row>
                <View>
                    {
                        DRAWER.map(item => (
                            <Row align="center" justify="space-between" onPress={() => onPressItem(item)} key={item.label} style={{ borderBottomWidth: heightPixel(1), borderBottomColor: colors.light_primary, paddingVertical: heightPixel(24) }}>
                                <Row align="center" gap={8} style={{ width: "auto" }}>
                                    {item?.icon && <Icon source={item.icon} size={24} color={colors.black} />}
                                    <Text size={16}>{item.label}</Text>
                                </Row>
                                <Icon color={colors.light_primary} source={images.arrow_right} size={15} />
                            </Row>
                        ))
                    }
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    scroll: {
        paddingStart: GLOBAL_HORIZONTAL_PADDING + 3,
        paddingEnd: GLOBAL_HORIZONTAL_PADDING + 3,
        flexGrow: 1,
        gap: heightPixel(36)
    },
    header: {
        width: "auto"
    },
    watermark: {
        position: "absolute",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        opacity: 0.03,
        zIndex: 0
    }
})

export default CustomDrawer