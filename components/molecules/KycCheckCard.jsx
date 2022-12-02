import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import MessageCard from "../atoms/MessageCard";
import { allAreNull } from "../../helpers/nullCheck";

const KycCheckCard = () => {
  const bankStatus = useSelector((state) => state.bank.verifyStatus);
  const panStatus = useSelector((state) => state.pan.verifyStatus);
  const aadhaarStatus = useSelector((state) => state.aadhaar.verifyStatus);

  const message = [
    aadhaarStatus != "SUCCESS"
      ? { label: "Add Aadhaar Details", value: "AADHAAR" }
      : null,
    bankStatus != "SUCCESS"
      ? { label: "Add Bank Details", value: "BANK" }
      : null,
    panStatus != "SUCCESS" ? { label: "Add PAN Details", value: "PAN" } : null,
  ];

  return (
    <SafeAreaView>
      {!allAreNull(message) ? (
        <MessageCard
          title="You are few steps away from getting your"
          subtitle="Money to your bank account"
          message={message}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default KycCheckCard;
