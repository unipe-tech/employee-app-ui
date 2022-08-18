import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addESICAddress } from "../store/slices/esicSlice";
import { bankform, form } from "../styles";
// const customData = require("../assets/state_districts.json");
import customData from "../assets/state_districts.json";

function AddressDropdown(props) {
  const [districts, setDistricts] = useState(["Please Choose a State"]);

  const dispatch = useDispatch();
  const states = Object.keys(customData);

  const [geoState, setGeoState] = useState(
    useSelector((state) => state.esic.address[props.type].state)
  );
  const [district, setDistrict] = useState(
    useSelector((state) => state.esic.address[props.type].district)
  );
  const [street, setStreet] = useState(
    useSelector((state) => state.esic.address[props.type].street)
  );

  const [pincode, setPincode] = useState(
    useSelector((state) => state.esic.address[props.type].pincode)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type: props.type, subtype: "state", val: geoState })
    );
  }, [geoState]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type: props.type, subtype: "street", val: street })
    );
  }, [street]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type: props.type, subtype: "pincode", val: pincode })
    );
  }, [pincode]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: props.type,
        subtype: "district",
        val: district,
      })
    );
  }, [district]);

  useEffect(() => {
    if (geoState) {
      setDistricts(customData[geoState]);
      console.log(geoState);
    }
  }, [geoState]);

  switch (props.type) {
    case "present":
      var title = "Present";
      break;
    case "permanent":
      var title = "Permanent";
      break;
    case "nominee":
      var title = "Nominee";
      break;
  }

  return (
    <>
      <Text style={bankform.formtitle}>{title} Street</Text>
      <TextInput
        style={bankform.formInput}
        value={street}
        onChangeText={setStreet}
      />
      <Text style={bankform.formtitle}>{title} State</Text>
      <Picker
        style={form.picker}
        prompt="Select State"
        selectedValue={geoState}
        onValueChange={setGeoState}
      >
        {states.map((value, index) => {
          return <Picker.Item label={value} value={value} key={index} />;
        })}
      </Picker>
      <Text style={bankform.formtitle}>{title} District</Text>
      <Picker
        style={form.picker}
        prompt="Select District"
        selectedValue={district}
        onValueChange={setDistrict}
      >
        {districts.map((value, index) => {
          return <Picker.Item label={value} value={value} key={index} />;
        })}
      </Picker>
      <Text style={bankform.formtitle}>{title} Pincode</Text>
      <TextInput
        style={bankform.formInput}
        value={pincode}
        onChangeText={setPincode}
      />
    </>
  );
}

export default AddressDropdown;
