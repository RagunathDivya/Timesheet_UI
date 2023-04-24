import { Button, Form, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ETimesheetsummary.css";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

const ETimeSummary = () => {
  const [tableData, setData] = useState<any[]>([]);
  const currentDate = new Date();
  const employee_Id = sessionStorage.getItem("Employee_Id");
  const month = currentDate.getMonth() - 1;
  const year = currentDate.getFullYear();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  const handleViewClick = (imagePathTimesheet: string) => {
    setPopupImageUrl(`/api/Employee/ImagePath?imagePath=${imagePathTimesheet}`);
    setShowPopup(true);
  };
  
  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupImageUrl("");
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    setModalImageUrl("");
  };
  // const handleViewClick = (imagePathTimesheet: string) => {
  //   setModalImageUrl(`/api/Employee/ImagePath?imagePath=${imagePathTimesheet}`);
  //   setShowModal(true);
  // };

  // const handleModalCancel = () => {
  //   setShowModal(false);
  //   setModalImageUrl("");
  // };
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
      dataIndex: "imagePathTimesheet",
      key: "imagePathTimesheet",
      render: (imagePathUpload: any) => {
        return (
          <div>
            <Form onFinish={() =>handleViewClick(imagePathUpload)}>
              <Button type="primary" htmlType="submit">View</Button>
            </Form>
          </div>
        );
      },
    },
      // {
      //   title: (
      //     <center>
      //       <b>Uploaded Image</b>
      //     </center>
      //   ),
      //   dataIndex: "imagePathTimesheet",
      //   key: "imagePathTimesheet",
      //   render: (imagePathTimesheet: any) => {
      //     return (
      //       <div>
      //         <Button type="primary" onClick={() => handleViewClick(imagePathTimesheet)}>
      //           View
      //         </Button>
      //         <Modal
      //           title="Timesheet Image"
      //           visible={showModal}
      //           onCancel={handleModalCancel}
      //           footer={[
      //             <Button key="back" onClick={handleModalCancel}>
      //               Close
      //             </Button>,
      //           ]}
      //         >
      //           <img src={modalImageUrl} alt="Example Image" />
      //         </Modal>
      //       </div>
      //     );
      //   },
      // },
    // {
    //   title: (
    //     <center>
    //       <b>Uploaded Image</b>
    //     </center>
    //   ),
    //   dataIndex: "imagePathUpload",
    //   key: "imagePathUpload",
    //   render: (imagePathTimesheet: any) => {
    //     return (
    //       <div>
    //         <Button type="primary" onClick={() => handleViewClick(imagePathTimesheet)}>
    //           View
    //         </Button>
    //         <Modal
    //           title="Timesheet Image"
    //           visible={showModal}
    //           onCancel={handleModalCancel}
    //           footer={[
    //             <Button key="back" onClick={handleModalCancel}>
    //               Close
    //             </Button>,
    //           ]}
    //         >
    //           <img src={modalImageUrl} alt="Example Image" />
    //         </Modal>
    //       </div>
    //     );
    //   },
    // },
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
      <h1 className="h1summary">Timesheet Summary</h1>
      <Table bordered columns={columns} dataSource={tableData}></Table>
    </div>
  );
};

export default ETimeSummary;
