import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setMismatch as setBankMismatch } from "../../store/slices/bankSlice";
import { setMismatch as setPanMismatch } from "../../store/slices/panSlice";
const fuzz = require("fuzzball");

export const MismatchScore = ({ string, checkString }) => {
  const score = 100 - fuzz.token_set_ratio(string, checkString);
  return score;
};

const FuzzyCheck = (props) => {
  const dispatch = useDispatch();
  const aadhaarName = useSelector((state) => state.aadhaar.data?.name);
  const score = MismatchScore({ string: props.name, checkString: aadhaarName});
  useEffect(() => {
    console.log("FuzzyCheck", props.step, score);
    if (props.step == "PAN") {
      dispatch(setPanMismatch(score));
    } else {
      dispatch(setBankMismatch(score));
    }
  }, [score]);

  return (
    <>
      {score > 20
        ? Alert.alert(
            "Name mismatch",
            `Your Aadhaar Card name ${aadhaarName} does not match with your ${props.step} name ${checkName}`
          )
        : null}
    </>
  );
};

export default FuzzyCheck;
