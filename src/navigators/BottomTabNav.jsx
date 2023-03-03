import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONTS } from "../constants/Theme";
import HomeView from "../screens/06_home/HomeView";
import AccountStack from "./stacks/AccountStack";
import EWAStack from "./stacks/EWAStack";
import InvestStack from "./stacks/InvestStack";
import HomeFocused from "../assets/Home_G.svg";
import InvestFocused from "../assets/Invest_G.svg";
import MoneyFocused from "../assets/Money_G.svg";
import AccountFocused from "../assets/Account_G.svg";
import HomeOutlined from "../assets/Home.svg";
import InvestOutlined from "../assets/Invest_nav.svg";
import MoneyOutlined from "../assets/Money.svg";
import AccountOutlined from "../assets/Account.svg";

export default BottomTabNav = () => {
  const bottomTab = createBottomTabNavigator();
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Invest", component: InvestStack },
    // { name: "Benefits", component: Benefits },
    { name: "Money", component: EWAStack },
    { name: "Account", component: AccountStack },
  ];
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { ...FONTS.body5, marginBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              return focused ? <HomeFocused /> : <HomeOutlined />;
            case "Invest":
              return focused ? <InvestFocused /> : <InvestOutlined />;
            case "Money":
              return focused ? <MoneyFocused /> : <MoneyOutlined />;
            case "Account":
              return focused ? <AccountFocused /> : <AccountOutlined />;
          }
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      {tabs.map((tab, index) => {
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
