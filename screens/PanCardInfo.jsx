import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TextInput,Image,ScrollView, Alert,Linking} from 'react-native';
import { AppBar,IconButton,Icon, Button} from "@react-native-material/core";
import { useNavigation} from '@react-navigation/core';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { styles,form,progressBar,Camera, checkBox,bankform} from './styles';
import { useStateValue } from "../StateProvider";
import {CF_API_KEY} from '@env';

export default PanCardInfo = () => {
    const navigation = useNavigation();
    const [pan,setPan]=useState("");
    const [next,setNext] = useState();
    const [{PanFront},dispatch] = useStateValue();
    const [panName, setPanName]=useState('');
    const [birthday,setBirthday]=useState('');

    useEffect(() => {
      if(pan.length === 10){
        setNext(true);
      }
      else{
        setNext(false);
      }
    }, [pan]);


    const VerifyPAN =() =>{
      const data=
      {
        "pan_number": pan,
        "name": panName,
        "date_of_birth": birthday,
        "consent": "Y"
      };
      const options = {
        method: 'POST',
        headers: {
          'X-Auth-Type': 'API-Key',
          'X-API-Key': CF_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      
      fetch(`https://api.gridlines.io/pan-api/v2/verify`, options)
        .then(response => response.json())
        .then(response => 
          {console.log(response);
            {if(response["status"]=="200") {
              switch(response["data"]["code"]){
                case "1001" : 
                  navigation.navigate("BankInfoForm")
                  Alert.alert("Pan Number Verification status",`PAN number ${pan} verified!`)
                  break;
                
                case "1002" :
                  response["data"]["pan_data"]["name_match_status"]=="NO_MATCH" ? Alert.alert("Pan Number Verification status",`Partial details matched, Please Check Name.`): Alert.alert("Pan Number Verification status",`Partial details matched, Please Check DOB.`)
                  break;

                case "1004":
                  Alert.alert("Pan Number Verification status",`PAN number incorrect.`)
                  break;
            
            }}
            else{
              Alert.alert("Error",response["error"]["message"])
            }
          }
          })
            .catch(err => Alert.alert("Error",err));
    }
    
    useEffect(() => {
      const birthdayChange =()=>{
        setBirthday(birthday.replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
      }
      return(
          birthdayChange()
      )
    }, [birthday])
    
  return (
    <>
    <SafeAreaView style={styles.container}>
    <AppBar
  title="Setup Profile"
  color="#4E46F1"
  leading={
    <IconButton icon={<Icon name="arrow-back" size={20} color="white"/>} onPress={()=>navigation.goBack()} />
  }
  />
   <View style={progressBar.progressView}>
    <ProgressBar
          styleAttr="Horizontal"
          style={progressBar.progressBar}
          indeterminate={false}
          progress={0.5}
        />
    <Text style={progressBar.progressNos} >2/4</Text>
    </View>
  <Text style={form.formHeader} >PAN Verification</Text>

  <ScrollView keyboardShouldPersistTaps='handled'>
  <View style={checkBox.padding}/>
  {PanFront ? 
   null:
   <>
  <Text style={form.formLabel} >Enter PAN Number</Text>
  <TextInput style={form.formTextInput} autoCapitalize="characters" value={pan} onChangeText={setPan} maxLength={10} placeholder="Enter PAN Number" required/>
  <View style={form.forgotText}><Text style={styles.termsText} onPress={() => Linking.openURL('https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit')}>Forgot PAN?</Text></View>
  <Text style={form.formLabel}>Name as per PAN Card</Text>
  <TextInput style={form.formTextInput} autoCapitalize="words" value={panName} onChangeText={setPanName}  placeholder="Enter Name Registered with PAN" required/>
  <Text style={form.formLabel}>Date of birth as recorded in PAN</Text>
  <TextInput style={form.formTextInput} value={birthday} onChangeText={setBirthday}  placeholder="YYYY-MM-DD" maxLength={10}/>
  <View style={bankform.infoCard}><Text style={bankform.infoText}><Icon name="info-outline" size={20} color="#4E46F1"/>PAN is needed to verify your name and date of birth</Text></View>
  {next ? <Button uppercase={false} title="Continue" type="solid"  color="#4E46F1" style={form.nextButton} onPress={()=>{VerifyPAN()}}/> : <Button title="Continue" uppercase={false} type="solid"  style={form.nextButton} disabled/>}   
  </>
  }
  <View style={checkBox.padding}/>
  </ScrollView>
  </SafeAreaView>
  </>
  )
}
