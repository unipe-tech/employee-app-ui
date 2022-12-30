import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import MandateFormTemplate from "../../templates/mandate/Form";
import { styles } from "../../styles";
import TopTabNav from "../../navigators/TopTabNav";
import DetailsCard from "../../components/molecules/DetailsCard";
import Loading from "../../components/atoms/Loading";

const Mandate = () => {
  const [updated, setUpdated] = useState(false);

  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType.toUpperCase();
  const verifyStatus = mandateSlice.verifyStatus;

  const cardData = () => {
    var res = [
      {
        subTitle: "Mandate Type",
        value: authType,
        fullWidth: true,
      },
      {
        subTitle: "Verify Status",
        value: verifyStatus,
      },
    ];
    return res;
  };

  useEffect(() => {
    const timer = setTimeout(() => setUpdated(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    {
      name: "Mandate",
      component: MandateFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {updated ? (
        verifyStatus == "SUCCESS" ? (
          <View style={styles.container}>
            <DetailsCard data={cardData()} />
          </View>
        ) : (
          <TopTabNav tabs={tabs} hide={true} />
        )
      ) : (
        <>
          <TopTabNav tabs={tabs} hide={true} />
          <Loading isLoading={!updated} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Mandate;
