import React, { useState, useEffect } from "react";
import { Card, Statistic, Select, Button, message } from "antd";
import axios from "axios";

const { Option } = Select;

export function Dashboards() {
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("3");
  const [tableData, setTableData] = useState<{ x: any; y: any }[]>([]);

  const fetchData = async () => {
    const result = await axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: `/api/Admin/GetDashboard?year=${year}&Month_Id=${month}`,
    })
      .then((r: any) => {
        setTableData(r.data);
        console.log(r.data);
        message.success("Data fetched successfully");
      })
      .catch((error: any) => {
        message.error("Select year and month");
      });
  };

  useEffect(() => {
    fetchData();
  }, [year, month]);

  // const handleButtonClick = () => {
  //   fetchData();
  // };
  const handleYearChange = (value: any) => {
    setYear(value);
  };

  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  return (
    <div>
      <span></span>
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
      <span></span>
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
      {/* <Button onClick={handleButtonClick}>Submit</Button> */}
      <Card>
        <Statistic
          title="Pending Items"
          value={
            tableData.length > 0
              ? `${tableData[0].x}: ${tableData[0].y}`
              : "N/A"
          }
        />
      </Card>
    </div>
  );
}
