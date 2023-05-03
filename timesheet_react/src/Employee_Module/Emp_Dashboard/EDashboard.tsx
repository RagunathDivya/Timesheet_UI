import React, { useEffect, useState } from "react";
import "./EDashboard.css";
import {
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Input, Popover, Space } from "antd";
import { UserProfile } from "../../Admin_module/User_prof_layout";

const EDashboard = () => {
  const month_name = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState([]);
  const currentDate = new Date();

  const [state1, setState1] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  const month = currentDate.getMonth() - 1;
  const year = currentDate.getFullYear();
  const Day_list = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [sts, setsts] = useState([]);
  const toke = sessionStorage.getItem("token");
  const employee_Id = localStorage.getItem("Employee_Id");

  const clientdtl = async () => {
    const res = await axios(
      `/api/Employee/GetByDashboard?Employee_Id=${employee_Id}`,
      {
        headers: {
          Authorization: `Bearer ${toke}`,
        },
      }
    );
    setsts(res.data[0]);
  };
  useEffect(() => {
    clientdtl();
  }, []);

  const data: any = sts;
  if (sts == undefined) {
    return (
      <div style={{ marginLeft: -140 }}>
        <div style={{ marginTop: 130 }}>
          <h1
            id="xy"
            style={{
              color: "blue",
              fontSize: 40,
              marginLeft: 135,
              textShadow: "2px 2px pink",
            }}
          >
            <center>
              Timesheet {`${month_name[month]}`} - {year} status
            </center>
          </h1>
        </div>
        <br />
        <br />
        <br />
        <div>
        <div>
            <FrownOutlined
              // <CheckOutlined
              style={{
                marginTop: -90,
                marginLeft: 598,
                fontSize: 70,
                marginBottom: 6,
                color: "skyblue",
                //position: "fixed",
              }}
            />
          </div>
          {/* <CheckOutlined
             style={{
               marginTop: -90,
               marginLeft: 408,
               fontSize: 90,
               color: "green",
               marginBottom: -6,
               //position: "fixed",
             }}
           /> */}
        </div>
        <div style={{ marginLeft: 350 }}>
          <Space direction="horizontal">
            <Input
              //  style={{
              //    backgroundColor: "green",
              //    border: "2px solid black",
              //    height: "50px",
              //    textAlign: "center",
              //  }}
              value="Approved"
              readOnly
            />
            
            <Input
                style={{
                  backgroundColor: "skyblue",
                  border: "2px solid black",
                  height: "50px",
                  textAlign: "center",
                }}
                value="Pending"
                readOnly
              />
            <Input value="Rejected" readOnly />
          </Space>
        </div>
      </div>
    );
  } else {
    if (data.status == "Approved") {
      return (
        <div style={{ marginLeft: -140 }}>
          <div style={{ marginTop: 130 }}>
            <h1
              id="xy"
              style={{
                color: "blue",
                fontSize: 40,
                marginLeft: 135,
                textShadow: "2px 2px pink",
              }}
            >
              <center>
                Timesheet {`${month_name[month]}`} - {year} status
              </center>
            </h1>
          </div>
          <br />
          <br />
          <br />
          <div>
            <CheckOutlined
              style={{
                marginTop: -90,
                marginLeft: 408,
                fontSize: 90,
                color: "green",
                marginBottom: -6,
                //position: "fixed",
              }}
            />
          </div>
          <div style={{ marginLeft: 350 }}>
            <Space direction="horizontal">
              <Input
                style={{
                  backgroundColor: "green",
                  border: "2px solid black",
                  height: "50px",
                  textAlign: "center",
                }}
                value="Approved"
                readOnly
              />
              <Input value="Pending" readOnly />
              <Input value="Rejected" readOnly />
            </Space>
          </div>
        </div>
      );
    } else if (data.status == "Rejected") {
      return (
        <div style={{ marginLeft: -140 }}>
          <div style={{ marginTop: 130 }}>
            <h1
              id="xy"
              style={{
                color: "blue",
                fontSize: 40,
                marginLeft: 135,
                textShadow: "2px 2px pink",
              }}
            >
              <center>
                Timesheet {`${month_name[month]}`} - {year} status
              </center>
            </h1>
          </div>
          <br />
          <br />
          <br />
          <div>
            <CloseCircleOutlined
              style={{
                marginTop: -75,
                marginLeft: 800,
                fontSize: 60,
                marginBottom: 3,
                color: "red",
                //position: "fixed",
              }}
            />
          </div>
          <div style={{ marginLeft: 350 }}>
            <Space direction="horizontal">
              <Input value="Approved" readOnly />
              <Input value="Pending" readOnly />
              <Input
                style={{
                  backgroundColor: "red",
                  border: "2px solid black",
                  height: "50px",
                  textAlign: "center",
                }}
                value="Rejected"
                readOnly
              />
            </Space>
          </div>
        </div>
      );
    } else if(data.status == "Pending") {
      console.log("Status is pending or undefined:", data.status);
      return (
        <div style={{ marginLeft: -140 }}>
          <div style={{ marginTop: 130 }}>
            <h1
              id="xy"
              style={{
                color: "blue",
                fontSize: 40,
                marginLeft: 135,
                textShadow: "2px 2px pink",
              }}
            >
              <center>
                Timesheet {`${month_name[month]}`} - {year} status
              </center>
            </h1>
          </div>
          <br />
          <br />
          <br />
          <div>
            <FrownOutlined
              // <CheckOutlined
              style={{
                marginTop: -90,
                marginLeft: 598,
                fontSize: 70,
                marginBottom: 6,
                color: "skyblue",
                //position: "fixed",
              }}
            />
          </div>
          <div style={{ marginLeft: 350 }}>
            <Space direction="horizontal">
              <Input value="Approved" readOnly />
              <Input
                style={{
                  backgroundColor: "skyblue",
                  border: "2px solid black",
                  height: "50px",
                  textAlign: "center",
                }}
                value="Pending"
                readOnly
              />
              <Input value="Rejected" readOnly />
            </Space>
          </div>
        </div>
      );
    // } else if (data.status == undefined) {
    //   return (
    //     <div style={{ marginLeft: -140 }}>
    //       <div style={{ marginTop: 130 }}>
    //         {/* <h1 id="xy" style={{ color: 'lightskyblue', marginLeft: -65 }}><center>Timesheet {data.month} {data.year} status</center></h1> */}
    //         <h1
    //           id="xy"
    //           style={{
    //             color: "blue",
    //             fontSize: 40,
    //             marginLeft: 135,
    //             textShadow: "2px 2px pink",
    //           }}
    //         >
    //           <center>
    //           Timesheet {`${month_name[month]}`} - {year} status
    //           </center>
    //         </h1>
    //       </div>
    //       <br />
    //       <br />
    //       <br />
    //       <div>
    //         <FrownOutlined
    //           style={{
    //             marginTop: -90,
    //             marginLeft: 588,
    //             fontSize: 90,
    //             color: "skyblue",
    //             //position: "fixed",
    //           }}
    //         />
    //       </div>
    //       <div style={{ marginLeft: 350 }}>
    //         <Space direction="horizontal">
    //           <Input value="Approved" readOnly />
    //           <Input
    //             style={{
    //               backgroundColor: "skyblue",
    //               border: "2px solid black",
    //               height: "50px",
    //               textAlign: "center",
    //             }}
    //             value="Pending"
    //             readOnly
    //           />
    //           <Input value="Rejected" readOnly />
    //         </Space>
    //       </div>
    //     </div>
    //   );
    } else {
      return (
        <div style={{ marginLeft: -140 }}>
          <div style={{ marginTop: 130 }}>
            <h1
              id="xy"
              style={{
                color: "blue",
                fontSize: 40,
                marginLeft: 135,
                textShadow: "2px 2px pink",
              }}
            >
              <center>
                Timesheet {`${month_name[month]}`} - {year} status
              </center>
            </h1>
          </div>
          <br />
          <br />
          <br />
          <div>
            <FrownOutlined
              style={{
                marginTop: -90,
                marginLeft: 588,
                fontSize: 90,
                color: "skyblue",
                //position: "fixed",
              }}
            />
          </div>
          <div style={{ marginLeft: 350 }}>
            <Space direction="horizontal">
              <Input value="Approved" readOnly />
              <Input
                // style={{
                //   backgroundColor: "skyblue",
                //   border: "2px solid black",
                //   height: "50px",
                //   textAlign: "center",
                // }}
                value="Pending"
                readOnly
              />
              <Input value="Rejected" readOnly />
            </Space>
          </div>
        </div>
      );
    }
  }
};

export default EDashboard;