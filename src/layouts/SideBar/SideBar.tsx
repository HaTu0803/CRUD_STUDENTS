import React from "react";
import { Layout, Menu } from "antd";
import { Adminitems, DEFAULT_KEY } from "../menuItems";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;
const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
    style={{
      background: "white",
      // margin: '24px  0',
    }}
  >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[DEFAULT_KEY || location.pathname]}
        onClick={(item) => {
          navigate(item.key);
        }}
        style={{ marginTop: "24px" }}
        >
        {Adminitems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
