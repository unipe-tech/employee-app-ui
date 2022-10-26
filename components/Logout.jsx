import { Pressable, Text } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetAuth } from "../store/slices/authSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetESIC } from "../store/slices/esicSlice";
import { resetLicense } from "../store/slices/licenseSlice";
import { resetNavigation } from "../store/slices/navigationSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { resetTimer } from "../store/slices/timerSlice";

const Logout = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const store = useSelector((state) => state);
  // console.log(store);
  return (
    <Pressable
      onPress={() => {
        dispatch(resetAuth());
        dispatch(resetNavigation());
        dispatch(resetProfile());
        dispatch(resetPan());
        dispatch(resetAadhaar());
        dispatch(resetESIC());
        dispatch(resetBank());
        dispatch(resetLicense());
        dispatch(resetTimer());
        
        navigation.navigate("Login");
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <AntDesign name="logout" color="black" size={16} />
      <Text style={{ fontSize: 16, paddingLeft: 10 }}>Logout</Text>
    </Pressable>
  );
};

export default Logout;