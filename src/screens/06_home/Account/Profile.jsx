import { View, BackHandler } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles";
import Header from "../../../components/atoms/Header";
import DetailsCard from "../../../components/molecules/DetailsCard";
import { useEffect } from "react";
import ProfileFormTemplate from "../../../templates/profile/Form";

const Profile = ({ navigation }) => {
  
  const profileSlice = useSelector((state) => state.profile);
  const profileComplete = profileSlice?.profileComplete;
  const aadhaarData = useSelector((state) => state.aadhaar.data);
  const panData = useSelector((state) => state.aadhaar.data);
  const fullName = aadhaarData?.name || panData?.name;
  const email = profileSlice?.email;
  const mobile = useSelector((state) => state.auth.phoneNumber);
  const alternateMobile = profileSlice?.altMobile;
  const maritalStatus = profileSlice?.maritalStatus;
  const qualification = profileSlice?.qualification;

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: fullName, fullWidth: true },
      { subTitle: "Email Id", value: email, fullWidth: true },
      { subTitle: "Mobile Number", value: mobile, fullWidth: true },
      {
        subTitle: "Alternate Mobile Number",
        value: alternateMobile,
        fullWidth: true,
      },
      {
        subTitle: "Educational Qualification",
        value: qualification,
        fullWidth: true,
      },
      { subTitle: "Marital Status", value: maritalStatus, fullWidth: true },
    ];
    return res;
  };

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "Account",
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Profile Details" onLeftIconPress={() => backAction()} />
      {profileComplete ? (
        <View style={styles.container}>
          <DetailsCard
            data={cardData()}
            imageUri={{
              uri: `data:image/jpeg;base64,${aadhaarData["photo_base64"]}`,
              cache: "only-if-cached",
            }}
          />
        </View>
      ) : (
        <>
          <ProfileFormTemplate type="KYC"/>
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;
