import { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from "../constants/Theme";
import { bankform, ewa } from "../styles"

const CollapsibleCard = ({
  title,
  TitleIcon,
  data,
  isClosed,
  info,
  Component,
  ComponentProps,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isClosed);
  return (
    <View style={ewa.loanCard}>
      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}>{title}</Text>
          {TitleIcon ? <TitleIcon /> : null}
        </View>
        <Icon
          name={
            isCollapsed
              ? "arrow-down-drop-circle-outline"
              : "arrow-up-drop-circle-outline"
          }
          size={24}
          color={COLORS.primary}
          style={{ marginLeft: "auto" }}
          onPress={() => setIsCollapsed(!isCollapsed)}
        />
      </View>
      <Collapsible collapsed={isCollapsed}>
        {Component ? <Component {...ComponentProps} /> : null}
        {data?.map((item, index) => (
          <View
            style={{ flexDirection: "row", width: "100%", marginTop: 5 }}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <Text>{item.subTitle}</Text>
            <Text style={{ marginLeft: "auto", fontSize: 14 }}>
              {item.value}
            </Text>
          </View>
        ))}
        {info ? (
          <Text style={{ marginTop: 10 }}>
            <Text style={bankform.asterisk}>*</Text>
            {info}
          </Text>
        ) : (
          <View style={ewa.padding} />
        )}
      </Collapsible>
    </View>
  );
};

export default CollapsibleCard;
