import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, Octicons } from "react-native-vector-icons";
import Placeholder from "../screens/06_home/Placeholder";
import Profile from "../screens/07_drawer/Profile";
import KYCScreen from "../screens/07_drawer/KYCScreen";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import SVGImg from "../assets/UnipeLogo.svg";
import { nav } from "../styles";
import { COLORS, FONTS } from "../constants/Theme";
import CustomDrawer from "./CustomDrawer";
import BottomTabNav from "./BottomTabNav";
import TopAppBar from "../components/molecules/TopAppBar";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      defaultStatus="closed"
      initialRouteName="DrawerHome"
      screenOptions={{
        itemStyle: { marginVertical: 5 },
        headerShown: true,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: "white",
        drawerLabelStyle: { ...FONTS.body4 },
        header: ({ navigation }) => (
          <AppBar
            title={<SVGImg />}
            centerTitle={true}
            contentContainerStyle={nav.navbar}
            color="#ffffff"
            leading={
              <IconButton
                icon={<Icon name="menu" size={30} />}
                onPress={() => {
                  console.log("Menu");
                  navigation.toggleDrawer();
                }}
              />
            }
            trailing={<IconButton icon={<Icon name="more-vert" size={30} />} />}
          />
        ),
      }}
    >
      <Drawer.Screen
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={20} />
          ),
          // headerShown: false,
          header: TopAppBar,
        }}
        name="DrawerHome"
        component={BottomTabNav}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={20} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "KYC",
          drawerIcon: ({ color }) => (
            <Octicons name="verified" color={color} size={20} />
          ),
        }}
        name="KYC"
        component={KYCScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={20} />
          ),
          headerShown: true,
        }}
        name="DrawerSettings"
        component={Placeholder}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
