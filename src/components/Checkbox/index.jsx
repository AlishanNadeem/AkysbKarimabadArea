import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { font, heightPixel } from "../../helpers/metrics"
import Row from "../Row"
import Touchable from "../Touchable"
import Text from "../Text"
import Icon from "../Icon"
import images from "../../assets/images"

const Checkbox = ({
    value = false,
    onChange,
    label,
    disabled = false,
    size = "md",
}) => {

    const size_map = {
        sm: {
            box: 14,
            icon: 8,
        },
        md: {
            box: 18,
            icon: 10,
        },
        lg: {
            box: 22,
            icon: 1,
        },
    }

    const current_size = size_map[size] || size_map.medium

    return (
        <Touchable
            disabled={disabled}
            onPress={() => !disabled && onChange?.(!value)}
        >
            <Row gap={6} align="center" style={[disabled && styles.disabled]}>
                <View
                    style={[
                        styles.checkbox,
                        {
                            width: heightPixel(current_size.box),
                            height: heightPixel(current_size.box),
                            borderRadius: heightPixel(current_size.box) / 4,
                            backgroundColor: value ? colors.light_primary : colors.transparent
                        },
                        disabled && styles.checkbox_disabled,
                    ]}
                >
                    {
                        value && (
                            <Icon source={images.check} size={current_size.icon} color={colors.black} />
                        )}
                </View>
                {
                    label && (
                        <Text
                            style={[
                                disabled && styles.label_disabled,
                            ]}
                        >
                            {label}
                        </Text>
                    )
                }
            </Row>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.light_primary
    },
    checkbox_disabled: {
        opacity: 0.5,
    },
    label_disabled: {
        opacity: 0.5,
    },
    disabled: {
        opacity: 0.5,
    },
})

export default Checkbox