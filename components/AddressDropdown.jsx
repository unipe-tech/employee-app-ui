import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addESICAddress } from "../store/slices/esicSlice"

import FormInput from "./atoms/FormInput";
import DropDownForm from "./molecules/DropDownForm";

const customData = require("../assets/state_districts.json");

const AddressDropdown = ({type}) => {
  const [districts, setDistricts] = useState(["Please Choose a State"]);

  const dispatch = useDispatch()
  const states = Object.keys(customData);

  const [geoState, setGeoState] = useState(
    useSelector((state) => state.esic.address[type].state)
  );
  const [district, setDistrict] = useState(
    useSelector((state) => state.esic.address[type].district)
  );
  const [street, setStreet] = useState(
    useSelector((state) => state.esic.address[type].street)
  );

  const [pincode, setPincode] = useState(
    useSelector((state) => state.esic.address[type].pincode)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type, subtype: "state", val: geoState })
    );
  }, [dispatch, geoState, type]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type, subtype: "street", val: street })
    );
  }, [dispatch, street, type]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type, subtype: "pincode", val: pincode })
    );
  }, [dispatch, pincode, type]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type,
        subtype: "district",
        val: district,
      })
    );
  }, [dispatch, district, type]);

  useEffect(() => {
    if (geoState) {
      setDistricts(customData[geoState]);
      console.log(geoState);
    }
  }, [geoState]);

  let title;

  switch (type) {
    case "present":
       title = "Present";
      break;
    case "permanent":
       title = "Permanent";
      break;
    case "nominee":
       title = "Nominee";
      break;
    default:
       title = "";
      break;
  }

  return (
    <>
      <FormInput
        placeholder={`${title  } Street`}
        containerStyle={{ marginVertical: 10 }}
        value={street}
        onChange={setStreet}
      />
      <DropDownForm
        placeholder={`${title  } State`}
        containerStyle={{ marginVertical: 10 }}
        value={geoState}
        setValue={setGeoState}
        data={states}
      />

      <DropDownForm
        placeholder={`${title  } District`}
        containerStyle={{ marginVertical: 10 }}
        value={district}
        setValue={setDistrict}
        data={districts}
      />

      <FormInput
        placeholder={`${title  } Pincode`}
        containerStyle={{ marginVertical: 10 }}
        value={pincode}
        onChange={setPincode}
      />
    </>
  );
};

export default AddressDropdown