import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@react-native-material/core";
import { COLORS, FONTS } from "../constants/Theme";

export default BottomTabNav = (props) => {
  const bottomTab = createBottomTabNavigator();
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { ...FONTS.body5, marginBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home";
              break;
            case "Documents":
              iconName = focused ? "wysiwyg" : "wysiwyg";
              break;
            case "Benefits":
              iconName = focused ? "request-quote" : "request-quote";
              break;
            case "Banking":
              iconName = focused ? "money" : "money";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      {props.tabs.map((tab, index) => {
        return (
          <bottomTab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
          />
        );
      })}
    </bottomTab.Navigator>
  );
};
