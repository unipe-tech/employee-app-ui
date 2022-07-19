import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { GenerateDocument } from "../../helpers/GenerateDocument";
import { putProfileData } from "../../services/employees/employeeServices";
import { addSelfie } from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, selfie, styles } from "../styles";

export default PersonalImage = ({route}) => {
  const navigation = useNavigation();
  const [pickerResponse, setPickerResponse] = useState(null);
  const [responseCamera, setResponseCamera] = useState(null);
  const id = useSelector((state) => state.auth.userId);
  const placeholder = useSelector((state) => state.profile.selfie);
  const Profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {dispatch(addCurrentScreen("PersonalImage"))}, []);
  const ProfilePush = () => {
    var profilePayload = GenerateDocument({
      src: "Profile",
      id: id,
      maritalStatus: Profile["maritalStatus"],
      qualification: Profile["educationalQualification"],
      altMobile: Profile["alternatePhone"],
      email: Profile["email"],
      photo: imageData,
    });
    putProfileData(profilePayload)
      .then((res) => {
        Alert.alert("Message", res.data["message"]);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
        alert(error)
      });
  };

  useEffect(() => {
    dispatch(addSelfie(imageData));
    
  }, [imageData]);

  useEffect(() => {
    if (route?.params?.imgUri) {
      setResponseCamera(route?.params?.imgUri)
    }
    console.log(route?.params?.imgUri)
  }, [route])

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
    setResponseCamera(null)
  }, []);

  const onCameraPress = useCallback(() => {
    // const options = {
    //   cameraType: "front",
    //   quality: 1,
    //   mediaType: "photo",
    //   includeBase64: true,
    // };
    // ImagePicker.launchCamera(options, setPickerResponse);
    navigation.navigate("ExpoPhotoCapture", {
      type: "SELFIE",
      front: true,
      routeName: "PersonalImage"
    })
  }, []);

  const imageData = pickerResponse?.assets && pickerResponse.assets[0].base64;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => navigation.goBack()}
            />
          }
        />
        <ProgressBarTop step={5} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={form.formHeader}>
            Upload your Passport size photo or capture your selfie.
          </Text>
          {imageData || responseCamera ? (
            <Image
              source={{
                uri: responseCamera
                  ? responseCamera
                  : `data:image/jpeg;base64,${imageData}`,
              }}
              style={selfie.selfie}
            />
          ) : (
            <Icon
              name="perm-identity"
              size={300}
              color="grey"
              style={selfie.selfie}
            />
          )}
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <IconButton
              icon={<Icon name="image-search" size={30} color="black" />}
              style={selfie.uploadButton}
              onPress={() => {
                onImageLibraryPress();
              }}
            />
            <IconButton
              icon={<Icon name="camera-alt" size={25} color="black" />}
              style={selfie.cameraButton}
              onPress={() => {
                onCameraPress();
              }}
            />
          </View>
          <Button
            title="Finish"
            type="solid"
            uppercase={false}
            style={form.nextButton}
            color="#4E46F1"
            onPress={() => {
              ProfilePush();
            }}
          />
          <View style={checkBox.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};