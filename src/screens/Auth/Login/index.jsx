import { Platform, StyleSheet, View } from "react-native"
import images from "../../../assets/images"
import Button from "../../../components/Button"
import Checkbox from "../../../components/Checkbox"
import Input from "../../../components/Input"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import AuthLayout from "../../../layouts/AuthLayout"
import useLoginController from "./useLoginController"

const Login = () => {

    const { values, functions } = useLoginController()

    return (
        <AuthLayout title={"Log In"} subtitle={"Please Log In To Your Account"}>
            <View style={styles.fields_container}>
                <Input
                    placeholder="Enter email address"
                    required
                    label={"Email Address"}
                    type="email"
                    icon={images.mail}
                    value={values.formik.values.email}
                    onChangeText={values.formik.handleChange("email")}
                    error={values.formik.touched.email && values.formik.errors.email}
                />
                <Input
                    placeholder="Enter password"
                    required
                    label={"Password"}
                    type="password"
                    value={values.formik.values.password}
                    onChangeText={values.formik.handleChange("password")}
                    error={values.formik.touched.password && values.formik.errors.password}
                />

                <Row gap={5} justify="space-between">
                    <Checkbox
                        label={"Remember me"}
                        value={values.formik.values.remember_me}
                        onChange={() =>
                            values.formik.setFieldValue("remember_me", !values.formik.values.remember_me)
                        }
                    />
                    <Text
                        weight="semibold"
                        underline
                        color={colors.light_primary}
                        onPress={functions.onForgotPassword}
                    >
                        Forgot Password?
                    </Text>
                </Row>
            </View>

            <View style={styles.actions_container}>
                <Button onPress={values.formik.handleSubmit} loading={values.isLoading}>
                    Log In
                </Button>

                <Text size={15} weight="bold" align="center">Or Continue with</Text>

                <Row align="center" justify="center" gap={15}>
                    <View style={styles.social_button}>
                        <Button rounded={"full"} icon={images.google} onPress={functions.onGoogle} />
                    </View>
                    {
                        Platform.OS === "ios" &&
                        <View style={styles.social_button}>
                            <Button rounded={"full"} icon={images.apple} onPress={functions.onApple} />
                        </View>
                    }
                </Row>
            </View>

            <View style={styles.spacer} />

            <Row gap={5} justify="center" style={styles.signup_row}>
                <Text weight="semibold">
                    Don't have an account?
                </Text>
                <Text
                    weight="semibold"
                    color={colors.light_primary}
                    onPress={functions.onSignup}
                >
                    Sign Up
                </Text>
            </Row>
        </AuthLayout>
    )
}

const styles = StyleSheet.create({
    fields_container: {
        gap: heightPixel(15),
        marginTop: heightPixel(25),
        width: "100%"
    },
    spacer: {
        flex: 1,
        minHeight: heightPixel(30),
    },
    actions_container: {
        gap: heightPixel(24),
        marginTop: heightPixel(31),
    },
    social_button: {
        width: "47%",
    },
    signup_row: {
        paddingVertical: heightPixel(23),
    },
})

export default Login