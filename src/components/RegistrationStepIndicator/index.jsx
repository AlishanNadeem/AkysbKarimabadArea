import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"
import Row from "../Row"

const STEPS = [1, 2, 3]

const RegistrationStepIndicator = ({ current = 1, total = 3 }) => {
    return (
        <View style={styles.container}>
            <Text size={13} color={colors.gray} weight="semibold">
                Step {current} of {total}
            </Text>
            <Row gap={8} style={styles.dots_row}>
                {STEPS.slice(0, total).map((step) => (
                    <View
                        key={step}
                        style={[
                            styles.dot,
                            step <= current && styles.dot_active,
                            step === current && styles.dot_current,
                        ]}
                    />
                ))}
            </Row>
        </View>
    )
}

export default memo(RegistrationStepIndicator)

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
    },
    dots_row: {
        width: "auto",
    },
    dot: {
        flex: 1,
        height: heightPixel(4),
        borderRadius: heightPixel(4),
        backgroundColor: colors.light_gray,
    },
    dot_active: {
        backgroundColor: colors.light_primary,
    },
    dot_current: {
        height: heightPixel(5),
    },
})
