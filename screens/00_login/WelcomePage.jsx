import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useDispatch, useSelector } from "react-redux";
import Analytics from "appcenter-analytics";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS } from "../../constants/Theme";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { stepIndicatorStyles, styles, welcome } from "../../styles";
import SVGImg from "../../assets/UnipeLogo.svg";
import { requestUserPermission } from "../../services/notifications/notificationService";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      color: stepStatus === "finished" ? COLORS.white : COLORS.primaryPending,
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "file-document-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 1: {
        iconConfig.name = "card-account-details-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 2: {
        iconConfig.name = "smart-card-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 3: {
        iconConfig.name = "bank-outline";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      case 4: {
        iconConfig.name = "bank-check";
        return <MaterialCommunityIcons {...iconConfig} />;
      }
      default: {
        iconConfig.name = "info-outline";
        return <MaterialIcons {...iconConfig} />;
      }
    }
  };

  const renderStepIndicator = (params) => getStepIndicatorIconConfig(params);

  const data = ["Profile", "Aadhaar", "PAN", "Bank", "Mandate"];

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <SVGImg style={styles.logo} />
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={5}
            direction="vertical"
            renderStepIndicator={renderStepIndicator}
            currentPosition={-1}
            labels={data}
          />
        </View>
        <PrimaryButton
          title="Start Onboarding"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", { userId: id });
            navigation.navigate("ProfileForm");
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default WelcomePage;
