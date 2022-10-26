import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";

import BottomTabNav from "../../navigators/BottomTabNav";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

import Benefits from "./Benefits/Benefits";
import Documents from "./Documents/Documents";
import EWA from "./Money/EWA/EWA";
import HomeView from "./HomeView";

const Home = () => {
  const dispatch = useDispatch();
  const tabs = [
    { name: "Home", component: HomeView },
    { name: "Documents", component: Documents },
    { name: "Benefits", component: Benefits },
    { name: "Money", component: EWA },
  ];

  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomTabNav tabs={tabs} />
    </SafeAreaView>
  );
};

export default Home;
