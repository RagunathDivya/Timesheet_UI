import { UserOutlined } from "@ant-design/icons";
import { Card, message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

export function EuserPro() {
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 50,
        paddingBottom: 50,
        marginTop: 50,
        background:
          "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        borderRadius: 10,
      }}
    >
      <Card
        style={{
          fontWeight: 500,
          width: 400,
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.4), rgba(0, 255, 149, 0.4) 55%)",
          boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.9)",
          textAlign: "left",
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: 20, textAlign: "center" }}>
          <UserOutlined /> User Profile
        </h1>
        <div style={{ justifyContent: "center", marginLeft: 60 }}>
          <p>
            <strong style={{ width: 120, paddingRight: 100 }}>User ID:</strong>
            {userProfile?.employee_ID}
          </p>
          <p>
            <strong style={{ width: 120, paddingRight: 50 }}>User Name:</strong>
            {userProfile?.employee_Name}
          </p>
          <p>
            <strong style={{ width: 120, paddingRight: 45 }}>
              Designation:
            </strong>
            {userProfile?.designation}
          </p>
          <p>
            <strong style={{ width: 120, paddingRight: 85 }}>Email:</strong>{" "}
            {userProfile?.email}
          </p>
          <p>
            <strong style={{ width: 120, paddingRight: 25 }}>
              Mobile Number:
            </strong>
            {userProfile?.mobile_No}
          </p>
        </div>
      </Card>
    </div>
  );
}
