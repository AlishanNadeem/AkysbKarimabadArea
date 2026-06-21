import LinearGradient from "react-native-linear-gradient"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import colors from "../../helpers/colors"
import MapView from "react-native-maps"
import { StyleSheet } from "react-native"

const Map = () => {
    return (
        <PrimaryLayout top={false} padding_horizontal={false}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <LinearGradient
                colors={[colors.dark_primary, colors.transparent]}
                locations={[0, 0.3]}
                style={styles.gradient}
                pointerEvents="none"
            />
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFill,
    },
    gradient: {
        ...StyleSheet.absoluteFill,
    },
})

export default Map