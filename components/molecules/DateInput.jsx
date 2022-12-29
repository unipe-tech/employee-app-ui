import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import { COLORS, FONTS } from "../../constants/Theme";
import { Ionicons } from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateInput = ({ dob, setDob }) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDob(currentDate);
    console.log({ currentDate });
  };

  function getFormattedDate() {
    var month = dob.getMonth() + 1;
    var day = dob.getDate();

    var output =
      (day < 10 ? "0" : "") +
      day +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      dob.getFullYear();

    return output;
  }
  return (
    <>
      <FormInput
        placeholder="Date of birth"
        containerStyle={{ marginVertical: 5, borderColor: COLORS.primary }}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        value={getFormattedDate(dob)}
        onChange={setDob}
        autoFocus={true}
        maxLength={10}
        inputStyle={{ ...FONTS.body4, color: COLORS.secondary }}
        appendComponent={
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        }
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode={"date"}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DateInput;
