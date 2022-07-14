import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { Camera, CameraType } from "expo-camera"
import { useNavigation } from "@react-navigation/native"

export default function ExpoPhotoCapture({ route }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(CameraType.back)
  const camera = useRef()
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.current.takePictureAsync()
    console.log(photo)
    navigation.navigate(route.params.routeName, { dataUri: photo.uri })
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        ratio="16:9"
        type={route?.params?.front ? CameraType.front : CameraType.back}
      >
        <View style={styles.buttonContainer}>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
})
