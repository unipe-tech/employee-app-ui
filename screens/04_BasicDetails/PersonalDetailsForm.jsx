import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useNavigation } from "@react-navigation/core"
import {
  AppBar,
  IconButton,
  Icon,
  Button,
  Chip,
} from "@react-native-material/core"
import { form, bankform, styles } from "../styles"
import ProgressBarTop from "../../components/ProgressBarTop"
import { useStateValue } from "../../StateProvider"
import { GenerateDocument } from "../../helpers/GenerateDocument"
import { putProfileData } from "../../services/employees/employeeServices"
import Input from "../../components/Input"
import PrimaryButton from "../../components/PrimaryButton"
import DropdownPicker from "../../components/DropdownPicker"

export default PersonalDetailsForm = () => {
  const educationalQualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ]
  const maritalStatuses = ["Unmarried", "Married"]
  const [{ id }, dispatch] = useStateValue()
  const [maritalStatus, setMaritalStatus] = useState("")
  const [educationalQualification, setEducationallQualification] = useState("")
  const [alternatePhone, setAlternatePhone] = useState("")
  const [email, setEmail] = useState("")
  const navigation = useNavigation()

  const onFinish = () => {
    dispatch({
      type: "SET_PROFILE",
      payload: {
        maritalStatus: maritalStatus,
        qualification: educationalQualification,
        altMobile: alternatePhone,
        email: email,
      },
    })
  }
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

        <ProgressBarTop step={4} />
        <Text style={form.formHeader}>Employee basic details</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={form.formLabel}>Select Education*</Text>

          <DropdownPicker
            promptText={"Educational Qualification"}
            value={educationalQualification}
            setValue={(itemValue) => setEducationallQualification(itemValue)}
          >
            {educationalQualifications.map((item, index) => {
              return <Picker.Item label={item} value={item} />
            })}
          </DropdownPicker>
          <Text style={form.formLabel}>Marital Status*</Text>
          <View style={styles.flexrow}>
            {maritalStatuses.map((item, index) => {
              return (
                <Chip
                  key={index}
                  uppercase={false}
                  style={
                    maritalStatus == item
                      ? form.chosenButton
                      : form.choiceButton
                  }
                  label={item}
                  labelStyle={form.labelStyle}
                  type="solid"
                  variant="outlined"
                  color={maritalStatus == item ? "white" : "#4E46F1"}
                  tintColor="#4e46e1"
                  onPress={() => setMaritalStatus(item)}
                />
              )
            })}
          </View>
          <Input
            value={alternatePhone}
            label="Enter your alternate mobile number"
            setValue={setAlternatePhone}
            otherProps={{
              keyboardType: "phone-pad",
              textContentType: "telephoneNumber",
              autoCompleteType: "tel",
            }}
            required
            maxLength={10}
            placeholder="XXXXXXXXXX"
          />
          <Input
            label="Enter your Email ID"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            required
          />

          <PrimaryButton
            title="Continue"
            type="solid"
            uppercase={false}
            color="#4E46F1"
            onPress={() => {
              onFinish()
              navigation.navigate("PersonalImage")
            }}
          />
          <View style={bankform.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
