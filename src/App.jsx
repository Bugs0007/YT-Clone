import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom"; // Fix: Import Route
import Home from "./Pages/Home/Home"; // Fix: Import Home
import Video from "./Pages/Video/Video";
import Sidebar from "./Components/Sidebar/Sidebar";

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:category/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
