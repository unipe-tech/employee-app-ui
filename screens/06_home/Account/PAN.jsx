import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import PanFormTemplate from "../../../templates/pan/Form";
import TopTabNav from "../../../navigators/TopTabNav";
import PanConfirmApi from "../../../apis/pan/Confirm";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";

const Pan = () => {
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const verifyStatus = useSelector((state) => state.pan.verifyStatus);

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number, fullWidth: true },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Email", value: data?.email, fullWidth: true },
      { subTitle: "Verify Status", value: verifyStatus },
    ];
    return res;
  };

  const tabs = [
    {
      name: "PAN Data",
      component: PanFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Confirm",
      component: PanConfirmApi,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      {verifyStatus == "SUCCESS" ? (
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
        </View>
      ) : (
        <>
          <TopTabNav tabs={tabs} hide={true} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Pan;