import { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";

//import LoginPage from "./LOGIN";
import { AdminDashboard } from "../Admin_module/dash_layout";
import { Configuration } from "../Admin_module/Config_layout";
import { EmployeeA } from "../Admin_module/Emp_layout";
import LoginPage from "./LOGIN";
import { ForgotPassword } from "./ForgotPasw";
import { UserProfile } from "../Admin_module/User_prof_layout";
import { TimesheetStatus } from "../Admin_module/TS_stats_Layout";
import { EmpDashboard } from "../Employee_Module/EmpDash_layout";
import { EmpTimesheet } from "../Employee_Module/Timesheet_layout";
import { TimeSheetSummary } from "../Employee_Module/TimesheetSummary_Layout";
import { HRContactInfo } from "../Employee_Module/HR_Contact_layout";
import { EUserProfile } from "../Employee_Module/EUser_prof_layout";

const { Header, Content, Sider } = Layout;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      {
        setIsAuthenticated(true);
      }
    } else {
      navigate("/");
      localStorage.removeItem("token");
    }
  }, [navigate]);
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);
  return (
    <Layout>
      <Content>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              "isAuthenticated" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route
            path="/employee"
            element={
              "isAuthenticated" ? <EmpDashboard /> : <Navigate to="/" replace />
            }
          />
        </Routes>

        {/*  admin routes   */}
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              "isAuthenticated" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/configuration"
            element={
              "isAuthenticated" ? (
                <Configuration />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/timesheet_status"
            element={
              "isAuthenticated" ? (
                <TimesheetStatus />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/employees"
            element={
              "isAuthenticated" ? <EmployeeA /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/admin/user_profile"
            element={
              "isAuthenticated" ? <UserProfile /> : <Navigate to="/" replace />
            }
          />
        </Routes>

        {/*  employee routes   */}
        <Routes>
          <Route
            path="/employee/dashboard"
            element={
              "isAuthenticated" ? <EmpDashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/employee/timesheet"
            element={
              "isAuthenticated" ? <EmpTimesheet /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/employee/timesheetsummary"
            element={
              "isAuthenticated" ? (
                <TimeSheetSummary />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/employee/hrcontact"
            element={
              "isAuthenticated" ? (
                <HRContactInfo />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/employee/userprofile"
            element={
              "isAuthenticated" ? <EUserProfile /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </Content>
    </Layout>
  );
};

const JoyTS = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

export default JoyTS;
