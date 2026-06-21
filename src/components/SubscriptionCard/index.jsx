import { memo } from "react"
import { StyleSheet, View } from "react-native"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import colors from "../../helpers/colors"
import images from "../../assets/images"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Button from "../Button"

const SubscriptionCard = ({ data, onPress }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <Icon source={images.logo} size={68} />
            <Text space size={27.53} weight="semibold" color={colors.primary}>{data?.title}</Text>
            <Row style={styles.price_row} gap={10}>
                <View>
                    <Text space size={44} weight="semibold" color={colors.orange}>{data?.price_label}</Text>
                </View>
                <View>
                    <Text space size={16} color={colors.leafy_blue}>Price</Text>
                    <Text space size={13} color={colors.primary}>{data?.plan_name}</Text>
                </View>
            </Row>
            <Text space size={16.5} color={colors.dark_gray}>{data?.price_update_note}</Text>
        </View>
        <View style={styles.features_container}>
            {
                data?.features?.map(item => (
                    <Row style={styles.feature_row} gap={7.5}>
                        <Icon size={18.3} space rounded={"full"} background={colors.dark_primary} color={colors.white} source={images.check} />
                        <Text size={14.6} color={colors.black}>{item}</Text>
                    </Row>
                ))
            }
        </View>
        <Button onPress={onPress}>Continue</Button>
    </View>
)

export default memo(SubscriptionCard)

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: heightPixel(20),
        paddingHorizontal: widthPixel(36),
        paddingVertical: widthPixel(24),
        width: "100%",
        minHeight: heightPixel(200),
    },
    header: {
        gap: heightPixel(6),
    },
    price_row: {
        alignItems: "center",
    },
    features_container: {
        gap: heightPixel(11),
        marginBottom: heightPixel(44),
        marginTop: heightPixel(22),
    },
    feature_row: {
        alignItems: "center",
    },
})