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
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useNavigation } from "@react-navigation/core"
import { styles, checkBox, form, Camera, selfie } from "../styles"
import { AppBar, IconButton, Icon, Button } from "@react-native-material/core"
import * as ImagePicker from "react-native-image-picker"
import { useStateValue } from "../../StateProvider"
import ProgressBarTop from "../../components/ProgressBarTop"
import { putProfileData } from "../../services/employees/employeeServices"
import { GenerateDocument } from "../../helpers/GenerateDocument"
import { PermissionsAndroid } from "react-native"

export default PersonalImage = ({ route }) => {
  const navigation = useNavigation()
  const [pickerResponse, setPickerResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [{ Selfie, Profile, id }, dispatch] = useStateValue()
  const [responseCamera, setResponseCamera] = React.useState(null)

  useEffect(() => {dispatch(addCurrentScreen("PersonalImage"))}, []);
  const ProfilePush = () => {
    setLoading(true)
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
        console.log(profilePayload)
        console.log(res.data)
        // Alert.alert("Message", res.data["message"])
        navigation.navigate("Home")
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(addSelfie(imageData));
  }, [imageData]);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
    }
    ImagePicker.launchImageLibrary(options, setPickerResponse)
    setResponseCamera(null)
  }, [])

  useEffect(() => {
    if (route?.params?.dataUri) {
      setResponseCamera(route?.params?.dataUri)
    }
    console.log(route?.params?.dataUri)
  }, [route])

  const navigateToCapture = () => {
    navigation.navigate("ExpoIdCapture", {
      front: true,
      routeName: "PersonalImage",
    })
  }

  const imageData = pickerResponse?.assets && pickerResponse.assets[0].base64

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
                navigateToCapture()
              }}
            />
          </View>
          <Button
            title={
              loading ? (
                <ActivityIndicator size={"large"} color="white" />
              ) : (
                "Finish"
              )
            }
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
