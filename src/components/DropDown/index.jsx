import { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { BOTTOM_INSET, heightPixel, widthPixel } from "../../helpers/metrics"
import useToggle from "../../hooks/useToggle"
import InputLayout from "../../layouts/InputLayout"
import BottomSheetModal from "../BottomSheetModal"
import FlatList from "../FlatList"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const DropDown = ({
    label,
    required = false,
    placeholder = "Select an option",
    value,
    displayValue,
    error = "",
    disabled = false,
    modalTitle,
    data = [],
    keyExtractor,
    getLabel,
    onSelect,
}) => {

    const { value: open, toggle: toggleOpen } = useToggle(false)

    const handleSelect = (item) => {
        onSelect?.(item)
        toggleOpen()
    }

    return (
        <>
            <InputLayout
                label={label}
                required={required}
                error={error}
                onPress={disabled ? undefined : toggleOpen}
            >
                <View style={styles.input}>
                    <Text color={displayValue ? colors.black : colors.gray}>
                        {displayValue || placeholder}
                    </Text>
                </View>
                <Icon source={images.down_arrow} size={20} color={colors.dark_gray} onPress={toggleOpen} />
            </InputLayout>

            <BottomSheetModal
                visible={open}
                onClose={toggleOpen}
                title={modalTitle ?? label}
                initial_height={450}
            >
                <FlatList
                    data={data}
                    keyExtractor={keyExtractor}
                    style={styles.list}
                    contentContainerStyle={{ paddingBottom: BOTTOM_INSET + heightPixel(20) }}
                    keyboardShouldPersistTaps="handled"
                    separator={0}
                    renderItem={({ item }) => (
                        <Row
                            align="center"
                            justify="space-between"
                            onPress={() => handleSelect(item)}
                            style={[
                                styles.item,
                                value === keyExtractor(item) && styles.item_selected,
                            ]}
                        >
                            <Text
                                weight={value === keyExtractor(item) ? "semibold" : "regular"}
                                size={16}
                            >
                                {getLabel(item)}
                            </Text>
                        </Row>
                    )}
                />
            </BottomSheetModal>
        </>
    )
}

export default memo(DropDown)

const styles = StyleSheet.create({
    input: {
        flex: 1,
    },
    list: {
        marginTop: heightPixel(16),
    },
    item: {
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(8),
        borderBottomWidth: heightPixel(1),
        borderBottomColor: colors.light_gray,
    },
    item_selected: {
        backgroundColor: colors.light_gray,
        borderRadius: heightPixel(8),
    },
})
