import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import Button from "../../components/Button"
import DropDownModal from "../../components/DropDownModal"
import Icon from "../../components/Icon"
import ImagePickerModal from "../../components/ImagePickerModal"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import PhoneInput from "../../components/PhoneInput"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useManageContactController from "./useManageContactController"

const ManageContact = () => {

    const { values, functions } = useManageContactController()

    return (
        <PrimaryLayout header background>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>

                    <View style={styles.avatar_section}>
                        <View style={styles.avatar_container}>
                            <Icon source={values.image} size={114} rounded="full" resize="cover" />
                            <View style={styles.avatar_edit}>
                                <Icon
                                    source={images.filled_add_image}
                                    size={33}
                                    space
                                    background={colors.white}
                                    rounded="full"
                                    onPress={functions.toggleImageModal}
                                />
                            </View>
                        </View>
                        <Text size={20} weight="bold">Upload a photo to your contact</Text>
                    </View>

                    <Input
                        required
                        label="Full Name"
                        placeholder="Enter full name"
                        value={values.formik.values.full_name}
                        onChangeText={values.formik.handleChange("full_name")}
                        error={values.formik.touched.full_name && values.formik.errors.full_name}
                    />

                    <Input
                        required
                        label="Relationship"
                        onIconPress={functions.toggleRelationshipModal}
                        icon={images.down_arrow}
                        placeholder="Enter relationship"
                        value={values.formik.values.relationship}
                        disabled
                        // onChangeText={values.formik.handleChange("relationship")}
                        error={values.formik.touched.relationship && values.formik.errors.relationship}
                    />

                    <PhoneInput
                        label="Phone Number"
                        required
                        value={values.formik.values.phone}
                        onChangeText={values.formik.handleChange("phone")}
                        onChangeFormattedText={(formatted) => values.formik.setFieldValue("formatted_phone", formatted)}
                        onBlur={values.formik.handleBlur("phone")}
                        error={values.formik.touched.phone && values.formik.errors.phone}
                    />

                    <Button onPress={values.formik.handleSubmit}>{values.button_text}</Button>

                </View>

                <ImagePickerModal
                    visible={values.image_modal}
                    onClose={functions.toggleImageModal}
                    onCamera={functions.openCamera}
                    onGallery={functions.openGallery}
                />

                <DropDownModal
                    visible={values.relationship_modal}
                    onClose={functions.toggleRelationshipModal}
                    onSelect={(item) => values.formik.setFieldValue("relationship", item?.name)}
                />

            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default ManageContact

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(30),
    },
    avatar_section: {
        gap: heightPixel(8),
    },
    avatar_container: {
        width: heightPixel(114),
        height: heightPixel(114),
    },
    avatar_edit: {
        position: "absolute",
        top: 0,
        right: 0,
    },
})