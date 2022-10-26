import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import HomeOfferCard from "../../components/HomeOfferCard";
import KycCheckCard from "../../components/KycCheckCard";
import  allAreNull from "../../helpers/nullCheck"
import { styles } from "../../styles";

const HomeView = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateStatus = useSelector((state) => state.mandate.verifyStatus);

  const message = [
    aadhaarStatus !== "SUCCESS" ? "AADHAAR" : null,
    bankStatus !== "SUCCESS" ? "BANK" : null,
    mandateStatus !== "SUCCESS" ? "MANDATE" : null,
    panStatus !== "SUCCESS" ? "PAN" : null,
  ];

  return (
    <SafeAreaView style={[styles.container]}>
        <KycCheckCard />
        {allAreNull(message) ? <HomeOfferCard /> : null}
      </SafeAreaView>
  );
}

export default HomeView;
