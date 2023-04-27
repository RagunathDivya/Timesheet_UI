import { Button, Card, Form, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ETimesheetsummary.css";
import { Buffer } from "buffer";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

const ETimeSummary = () => {
  const [tableData, setData] = useState<any[]>([]);
  const currentDate = new Date();
  const employee_Id = localStorage.getItem("Employee_Id");
  const month = currentDate.getMonth() - 1;
  const year = currentDate.getFullYear();
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [imgVisible, setImgVisible] = useState(false);
  const [imageData, setImageData] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleViewClick = (imagePathTimesheet: string) => {
    setPopupImageUrl(`/api/Employee/ImagePath?imagePath=${imagePathTimesheet}`);
    setShowPopup(true);
  };
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      setRowData(selectedRows);
    },
    selectedRowKeys,
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupImageUrl("");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalImageUrl("");
  };
  const [columns, setColumns] = useState([
    {
      title: (
        <center>
          <b>Column ID</b>
        </center>
      ),
      dataIndex: "id",
      key: "id",
      render: (value: any, item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: (
        <center>
          <b>Timesheet Month</b>
        </center>
      ),
      dataIndex: "month",
      key: "month",
    },
    {
      title: (
        <center>
          <b>No. of days worked</b>
        </center>
      ),
      dataIndex: "noOfdays_Worked",
      key: "noOfdays_Worked",
    },
    {
      title: (
        <center>
          <b>No. of leaves</b>
        </center>
      ),
      dataIndex: "noOfLeave_Taken",
      key: "noOfLeave_Taken",
    },
    {
      title: (
        <center>
          <b>Total Duration</b>
        </center>
      ),
      dataIndex: "total_Working_Hours",
      key: "total_Working_Hours",
    },
    {
      title: (
        <center>
          <b>Uploaded Image</b>
        </center>
      ),
      dataIndex: "imagePathUpload",
      key: "imagePathUpload",
      render: (imagePathUpload: any, record: any) => {
        console.log(record);
        return (
          <Button
            type="link"
            onClick={() => handleViewImage(record.imagePathUpload)}
          >
            View Image
          </Button>
        );
      },
    },
    {
      title: (
        <center>
          <b>Timesheet Image</b>
        </center>
      ),
      dataIndex: "imagePathTimesheet",
      key: "imagePathTimesheet",

      render: (imagePathTimesheet: any, record: any) => {
        console.log(record);
        return (
          <Button
            type="link"
            onClick={() => handleViewImage(record.imagePathTimesheet)}
          >
            View Image
          </Button>
        );
      },
    },
    {
      title: (
        <center>
          <b>Status</b>
        </center>
      ),
      dataIndex: "status",
      key: "status",
    },
  ]);
  const showImgModal = () => {
    setImgVisible(true);
  };

  const handleImgOk = () => {
    setImgVisible(false);
  };

  const handleImgCancel = () => {
    setImgVisible(false);
  };
  const handleViewImage = (imagePath: any) => {
    showImgModal();
    axios
      .get(
        `/api/Employee/ImagePath?imagePath=${encodeURIComponent(imagePath)}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const imageData = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setImageData(`data:image/png;base64,${imageData}`);
        console.log(imageData);
      })
      .catch((error) => console.log(error));
  };

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
      url: `/api/Employee/ViewTimeSheet?Employee_Id=${employee_Id}&year=${new Date().getFullYear()}`,
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
      <h1
        style={{
          fontSize: 25,
          background: "-webkit-linear-gradient(45deg, #09009f, #00ff95 20%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Timesheet Summary
      </h1>
      <Card
        style={{
          width: "100%",
          marginTop: 16,
          paddingTop: 35,
          //background: "rgba(235, 235, 235,0.6)",
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        }}
      >
        <Table bordered columns={columns} dataSource={tableData}></Table>
        <Modal
          open={imgVisible}
          onCancel={handleImgCancel}
          footer={null}
          width={850}
        >
          <img src={imageData} alt="Employee Image" style={{ width: 790 }} />
        </Modal>
      </Card>
    </div>
  );
};

export default ETimeSummary;
