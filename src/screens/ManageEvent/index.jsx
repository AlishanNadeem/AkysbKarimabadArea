import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Checkbox from "../../components/Checkbox"
import DateTimeInput from "../../components/DateTimeInput"
import ImagePickerModal from "../../components/ImagePickerModal"
import ImageUploader from "../../components/ImageUploader"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Row from "../../components/Row"
import SelectorBox from "../../components/SelectorBox"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useManageEventController from "./useManageEventController"

const ManageEvent = () => {

    const { values, functions } = useManageEventController()
    const { formik } = values

    return (
        <PrimaryLayout header background scrollable>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>

                    <ImageUploader
                        label="Upload Event Banner"
                        onPress={functions.toggleImageModal}
                        image={formik.values.image}
                        onRemove={functions.onRemoveImage}
                    />

                    <Text size={19} weight="semibold">Basic Information</Text>

                    <Input
                        required
                        label="Event Name"
                        placeholder="Enter event name"
                        value={formik.values.name}
                        onChangeText={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        error={formik.touched.name && formik.errors.name}
                    />

                    <Input
                        type="textarea"
                        label="Description"
                        placeholder="Describe the event"
                        value={formik.values.description}
                        onChangeText={formik.handleChange("description")}
                        onBlur={formik.handleBlur("description")}
                        error={formik.touched.description && formik.errors.description}
                    />

                    <Text size={19} weight="semibold">Event Type</Text>
                    <Row justify="space-between" style={styles.options_row}>
                        {values.event_types.map((item) => (
                            <SelectorBox
                                key={item.value}
                                label={item.label}
                                selected={formik.values.type === item.value}
                                onPress={() => functions.setEventType(item.value)}
                            />
                        ))}
                    </Row>
                    {formik.touched.type && formik.errors.type && (
                        <Text size={12} color={colors.danger}>{formik.errors.type}</Text>
                    )}

                    <Text size={19} weight="semibold">Schedule</Text>

                    <DateTimeInput
                        required
                        label="Start Date"
                        placeholder="Select start date"
                        value={formik.values.date_from}
                        onChangeText={(value) => formik.setFieldValue("date_from", value)}
                        error={formik.touched.date_from && formik.errors.date_from}
                    />

                    <DateTimeInput
                        required
                        label="End Date"
                        placeholder="Select end date"
                        value={formik.values.date_to}
                        onChangeText={(value) => formik.setFieldValue("date_to", value)}
                        error={formik.touched.date_to && formik.errors.date_to}
                    />

                    <Row gap={12}>
                        <View style={styles.half_field}>
                            <DateTimeInput
                                required
                                label="Start Time"
                                placeholder="Select time"
                                type="time"
                                value={formik.values.time_from}
                                onChangeText={(value) => formik.setFieldValue("time_from", value)}
                                error={formik.touched.time_from && formik.errors.time_from}
                            />
                        </View>
                        <View style={styles.half_field}>
                            <DateTimeInput
                                required
                                label="End Time"
                                placeholder="Select time"
                                type="time"
                                value={formik.values.time_to}
                                onChangeText={(value) => formik.setFieldValue("time_to", value)}
                                error={formik.touched.time_to && formik.errors.time_to}
                            />
                        </View>
                    </Row>

                    <Text size={19} weight="semibold">Venue & Fees</Text>

                    <Input
                        required
                        label="Venue"
                        placeholder="Enter venue"
                        value={formik.values.venue}
                        onChangeText={formik.handleChange("venue")}
                        onBlur={formik.handleBlur("venue")}
                        error={formik.touched.venue && formik.errors.venue}
                    />

                    <Input
                        type="number"
                        label="Fees"
                        placeholder="0 for free events"
                        value={formik.values.fees}
                        onChangeText={formik.handleChange("fees")}
                        onBlur={formik.handleBlur("fees")}
                        error={formik.touched.fees && formik.errors.fees}
                    />

                    <Text size={19} weight="semibold">Age Restriction (Optional)</Text>

                    <Row gap={12}>
                        <View style={styles.half_field}>
                            <Input
                                type="number"
                                label="Minimum Age"
                                placeholder="e.g. 12"
                                value={formik.values.age_from}
                                onChangeText={formik.handleChange("age_from")}
                                onBlur={formik.handleBlur("age_from")}
                                error={formik.touched.age_from && formik.errors.age_from}
                            />
                        </View>
                        <View style={styles.half_field}>
                            <Input
                                type="number"
                                label="Maximum Age"
                                placeholder="e.g. 18"
                                value={formik.values.age_to}
                                onChangeText={formik.handleChange("age_to")}
                                onBlur={formik.handleBlur("age_to")}
                                error={formik.touched.age_to && formik.errors.age_to}
                            />
                        </View>
                    </Row>

                    <Text size={19} weight="semibold">Registration Settings</Text>

                    <Checkbox
                        label="Limit maximum registrations"
                        value={formik.values.max_registrations_enabled}
                        onChange={(value) => formik.setFieldValue("max_registrations_enabled", value)}
                    />

                    {formik.values.max_registrations_enabled && (
                        <Input
                            required
                            type="number"
                            label="Registration Limit"
                            placeholder="Enter maximum registrations"
                            value={formik.values.max_registrations_limit}
                            onChangeText={formik.handleChange("max_registrations_limit")}
                            onBlur={formik.handleBlur("max_registrations_limit")}
                            error={formik.touched.max_registrations_limit && formik.errors.max_registrations_limit}
                        />
                    )}

                    <DateTimeInput
                        label="Registration Deadline"
                        placeholder="Select deadline (optional)"
                        value={formik.values.registration_deadline}
                        onChangeText={(value) => formik.setFieldValue("registration_deadline", value)}
                        error={formik.touched.registration_deadline && formik.errors.registration_deadline}
                    />

                    <Button onPress={formik.handleSubmit}>{values.button_text}</Button>

                </View>

                <ImagePickerModal
                    visible={values.image_modal}
                    onClose={functions.toggleImageModal}
                    onCamera={functions.openCamera}
                    onGallery={functions.openGallery}
                />

            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default ManageEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(20),
        paddingBottom: heightPixel(30),
    },
    options_row: {
        flexWrap: "wrap",
        rowGap: heightPixel(13),
    },
    half_field: {
        flex: 1,
    },
})
