import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { RefreshCw } from 'lucide-react-native';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default function Camera() {
    const insets = useSafeAreaInsets();
    const [cameraDiraction, setCameraDirection] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <CameraView facing={cameraDiraction}></CameraView>
            <Pressable onPress={() => setCameraDirection(cameraDiraction === "back" ? "front" : "back")}>
                <RefreshCw size={25} color="white" />
            </Pressable>
        </View>
    );
}