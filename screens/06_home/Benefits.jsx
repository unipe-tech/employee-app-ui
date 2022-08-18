import React from "react";
import TopTabNav from "../../components/TopTabNav";
import HomeView from "./HomeView";
import ESICForm from "./ESIC/ESICForm";

function Benefits() {
  const tabs = [
    { name: "EPFO", component: HomeView },
    { name: "ESIC", component: ESICForm },
  ];
  return <TopTabNav tabs={tabs} />;
}

export default Benefits;
