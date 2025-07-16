import React, { useState } from "react";
import "./Home.css";
import Sidebar from "./../../Components/Sidebar/Sidebar";
import Feed from "./../../Components/Feed/Feed";

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <Feed sidebar={sidebar} category={category} />
    </>
  );
};

export default Home;
