import { StyleSheet } from "react-native"
import colors from "./colors"
import { heightPixel, widthPixel } from "./metrics"

export const theme = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderWidth: heightPixel(1),
        borderColor: colors.border,
        borderRadius: heightPixel(12),
    },
    card_brand: {
        backgroundColor: colors.surface_brand,
        borderWidth: heightPixel(1),
        borderColor: colors.border_brand,
        borderRadius: heightPixel(12),
    },
    icon_circle: {
        width: heightPixel(40),
        height: heightPixel(40),
        borderRadius: heightPixel(20),
        backgroundColor: colors.surface_brand_strong,
        alignItems: "center",
        justifyContent: "center",
    },
    menu_item: {
        backgroundColor: colors.surface,
        borderWidth: heightPixel(1),
        borderColor: colors.border,
        borderRadius: heightPixel(12),
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(14),
    },
})
