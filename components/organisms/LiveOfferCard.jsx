import { useNavigation } from "@react-navigation/core";
import GetMoneyCard from "../molecules/GetMoneyCard";

const LiveOfferCard = ({ eligible, accessible, ewaLiveSlice }) => {
  const navigation = useNavigation();

  return (
    <>
      <GetMoneyCard
        navigation={navigation}
        eligible={eligible}
        accessible={accessible}
        amount={"₹" + ewaLiveSlice?.eligibleAmount}
      />
    </>
  );
};

export default LiveOfferCard;
