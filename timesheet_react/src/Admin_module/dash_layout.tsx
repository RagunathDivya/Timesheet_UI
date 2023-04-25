import { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu, message } from "antd";
import {
  DesktopOutlined,
  SettingFilled,
  FieldTimeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import joy from "../Main_module/joy.png";
import { Dashboards } from "./dashboard/dash";
import axios from "axios";

const { Header, Content, Sider } = Layout;

export function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  const [userProfile, setUserProfile] = useState<EmployeeData | null>(null);
  const mailId = localStorage.getItem("mailId");
  interface EmployeeData {
    employee_Name: string;
    designation: string;
    employee_ID: string;
    email: string;
    mobile_No: string;
  }
  useEffect(() => {
    if (mailId) {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        url: `/api/Employee/UserProfile?mail_id=${encodeURIComponent(mailId)}`,
      })
        .then((response: any) => {
          console.log(response);
          setUserProfile(response.data[0]);
          console.log(response.data);
        })
        .catch((error: any) => {
          message.error(error.message);
        });
    }
  }, [mailId]);
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };

  const navigate = useNavigate();
  function handleLogout() {
    window.history.replaceState(null, "", "/");
    navigate("/", { replace: true });
    localStorage.removeItem("token");
  }
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
            alt="JOY"
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
            <h1 style={{ fontSize: 30 }}>
              Hello {userProfile?.employee_Name} 😊
            </h1>
            <Dashboards />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
