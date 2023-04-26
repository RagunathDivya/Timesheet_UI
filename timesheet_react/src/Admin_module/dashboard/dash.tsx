import { useState, useEffect } from "react";
import { Card, Statistic, Select, message, Progress } from "antd";
import axios from "axios";
const { Option } = Select;

export function Dashboards() {
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("3");
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
  let valueStr = "";
  if (tableData.length > 0) {
    for (let i = 0; i < tableData.length; i++) {
      valueStr += `${tableData[i].x}: ${tableData[i].y}, `;
    }
    valueStr = valueStr.slice(0, -2);
  } else {
    valueStr = "N/A";
  }

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
        <Statistic title="Overall trend" value={valueStr} />
        <div style={{ marginTop: 30 }}>
          <label>Approved</label>
          <div style={{ width: 170 }}>
            <Progress
              percent={Math.round(
                (progressData.approved /
                  (progressData.approved +
                    progressData.rejected +
                    progressData.pending)) *
                  100
              )}
              size="small"
              format={() => `${progressData.approved}`}
            />
            <label>Pending</label>
            <Progress
              percent={Math.round(
                (progressData.pending /
                  (progressData.approved +
                    progressData.rejected +
                    progressData.pending)) *
                  100
              )}
              size="small"
              status="active"
              format={() => `${progressData.pending}`}
            />
            <label>Rejected</label>
            <Progress
              percent={Math.round(
                (progressData.rejected /
                  (progressData.approved +
                    progressData.rejected +
                    progressData.pending)) *
                  100
              )}
              size="small"
              status="exception"
              format={() => `${progressData.rejected}`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
