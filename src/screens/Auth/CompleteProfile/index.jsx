import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import DateTimeInput from "../../../components/DateTimeInput"
import Input from "../../../components/Input"
import PhoneInput from "../../../components/PhoneInput"
import { heightPixel } from "../../../helpers/metrics"
import AuthLayout from "../../../layouts/AuthLayout"
import useCompleteProfileController from "./useCompleteProfileController"

const CompleteProfile = () => {

    const { values } = useCompleteProfileController()

    return (
        <AuthLayout
            title={"Important Details"}
            subtitle={"Let's get some important details"}
        >
            <View style={styles.input_container}>
                <PhoneInput
                    label="Phone Number"
                    required
                    value={values.formik.values.phone}
                    onChangeText={values.formik.handleChange("phone")}
                    onChangeCountry={(value) => {
                        values.formik.setFieldValue("country_code", value?.code)
                        values.formik.setFieldValue("dialing_code", value?.calling_code)
                    }}
                    onBlur={values.formik.handleBlur("phone")}
                    error={values.formik.touched.phone && values.formik.errors.phone}
                />
                <DateTimeInput
                    label="Date of Birth"
                    placeholder={"Enter date of birth"}
                    value={values.formik.values.date_of_birth}
                    onChangeText={(value) => values.formik.setFieldValue("date_of_birth", value)}
                />
                <Input
                    placeholder="Enter here"
                    label={"Emergency Note"}
                    type="textarea"
                    value={values.formik.values.emergency_notes}
                    onChangeText={values.formik.handleChange("emergency_notes")}
                    onBlur={values.formik.handleBlur("emergency_notes")}
                    error={values.formik.touched.emergency_notes && values.formik.errors.emergency_notes}
                />
            </View>
            <Button
                onPress={values.formik.handleSubmit}
                loading={values.isLoading}
            >
                Submit
            </Button>
        </AuthLayout>
    )
}

const styles = StyleSheet.create({
    input_container: {
        marginTop: heightPixel(32),
        gap: heightPixel(12),
        marginBottom: heightPixel(30),
        width: "100%"
    },
})

export default CompleteProfile