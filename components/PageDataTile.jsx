import React from "react";
import { Text, View } from "react-native";
import { Icon } from "@react-native-material/core";
import { MenuPages } from "../styles";
import { TouchableOpacity } from "react-native";

export default PageDataTile = (props) => {
  return (
    <View style={MenuPages.menuView}>
      {props.tiles.map((tile, index) => {
        return (
          <TouchableOpacity style={MenuPages.titleView}>
            <Icon
              name={tile.icon}
              size={26}
              color={tile.color ? tile.color : "#4E46F1"}
            />
            <View style={MenuPages.subView}>
              <Text style={MenuPages.title}>{tile.title}</Text>
              <Text style={MenuPages.subTitle}>{tile.subtitle}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
