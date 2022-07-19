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
import { addAadhaarImage } from "../../store/slices/aadhaarSlice"
import { addSelfie } from "../../store/slices/profileSlice"
import { useDispatch } from "react-redux"
const RNFS = require("react-native-fs");

export default function ExpoPhotoCapture({ route }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(CameraType.back)
  const camera = useRef()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [id, setId] = useState()

  const AskPermission = async() => {
    const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
  }

  useEffect(() => {
    AskPermission()
     if (route.params.type.match(/^AADHAAR/)) {
      dispatch(addAadhaarImage({ data: id, type: route.params.type }));
    } else if (route.params.type.match(/^SELFIE/)) {
      dispatch(addSelfie({ data: id, type: route.params.type }));
    }
  }, [id])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  // useEffect(() => {
  //   // if (props.route.params.type.match(/^AADHAAR/)) {
  //   //   dispatch(addAadhaarImage({ data: id, type: props.route.params.type }));
  //   // } else if (props.route.params.type.match(/^SELFIE/)) {
  //     dispatch(addSelfie({ data: id, type: route.params.type }));
  //   // }
  // }, [id]);

  // useEffect(() => {

  // })

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.current.takePictureAsync()
    console.log(photo)
    const base64image = await RNFS.readFile(photo.uri, "base64");
    setId(base64image);
    navigation.navigate(route?.params?.routeName, {imgUri: photo.uri})
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
