import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@react-native-material/core";

/**
 * @param tabs -> Used for providing the tablist for the bottom tab navigation
 */

export default BottomTabNav = (props) => {
  const bottomTab = createBottomTabNavigator();
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
        tabBarActiveTintColor: "#4E46F1",
        tabBarInactiveTintColor: "#4E4E4F",
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
