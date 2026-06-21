import { memo } from "react";
import { View, Image } from "react-native";
import { heightPixel } from "../../helpers/metrics";
import Touchable from "../Touchable";
import colors from "../../helpers/colors";

const Icon = ({
    source,
    size = 28,
    background = colors.transparent,
    rounded,
    color,
    onPress,
    border,
    rotate = false,
    resize = "contain",
    space = false
}) => {

    const Container = onPress ? Touchable : View

    const is_fluid = size === "100%"

    const border_round_config = {
        quarter: is_fluid ? "12.5%" : heightPixel(size / 8),
        half: is_fluid ? "25%" : heightPixel(size / 4),
        full: is_fluid ? "50%" : heightPixel(size / 2)
    }

    const container_style = {
        width: is_fluid ? "100%" : heightPixel(size),
        height: is_fluid ? "100%" : heightPixel(size),
        borderRadius: rounded ? border_round_config[rounded] : 0,
        backgroundColor: background,
        borderWidth: border ? heightPixel(1) : 0,
        borderColor: border || "transparent",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    };

    if (space && !is_fluid) {
        container_style.padding = heightPixel(size * 0.3)
    }

    const image_style = {
        width: "100%",
        height: "100%",
        tintColor: color,
        transform: rotate ? [{ rotate: "90deg" }] : [],
    };

    return (
        <Container onPress={onPress} style={container_style}>
            <Image source={source} style={image_style} resizeMode={resize} />
        </Container>
    );
};

export default memo(Icon);