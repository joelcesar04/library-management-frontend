import React, { useState } from "react";
import { Layout } from 'antd';
import Sidebar from "./Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }
  
  return (
    <>
      <Layout style={{minHeight: "100vh"}}>
        <Sidebar darkTheme={darkTheme} toggleTheme={toggleTheme} />
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}

export default App
