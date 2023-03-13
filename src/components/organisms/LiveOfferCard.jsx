import { useNavigation } from "@react-navigation/core";
import GetMoneyCard from "../molecules/GetMoneyCard";
import PayMoneyCard from "../molecules/PayMoneyCard";

const LiveOfferCard = ({ eligible, accessible, ewaLiveSlice, fetched }) => {
  const navigation = useNavigation();

  return (
    <>
      <GetMoneyCard
        navigation={navigation}
        eligible={eligible}
        accessible={accessible}
        amount={"₹" + ewaLiveSlice?.eligibleAmount}
        fetched={fetched}
      />
      <PayMoneyCard />
    </>
  );
};

export default LiveOfferCard;
