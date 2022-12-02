import { View, Text } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";

const DetailItem = ({ label, value, divider }) => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{ ...FONTS.body5, color: COLORS.gray, marginVertical: 3 }}>
        {label}
      </Text>
      {value == "Not Provided" ? (
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.black,
          }}
        >
          {value}
        </Text>
      ) : (
        <Text style={{ ...FONTS.h4 }}>{value}</Text>
      )}
      {divider && (
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "lightgray",
            marginTop: 10,
          }}
        />
      )}
    </View>
  );
};

export default DetailItem;
