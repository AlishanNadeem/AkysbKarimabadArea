import { useEffect, useRef } from "react"
import { Animated, Image, Modal, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_HEIGHT, SCREEN_WIDTH, widthPixel } from "../../helpers/metrics"
import Button from "../Button"
import Icon from "../Icon"
import Text from "../Text"

const GlobalModal = ({ visible, type, title, button_text = "Ok", message, onOk, onYes, onNo }) => {

    const scale_animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            scale_animation.setValue(0)
            Animated.spring(scale_animation, {
                toValue: 1,
                useNativeDriver: true,
                tension: 30,
                friction: 10,
            }).start()
        }
    }, [visible])

    return (
        <Modal visible={visible} animationType="fade" statusBarTranslucent>
            <View style={styles.overlay}>
                <Image source={images.logo} style={styles.watermark} />
                <Animated.View style={[styles.container, { transform: [{ scale: scale_animation }] }]}>
                    <LinearGradient
                        colors={colors.gradient_primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.icon_gradient}
                    >
                        <Icon source={type === "info" ? images.check : images.info_inverse} size={28} color={colors.white} />
                    </LinearGradient>
                    {title && <Text size={26} weight="bold" align="center" color={colors.black}>{title}</Text>}
                    {message && <Text size={16} align="center" color={colors.text_secondary}>{message}</Text>}
                    <View style={styles.row}>
                        {
                            type === "info" ?
                                <Button onPress={onOk}>{button_text}</Button>
                                :
                                <>
                                    <Button onPress={onYes}>Yes</Button>
                                    <Button onPress={onNo} type="black">No</Button>
                                </>
                        }
                    </View>
                </Animated.View>
            </View>
        </Modal >
    )
}

export default GlobalModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING * 2,
        backgroundColor: colors.screen_background,
    },
    container: {
        backgroundColor: colors.surface,
        borderRadius: heightPixel(20),
        borderWidth: heightPixel(1),
        borderColor: colors.border,
        paddingHorizontal: widthPixel(27),
        paddingVertical: heightPixel(34),
        minHeight: heightPixel(250),
        width: "100%",
        gap: heightPixel(16),
        justifyContent: "center",
        alignItems: "center"
    },
    icon_gradient: {
        width: heightPixel(56),
        height: heightPixel(56),
        borderRadius: heightPixel(28),
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        width: "100%",
        gap: heightPixel(8)
    },
    watermark: {
        position: "absolute",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        opacity: 0.04,
        zIndex: 0
    }
})
