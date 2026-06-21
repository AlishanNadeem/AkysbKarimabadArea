import { Platform } from 'react-native'

const fonts = {
    lexend: {
        bold: Platform.select({
            ios: 'LexendDeca-Bold',
            android: 'LexendDeca-Bold',
        }),
        semibold: Platform.select({
            ios: 'LexendDeca-Medium',
            android: 'LexendDeca-Medium',
        }),
        regular: Platform.select({
            ios: 'LexendDeca-Regular',
            android: 'LexendDeca-Regular',
        }),
    },
}

export default fonts