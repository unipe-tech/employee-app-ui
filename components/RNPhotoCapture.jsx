import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import { RNCamera } from "react-native-camera";
import { useDispatch } from "react-redux";
import { Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";

import { addSelfie } from "../store/slices/profileSlice";
import { Camera } from "../styles";

const RNFS = require("react-native-fs");

const PendingView = () => (
  <View style={Camera.wait}>
    <Text>Waiting</Text>
  </View>
);

 const RNPhotoCapture = (props) => {
  const navigation = useNavigation();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSelfie(id));
  }, [dispatch, id]);

  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const base64image = await RNFS.readFile(data.uri, "base64");
    setId(base64image);
    navigation.goBack();
  };

  return (
    <View style={Camera.container}>
      <RNCamera
        style={Camera.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio recording",
          message: "We need your permission to use your audio",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {({ camera, status }) => {
          if (status !== "READY") return <PendingView />;
          return (
            <View style={Camera.buttons}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={Camera.back}
              >
                <Icon name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={Camera.capture}
              >
                <Text style={Camera.buttonText}> Capture </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

export default RNPhotoCapture