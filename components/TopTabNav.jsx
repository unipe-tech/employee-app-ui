import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function TopTabNav(props) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "white" },
        tabBarPressColor: "purple",
        animationEnabled: true,
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        lazy: true,
        tabBarIndicatorStyle: { backgroundColor: "#4E46F1" },
      }}
    >
      {props.tabs.map((tab, index) => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default TopTabNav;
