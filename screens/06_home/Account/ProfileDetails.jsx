import { View, Alert } from "react-native";

import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles";
import LogoHeaderBack from "../../../components/molecules/LogoHeaderBack";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { COLORS } from "../../../constants/Theme";
import DetailItem from "../../../components/molecules/DetailItem";

const ProfileDetails = (props) => {
  const aadhaarData = useSelector((state) => state.aadhaar.data);
  const fullName =
    aadhaarData?.["name"] || useSelector((state) => state.pan?.name);
  const profile = useSelector((state) => state.profile);
  const email = profile?.email;
  const mobile = useSelector((state) => state.auth.phoneNumber);
  const alternateMobile = profile?.altMobile;
  const maritalStatus = profile?.maritalStatus;
  const qualification = profile?.qualification;

  const dataDetails = [
    { label: "Full Name", value: fullName || "Not Provided" },
    { label: "Email Id", value: email || "Not Provided" },
    { label: "Mobile Number", value: mobile || "Not Provided" },
    {
      label: "Alternate Mobile Number",
      value: alternateMobile || "Not Provided",
    },
    {
      label: "Educational Qualification",
      value: qualification || "Not Provided",
    },
    {
      label: "Marital Status",
      value: maritalStatus || "Not Provided",
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeaderBack
        title={"Profile"}
        leftOnPress={() => props.navigation.goBack()}
      />
      <View style={styles.container}>
        {dataDetails.map((item, index) => (
          <DetailItem
            key={index}
            label={item.label}
            value={item.value || "Not Provided"}
            divider={item.divider}
          />
        ))}

        <View style={{ flex: 1 }} />
        <PrimaryButton
          title="Update"
          onPress={() =>
            Alert.alert(
              "The Profile Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetails;
