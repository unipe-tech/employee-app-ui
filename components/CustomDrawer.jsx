import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AntDesign } from "react-native-vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const imageData = useSelector((state) => state.profile.selfie);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#4E46F1" }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${imageData}`,
            }}
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              paddingTop: 10,
              fontWeight: "bold",
            }}
          >
            Kamal Goyal
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Pressable
        onPress={() => navigation.replace("Welcome")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <AntDesign name="logout" color="black" size={16} />
        <Text style={{ fontSize: 16, paddingLeft: 10 }}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default CustomDrawer;
