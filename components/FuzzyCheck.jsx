/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch,useSelector } from "react-redux";

import { setMistmatch as setBankMismatch } from "../store/slices/bankSlice";
import { setMistmatch as setPanMistach } from "../store/slices/panSlice";

const fuzz = require("fuzzball");

const FuzzyCheck = ({step}) => {
  const name = useSelector((state) => state.aadhaar.data?.name);
  const dispatch = useDispatch();
  const checkName =
    step === "PAN"
      
      ? useSelector((state) => state.pan.data?.name)
      : useSelector((state) => state.bank.data?.accountHolderName);
  const score = 100 - fuzz.token_set_ratio(name, checkName);
  useEffect(() => {
    console.log("FuzzyCheck", step, score);
    if (step === "PAN") {
      dispatch(setPanMistach(score));
    } else {
      dispatch(setBankMismatch(score));
    }
  }, [score]);

if(score > 20){
  return Alert.alert("Name mismatch",
  `Your Aadhaar Card name ${name} does not match with your ${step} name ${checkName}`)
}  
return null;
};

export default FuzzyCheck;
