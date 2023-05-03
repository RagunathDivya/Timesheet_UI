import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from "victory";
import { useState, useEffect } from "react";
import { Card, Select, message } from "antd";
import axios from "axios";
const { Option } = Select;

export function Dashboards() {
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("4");
  const [tableData, setTableData] = useState<{ x: any; y: any }[]>([]);

  const [progressData, setProgressData] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchData = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: `/api/Admin/GetDashboard?year=${year}&Month_Id=${month}`,
    })
      .then((r: any) => {
        const data = r.data;
        setTableData(data);
        const pending = data.find((item: any) => item.x === "Pending")?.y || 0;
        const approved =
          data.find((item: any) => item.x === "Approved")?.y || 0;
        const rejected =
          data.find((item: any) => item.x === "Rejected")?.y || 0;
        setProgressData({ pending, approved, rejected });
        message.success("Data fetched successfully");
      })
      .catch((error: any) => {
        message.error("Select year and month");
      });
  };

  useEffect(() => {
    fetchData();
  }, [year, month]);

  const handleYearChange = (value: any) => {
    setYear(value);
  };

  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  const CustomLabel = (props: any) => {
    const { x, y, datum } = props;
    return (
      <g>
        <VictoryLabel
          x={x}
          y={y}
          textAnchor="middle"
          style={{ fontSize: 16, fontWeight: "bold", paddingTop: 20 }}
          dy={datum.y > 0 ? -5 : 20}
          text={`${datum.x}\n${datum.y}`}
        />
      </g>
    );
  };
  const months = [
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

  const monthName = months[parseInt(month) - 1];
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // width: "auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <Select
            placeholder="YEAR"
            value={year}
            onChange={handleYearChange}
            style={{ width: 200 }}
          >
            <Option value="2021">2021</Option>
            <Option value="2022">2022</Option>
            <Option value="2023">2023</Option>
          </Select>
          <Select
            placeholder="MONTH"
            value={month}
            onChange={handleMonthChange}
            style={{ width: 200 }}
          >
            <Option value="1">January</Option>
            <Option value="2">February</Option>
            <Option value="3">March</Option>
            <Option value="4">April</Option>
            <Option value="5">May</Option>
            <Option value="6">June</Option>
            <Option value="7">July</Option>
            <Option value="8">August</Option>
            <Option value="9">September</Option>
            <Option value="10">October</Option>
            <Option value="11">November</Option>
            <Option value="12">December</Option>
          </Select>
        </div>
        <div style={{ marginTop: 5, width: 400 }}>
          <Card
            style={{
              background:
                "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
            }}
          >
            <h2>
              Timesheet Status ({year} -{monthName} )
            </h2>
            {Object.values(progressData).some((value) => value > 0) ? (
              <>
                <VictoryBar
                  data={[
                    { x: "Pending", y: progressData.pending },
                    { x: "Approved", y: progressData.approved },
                    { x: "Rejected", y: progressData.rejected },
                  ]}
                  style={{
                    data: { fill: "#72b4eb" },
                    labels: { fill: "black", fontSize: 20, fontWeight: 700 },
                  }}
                  labels={({ datum }) => `${datum.x}\n${datum.y}`}
                  barWidth={50}
                  animate={{
                    duration: 5000,
                    easing: "bounce",
                  }}
                />
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 300,
                  fontWeight: 400,
                  marginTop: 80,
                  marginLeft: 90,
                }}
              >
                No Timesheets found
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
