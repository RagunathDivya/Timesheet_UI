import { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import {
  DesktopOutlined,
  SettingFilled,
  FieldTimeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import joy from "../Main_module/joy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

import { Config } from "./configuration/configs";
import { UserProfiles } from "./UserProfile/UserProfile";
const { Header, Content, Sider } = Layout;

export function UserProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  const navigate = useNavigate();
  function handleLogout() {
    window.history.replaceState(null, "", "/");
    navigate("/", { replace: true });
    localStorage.removeItem("token");
  }
  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };
  function UserDetails() {
    const userMenu = (
      <Menu>
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{ display: "flex", alignItems: "right", marginLeft: 400 }}>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Avatar
            style={{
              backgroundColor: "navy",
              cursor: "pointer",
              marginRight: 50,
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    );
  }
  return (
    <>
      <Layout style={{ minHeight: "100vh", position: "fixed" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(19, 19, 109, 0.3)",
            padding: 0,
          }}
        >
          <img
            style={{
              width: 68,
              display: "inline-block",
              marginLeft: 20,
              marginRight: 100,
              color: "white",
              filter: "saturate(100%)",
            }}
            src={joy}
          />
          <h1
            style={{
              color: "black",
              fontSize: 28,
              textAlign: "center",
              marginBottom: 10,
              marginTop: 2,
              fontFamily: "Roboto",
              marginLeft: 15,
              marginRight: 390, // Add margin to separate the image and text
            }}
          >
            𝐉𝐨𝐲 𝐈𝐓 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬
          </h1>
          <UserDetails />
        </Header>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{ marginTop: 0 }}
          >
            <div className="logo" />

            <Menu
              theme="dark"
              onClick={handleMenuClick}
              mode="inline"
              style={{ marginTop: 5 }}
              selectedKeys={selectedKeys}
            >
              <Menu.Item key="1" icon={<DesktopOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<SettingFilled />}>
                <Link to="/admin/configuration">Configuration</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FieldTimeOutlined />}>
                <Link to="/admin/timesheet_status">Timesheet Status</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<FontAwesomeIcon icon={faPeopleGroup} />}
              >
                <Link to="/admin/employees">Employees</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<FontAwesomeIcon icon={faIdCard} />}>
                <Link to="/admin/user_profile">User Profile</Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content
            style={{
              height: "calc(100vh )",
              overflow: "scroll",
              padding: "0% 3% 30% 2% ",
              background:
                "-webkit-linear-gradient(45deg,rgba(255, 192, 203, 0.7), rgba(135, 206, 235, 0.4) 100%)",
            }}
          >
           <UserProfiles/>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
