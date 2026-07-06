import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Button from "../Button"
import Icon from "../Icon"
import Text from "../Text"

const Empty = ({
    title = "No Data Found",
    description = "There is nothing to show",
    icon,
    action,
}) => {
    return (
        <View style={styles.container}>
            {icon && <Icon source={icon} size={64} color={colors.light_primary} />}
            <Text weight="semibold" size={18} style={styles.title}>{title}</Text>
            {description && <Text size={14} style={styles.description}>{description}</Text>}
            {action && (
                <View style={styles.action}>
                    <Button size="sm" onPress={action.onPress}>
                        {action.label}
                    </Button>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
        gap: heightPixel(8),
    },
    title: {
        color: colors.text_primary,
    },
    description: {
        color: colors.text_secondary,
    },
    action: {
        marginTop: heightPixel(8),
        width: widthPixel(180),
    },
})

export default Empty
