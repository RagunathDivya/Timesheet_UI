import { Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import "./EHrContactInfo.css";

const Hrinfo = () => {
  const [tableData, setData] = useState([]);
  const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(5);

  const columns: any = [
    {
      title: (
        <center>
          <b>Column ID</b>
        </center>
      ),
      dataIndex: "id",
       key: "id",
      render: (value: any, item: any, index: any) =>(page - 1) * pageSize + index + 1,
    },
    {
      title: (
        <center>
          <b>Name</b>
        </center>
      ),
      dataIndex: "first_Name",
      key: "first_Name",
    },
    {
      title: (
        <center>
          <b>Mail_ID</b>
        </center>
      ),
      dataIndex: "hr_Email_Id",
      key: "hr_Email_Id",
    },
    {
      title: (
        <center>
          <b>Contact_No</b>
        </center>
      ),
      dataIndex: "hr_Contact_No",
      key: "hr_Contact_No",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url:"/api/Admin/GetAllHrContacts",
    })
      .then((r: any) => {
        console.log(r.data);
        setData(r.data);
        message.success("Data is loaded");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };
  return (
    <div>
      <h1 className="h1hrinfo">HR Contact Info</h1>
      <Table bordered columns={columns} dataSource={tableData} pagination={false}></Table>
    </div>
  );
};

export default Hrinfo;
