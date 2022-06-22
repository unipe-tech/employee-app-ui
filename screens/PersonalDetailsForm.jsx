import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/core';
import {AppBar, IconButton, Icon, Button} from "@react-native-material/core";
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {form, progressBar, styles} from './styles';

export default PesonalDetailsForm = () => {

  const educationalQualifications = ["10th Pass", "12th Pass", "Graduate", "Post Graduate", "None of the Above"];
  const maritalStatuses = ["Unmarried", "Married"];
  const [maritalStatus, setMaritalStatus] = useState('');
  const [educationalQualification,setEducationallQualification] = useState('');
  const [alternatePhone,setAlternatePhone]= useState("");
  const [email,setEmail]= useState("");
  const navigation = useNavigation();


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
                  progress={0.75}
                />
            <Text style={progressBar.progressNos} >3/4</Text>
        </View>
        <Text style={form.formHeader}>Employee basic details</Text>

        <Text style={form.formLabel}>Select Education*</Text>
          <Picker
            selectedValue={educationalQualification}
            style={form.picker}
            onValueChange={(itemValue) => setEducationallQualification(itemValue)}
            prompt="Educational Qualification"
          >
            {
              educationalQualifications.map((item,index) => {
                return(<Picker.Item label={item} value={item}/>)
                }
              )
            }
          </Picker>        
        <Text style={form.formLabel}>Marital Status*</Text>
        <View style={styles.flexrow}>
          {
            maritalStatuses.map((item,index)=>{
              return(
                <Button key={index} uppercase={false} 
                        style={maritalStatus==item ? form.chosenButton : form.choiceButton} title={item} type="solid" color="#4E46F1" 
                        onPress={()=>setMaritalStatus(item)}/>
              )}
            )
          }
        </View>
        <Text style={form.formLabel}>Enter your alternate mobile number</Text>
        <TextInput style={styles.textInput} value={alternatePhone} onChangeText={setAlternatePhone} autoCompleteType="tel" keyboardType="phone-pad" textContentType="telephoneNumber" required placeholder='XXXXXXXXXX'/>
        <Text style={form.formLabel}>Enter your Email ID</Text>
        <TextInput style={form.formTextInput} value={email} onChangeText={setEmail}  placeholder="Enter Email" required/>

        <Button title="Finish" type="solid"  uppercase={false} style={form.nextButton} color="#4E46F1" onPress={()=>{navigation.navigate("Home")}}/>
      </SafeAreaView>
   
    </>
  )
}