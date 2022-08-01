import SideMenu from "react-native-side-menu";
import Home from "../Home";
import MenuContent from "./MenuContent";
import { useSelector } from "react-redux";
export default HomeMain = () => {
  const menu = <MenuContent/>;
  return (
    <SideMenu menu={menu} isOpen={useSelector((state) => state.navigation.drawerOpen)}>
      <Home />
    </SideMenu>
  );
};
