import { memo } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import fonts from "../../assets/fonts";
import colors from '../../helpers/colors';
import { font } from "../../helpers/metrics";

const FONT_FAMILY = {
    lexend: {
        regular: fonts.lexend.regular,
        semibold: fonts.lexend.semibold,
        bold: fonts.lexend.bold,
    }
};

const Text = ({
    children,
    size = 14,
    weight = 'regular',
    color = colors.white,
    align = 'left',
    underline = false,
    italic = false,
    lines,
    family = "lexend",
    style,
    capitalize = false,
    space = false,
    onPress
}) => {

    const font_size = font(size);
    const line_height = font_size * 1.4;
    const letter_spacing = font_size * (-3 / 100)

    const text_style = [
        style,
        styles.base,
        {
            fontSize: font_size,
            lineHeight: line_height,
            fontFamily: FONT_FAMILY[family][weight] || FONT_FAMILY.lexend.regular,
            color,
            textAlign: align,
            textDecorationLine: underline ? 'underline' : 'none',
            fontStyle: italic ? 'italic' : 'normal',
            textTransform: capitalize ? 'capitalize' : 'none',
            ...(space && { letterSpacing: letter_spacing })
        },
    ];

    return (
        <RNText
            style={text_style}
            numberOfLines={lines}
            allowFontScaling={false}
            onPress={onPress}
        >
            {children}
        </RNText>
    );
};

export default memo(Text);

const styles = StyleSheet.create({
    base: {
        includeFontPadding: false,
        // textAlignVertical: 'center',
    },
});