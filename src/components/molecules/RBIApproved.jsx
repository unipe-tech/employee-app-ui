import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import Shield from "../../assets/Shield.svg";
import RBI from "../../assets/RBI.svg";

const RBIApproved = () => {
    return (
        <>
            <View
                style={{
                padding: 10,
                backgroundColor: COLORS.lightGray,
                marginVertical: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                }}
            >
            <Text
                style={{
                    ...FONTS.body4,
                    color: COLORS.gray,
                    marginBottom: 5,
                    textAlign: "center",
                }}
                >
                Mandate is required to auto-debit loan payments on Due Date. This
                is 100% secure and executed by an RBI approved entity.
            </Text>
            </View>
            <View
                style={{
                flexDirection: "row",
                width: "100%",
                padding: 10,
                justifyContent: "space-evenly",
                alignItems: "center",
                }}
            >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Shield />
                <Text
                    style={{ ...FONTS.body4, color: COLORS.gray, marginTop: 5 }}
                >
                    100% Secure
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <RBI />
                <Text
                    style={{ ...FONTS.body4, color: COLORS.gray, marginTop: 5 }}
                >
                    RBI Approved
                </Text>
            </View>
        </View>
    </>
    );
}

export default RBIApproved;
