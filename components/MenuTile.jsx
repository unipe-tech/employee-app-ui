import React from "react";
import { Text, View } from "react-native";
import { Icon } from "@react-native-material/core";
import { Drawer } from "../styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
export default MenuTile = (props) => {
  const navigation = useNavigation();
  return (
    <View style={Drawer.menuView}>
      {props.tiles.map((tile, index) => {
        return (
          <TouchableOpacity
            style={Drawer.menuTitleView}
            onPress={() => {
              navigation.navigate(tile.page)
            }}
          >
            <Icon
              name={tile.icon}
              size={26}
              color={tile.color ? tile.color : "#4E46F1"}
            />
            <Text style={Drawer.menuTitle}>{tile.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
