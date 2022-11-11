import { useNavigation } from "@react-navigation/core";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { card } from "../styles";

const MessageCard = ({ title, message }) => {
  const navigation = useNavigation();

  return (
    <View style={card.alertCard}>
      <Text style={card.infoText}>
        {title}
        {"\n \n"}
      </Text>
      {message.map((item, index) =>
        item != null ? (
          <TouchableOpacity
            key={index}
            style={{
              borderRadius: 10,
              width: "100%",
              borderWidth: 0.5,
              marginTop: 10,
            }}
          >
            <Text
              style={card.alertText}
              onPress={() =>
                navigation.navigate("KYC", {
                  screen: item,
                })
              }
            >
              {item}
              {"\n"}
            </Text>
          </TouchableOpacity>
        ) : null
      )}
    </View>
  );
};

export default memo(MessageCard);
