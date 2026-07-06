import { memo, useMemo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import Text from "../Text"
import Row from "../Row"

const RegistrationStepIndicator = ({ current = 1, total = 4 }) => {

    const steps = useMemo(
        () => Array.from({ length: total }, (_, index) => index + 1),
        [total]
    )

    return (
        <View style={styles.container}>
            <Text size={13} color={colors.text_secondary} weight="semibold">
                Step {current} of {total}
            </Text>
            <Row gap={8} style={styles.dots_row}>
                {steps.map((step) => (
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
        backgroundColor: colors.border,
    },
    dot_active: {
        backgroundColor: colors.light_primary,
    },
    dot_current: {
        height: heightPixel(5),
    },
})
