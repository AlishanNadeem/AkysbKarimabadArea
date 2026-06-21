import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import LinearGradient from "react-native-linear-gradient";
import colors from "../../helpers/colors";
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_WIDTH, widthPixel } from "../../helpers/metrics";
import Button from "../Button";
import Row from "../Row";
import Text from "../Text";
import Icon from "../Icon";
import images from "../../assets/images";

const DailyCheckInCard = ({ data, onPress }) => {

    const { greeting, description, progress } = data

    const shine_animation = useRef(new Animated.Value(0)).current
    const jiggle_animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.sequence([
            Animated.timing(shine_animation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.timing(jiggle_animation, {
                    toValue: 6,
                    duration: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(jiggle_animation, {
                    toValue: -6,
                    duration: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(jiggle_animation, {
                    toValue: 4,
                    duration: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(jiggle_animation, {
                    toValue: -4,
                    duration: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(jiggle_animation, {
                    toValue: 0,
                    duration: 80,
                    useNativeDriver: true,
                }),
            ]),
        ]).start()
    }, [])

    const shine_translate_x = shine_animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-(SCREEN_WIDTH - GLOBAL_HORIZONTAL_PADDING), (SCREEN_WIDTH - GLOBAL_HORIZONTAL_PADDING)],
    })

    const shine_opacity = shine_animation.interpolate({
        inputRange: [0, 0.2, 0.5, 0.8, 1],
        outputRange: [0, 0.6, 0.6, 0.6, 0],
    })

    return (
        <Animated.View style={{ transform: [{ translateX: jiggle_animation }] }}>
            <LinearGradient colors={[colors.light_primary, colors.dark_primary]} style={styles.gradient}>
                <Row gap={23} align="center" style={styles.row}>
                    <View style={styles.content}>
                        <View style={styles.text_container}>
                            <Text size={24}>{greeting}</Text>
                            <Text size={12}>{description}</Text>
                        </View>
                        <View style={styles.button_container}>
                            <Button type="secondary" size="sm" onPress={onPress}>Start Check-In</Button>
                        </View>
                    </View>
                    <View>
                        <CircularProgressBase
                            value={progress}
                            maxValue={60}
                            initialValue={60}
                            radius={heightPixel(76 / 2)}
                            showProgressValue={false}
                            activeStrokeWidth={widthPixel(8)}
                            inActiveStrokeWidth={widthPixel(8)}
                            inActiveStrokeColor={colors.light_primary}
                            activeStrokeColor={colors.white}
                            clockwise={false}
                            duration={59000}
                        >
                            <View style={styles.progress_label}>
                                <Icon size={16} color={colors.white} source={images.clock} />
                                <Text size={14} color={colors.white}>00:{progress}</Text>
                            </View>
                        </CircularProgressBase>
                    </View>
                </Row>
                <Animated.View
                    pointerEvents="none"
                    style={[styles.shine, {
                        opacity: shine_opacity,
                        transform: [{ translateX: shine_translate_x }],
                    }]}
                >
                    <LinearGradient
                        colors={colors.shine}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.shine_gradient}
                    />
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        borderRadius: widthPixel(24),
        overflow: "hidden",
    },
    row: {
        paddingVertical: heightPixel(25),
        paddingLeft: widthPixel(20),
        paddingRight: widthPixel(30),
        height: heightPixel(168),
    },
    content: {
        flex: 1,
        gap: heightPixel(12),
    },
    text_container: {
        gap: heightPixel(2),
    },
    button_container: {
        width: "70%",
    },
    progress_label: {
        alignItems: "center",
        justifyContent: "center",
        width: heightPixel(80),
        height: heightPixel(80),
        borderRadius: heightPixel(20),
        top: -heightPixel(37),
        gap: heightPixel(4)
    },
    shine: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: widthPixel(60),
    },
    shine_gradient: {
        flex: 1,
        width: widthPixel(60),
    },
})

export default memo(DailyCheckInCard)