import { Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function TS_Status() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [yearData, setYearData] = useState(Array<any>);
  const [monthData, setMonthData] = useState(Array<any>);
  const [empData, setEmpData] = useState(Array<any>);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [page, setPage]: any = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const yearCols = [
    {
      title: "Sl.No",
      dataIndex: "id",
      key: "ids",
      render: (value: any, item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    { title: "Year", dataIndex: "year", key: "year" },
  ];

  const YearData = async () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Admin/GetTimeSheetStatus",
    })
      .then((r: any) => {
        setYearData(r.data);
        //setYear(r.data[0].year);
        message.success("Data fetched successfully");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  useEffect(() => {
    YearData();
  }, []);

  const monthCols = [
    {
      title: "Sl.No",
      dataIndex: "id",
      key: "ids",
      render: (value: any, item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    { title: "Timesheet", dataIndex: "month", key: "month" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "status count", dataIndex: "statuscount", key: "statuscount" },
  ];
  const MonthData = async () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: `/api/Admin/GetTimeSheetStatusStatusByYear?year=${year}`,
    })
      .then((r: any) => {
        setMonthData(r.data);
        // setMonth(r.data[0].monthID);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    MonthData();
  }, [year]);

  const empCols = [
    {
      title: "Sl.No",
      dataIndex: "id",
      key: "ids",
      render: (value: any, item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    { title: "Employee Id", dataIndex: "employee_Id", key: "employee_Id" },
    { title: "Employee Name", dataIndex: "full_Name", key: "full_Name" },
    {
      title: "Employee Type",
      dataIndex: "employee_Type",
      key: "employee_Type",
    },
    {
      title: "No. of days worked",
      dataIndex: "noOfDaysWorked",
      key: "noOfDaysWorked",
    },
    {
      title: "No. of leave taken",
      dataIndex: "noOfLeaveTaken",
      key: "noOfLeaveTaken",
    },
    {
      title: "Hours worked",
      dataIndex: "total_Hours",
      key: "total_Hours",
    },
    {
      title: "Email",
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: "Reporting Manager",
      dataIndex: "reporting_Manager",
      key: "reporting_Manager",
    },
    {
      title: "Timesheet status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const EmpData = async () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: `/api/Admin/GetTimeSheetStatusStatusByMonth?Month_id=${month}&Year=${year}`,
    })
      .then((r: any) => {
        setEmpData(r.data);
      })
      .catch((error: any) => {
        // message.error(error.message);
      });
  };

  useEffect(() => {
    EmpData();
  }, [[year, month]]);
  // Render the year table
  const renderYearTable = () => {
    return (
      <Table
        dataSource={yearData}
        columns={yearCols}
        pagination={false}
        onRow={(record: any) => ({
          onClick: () => {
            setSelectedYear(record.year);
            setYear(record.year);
          },
        })}
      />
    );
  };

  // Render the month table for the selected year
  const renderMonthTable = () => {
    // const filteredMonthData = monthData.filter((month) =>
    //   month.month.includes(selectedYear)
    // );
    return (
      <Table
        dataSource={monthData}
        columns={monthCols}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            setSelectedMonth(record.month);
            setMonth(record.monthID);
          },
        })}
      />
    );
  };

  // Render the employee table for the selected month
  const renderEmployeeTable = () => {
    // const filteredEmployeeData = empData.filter(
    //   (employee) => employee.timesheetStatus === selectedMonth
    // );
    return <Table dataSource={empData} columns={empCols} pagination={false} />;
  };
  return (
    <>
      <div>
        <h2>Timesheet Status</h2>
        {renderYearTable()}
        {selectedYear && (
          <>
            <h2>Timesheet Status ({selectedYear})</h2>
            {renderMonthTable()}
          </>
        )}
        {selectedMonth && (
          <>
            <h2>
              Timesheet Status ({selectedMonth} -{selectedYear} )
            </h2>
            {renderEmployeeTable()}
          </>
        )}
      </div>
    </>
  );
}
