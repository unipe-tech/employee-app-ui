import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Linking,
} from "react-native"
import { AppBar, IconButton, Icon, Button } from "@react-native-material/core"
import { useNavigation } from "@react-navigation/core"
import { ProgressBar } from "@react-native-community/progress-bar-android"
import {
  styles,
  form,
  progressBar,
  Camera,
  checkBox,
  bankform,
} from "../styles"
import { useStateValue } from "../../StateProvider"
import { CF_API_KEY } from "@env"
import ProgressBarTop from "../../components/ProgressBarTop"
import { GenerateDocument } from "../../helpers/GenerateDocument"
import { putPanData } from "../../services/employees/employeeServices"
import Input from "../../components/Input"
import InfoCard from "../../components/InfoCard"

export default PanCardInfo = () => {
  const navigation = useNavigation()
  const [pan, setPan] = useState("")
  const [PANKeyboard, setPANKeyboard] = useState("")
  const [next, setNext] = useState()
  const [{ id }, dispatch] = useStateValue()
  const [panName, setPanName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [addPanData] = useAddPanDataMutation()

  // console.log();
  // putPanData()

  useEffect(() => {
    if (pan.length === 10) {
      setNext(true)
    } else {
      setNext(false)
    }
  }, [pan])

  const VerifyPAN = () => {
    const data = {
      pan_number: pan,
      name: panName,
      date_of_birth: birthday,
      consent: "Y",
    }
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": CF_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    fetch(`https://api.gridlines.io/pan-api/v2/verify`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        {
          if (response["status"] == "200") {
            switch (response["data"]["code"]) {
              case "1001":
                PanPush()
                RetrievePAN()
                break

              case "1002":
                response["data"]["pan_data"]["name_match_status"] == "NO_MATCH"
                  ? Alert.alert(
                      "Pan Number Verification status",
                      `Partial details matched, Please Check Name.`
                    )
                  : Alert.alert(
                      "Pan Number Verification status",
                      `Partial details matched, Please Check DOB.`
                    )
                break

              case "1004":
                Alert.alert(
                  "Pan Number Verification status",
                  `PAN number incorrect.`
                )
                break
            }
          } else {
            Alert.alert("Error", response["error"]["message"])
          }
        }
      })
      .catch((err) => Alert.alert("Error", err))
  }

  const PanPush = () => {
    var panPayload = GenerateDocument({ src: "Pan", id: id, pan: pan })
    putPanData(panPayload)
      .then((res) => {
        console.log(panPayload)
        console.log(res.data)
        Alert.alert("Message", res.data["message"])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const RetrievePAN = () => {
    const data = {
      pan_number: pan,
      consent: "Y",
    }
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": CF_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    fetch(`https://api.gridlines.io/pan-api/fetch-detailed`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        Alert.alert(
          "PAN Information",
          `PAN: ${pan}\nName: ${panName}\nGender: ${response["data"]["pan_data"]["gender"]}\nEmail: ${response["data"]["pan_data"]["email"]}`
        )
        navigation.navigate("BankInfoForm")
      })
      .catch((err) => Alert.alert("Error", err))
  }

  useEffect(() => {
    const birthdayChange = () => {
      setBirthday(birthday.replace(/^(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"))
    }
    return birthdayChange()
  }, [birthday])

  const PANEnter = () => {
    if (PANKeyboard !== undefined) {
      if (pan.length === 5) {
        setPANKeyboard("number-pad")
      } else if (pan.length === 9) {
        setPANKeyboard("default")
      } else if (pan.length === 0) {
        setPANKeyboard("default")
      }
    } else {
      setPANKeyboard("default")
    }
  }

  useEffect(() => {
    PANEnter()
  }, [pan.length])

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
        <ProgressBarTop step={2} />
        <Text style={form.formHeader}>PAN Verification</Text>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={checkBox.padding} />
          <Input
            otherProps={{
              autoCapitalize: "characters",
              keyboardType: PANKeyboard,
            }}
            value={pan}
            label="Enter PAN Number"
            setValue={setPan}
            maxLength={10}
            placeholder="Enter PAN Number"
            required
          />
          <View style={form.forgotText}>
            <Text
              style={styles.termsText}
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit"
                )
              }
            >
              Forgot PAN?
            </Text>
          </View>

          <Input
            label="Name as per PAN Card"
            otherProps={{ autoCapitalize: "words" }}
            value={panName}
            setValue={setPanName}
            placeholder="Enter Name Registered with PAN"
            required
          />
          <Input
            label="Date of birth as recorded in PAN"
            value={birthday}
            setValue={setBirthday}
            placeholder="YYYY-MM-DD"
            maxLength={10}
          />
          <InfoCard
            title={"PAN is needed to verify your name and date of birth"}
            iconName="info-outline"
          />
          {next ? (
            <Button
              uppercase={false}
              title="Continue"
              type="solid"
              color="#4E46F1"
              style={form.nextButton}
              onPress={() => {
                // VerifyPAN()
                PanPush()
              }}
            />
          ) : (
            <Button
              title="Continue"
              uppercase={false}
              type="solid"
              style={form.nextButton}
              disabled
            />
          )}
          <View style={checkBox.padding} />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
