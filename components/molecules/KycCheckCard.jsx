import { SafeAreaView } from "react-native";
import MessageCard from "../atoms/MessageCard";
import { allAreNull } from "../../helpers/nullCheck";
import { memo } from "react";

const KycCheckCard = ({
  bankStatus,
  panStatus,
  aadhaarStatus,
  mandateStatus,
}) => {
  const message = [
    aadhaarStatus != "SUCCESS" ? "AADHAAR" : null,
    bankStatus != "SUCCESS" ? "BANK" : null,
    mandateStatus != "SUCCESS" ? "MANDATE" : null,
    panStatus != "SUCCESS" ? "PAN" : null,
  ];

  return (
    <SafeAreaView>
      {!allAreNull(message) ? (
        <MessageCard
          title="Following pending steps need to be completed in order to receive advance salary."
          message={message}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default memo(KycCheckCard);
