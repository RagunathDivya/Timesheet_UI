import {
  Modal,
  Space,
  Table,
  Card,
  Popover,
  UploadProps,
  Upload,
  Form,
} from "antd";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Select, Input, Button, message, Layout } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import Duration from "./Duration";
import Status from "./Status";
import Project from "./Project";

const setMessage = (statusCode: number, responseMessage: string) => {
  if (statusCode == 200) {
    message.success(responseMessage);
  } else if (statusCode == 404) {
    message.error(responseMessage);
  } else if (statusCode == 400) {
    message.error(responseMessage);
  } else if (statusCode == 500) {
    message.error("Internal Server Error");
  } else {
    message.error(responseMessage);
  }
};
interface Project {
  value: number;
  label: string;
}

const dummyProject: Project[] = [];

const projectOption = async (): Promise<void> => {
  const toke = sessionStorage.token;
  const response = await axios.get("/api/Employee", {
    headers: {
      Authorization: `Bearer ${toke}`,
    },
  });
  response.data.forEach((element: any) => {
    dummyProject.push({
      value: element.project_Id,
      label: element.project_Name,
    });
    console.log(element.project_Id);
  });
};

function AddTimesheet() {
  const navigate = useNavigate();
  const navig = () => {
    navigate("/#");
  };
  const employee_Id = sessionStorage.getItem("Employee_Id");
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
  const { Sider } = Layout;
  const [selectedOption, setSelectedOption] = useState([]);
  const [excelNumber, setExcelNumber] = useState();
  const [state1, setState1] = useState<TimesheetSummary[]>([]);
  const [state2, setState2] = useState<TimesheetSummary[]>([]);
  const [state3, setState3] = useState<TimesheetSummary[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
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
  var singleRun = 1;
  useEffect(() => {
    if (singleRun === 1) {
      projectOption();
      // setSingleRun(!singleRun);
      singleRun = 2;
    }
  }, []);

  const noOfDays = new Date(year, month + 1, 0).getDate();
  interface DataObject {
    key: number;
    date: string;
    day: string;
    status: string;
    project: string;
    duration: number | null;
    count: number;
  }

  const [data, SetData] = useState<DataObject[]>([]);
  for (let i = 1; i <= noOfDays; i++) {
    data.push({
      key: i,
      date: format(new Date(year, month, i), "d"),
      day: Day_list[new Date(year, month, i).getDay()],
      status:
        Day_list[new Date(year, month, i).getDay()].toLowerCase() ===
          "saturday" ||
        Day_list[new Date(year, month, i).getDay()].toLowerCase() === "sunday"
          ? "Holiday"
          : "",
      project: "",
      duration: null,
      count: 2,
    });
  }

  const [currentState, setCurrentState] = useState(data);
  const [daysWorked, setDaysWorked] = useState(0);
  const [leavesTaken, setLeavesTaken] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDownload, setIsDownload] = useState(true);

  useEffect(() => {
    var count = 0;
    currentState.forEach((element) => {
      if (element.status === "") {
        count += 1;
      }
      if (element.project == "") {
        count += 1;
      }
      if (element.duration === 0 || element.duration === null) {
        count += 1;
      }
      if (
        (element.status === "Leave" || element.status === "Holiday") &&
        element.project === "" &&
        (element.duration === 0 || element.duration === null)
      ) {
        count -= 2;
      }
    });
    if (count === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [currentState]);

  useEffect(() => {
    calculateAttendance();
    calculateTotalDuration();
  }, [currentState]);

  const columns = [
    {
      key: "date",
      title: (
        <center>
          <h4>
            <b>Date</b>
          </h4>
        </center>
      ),
      dataIndex: "date",
    },
    {
      key: "day",
      title: (
        <center>
          <h4>
            <b>Day</b>
          </h4>
        </center>
      ),
      dataIndex: "day",
    },
    {
      key: "status",
      title: (
        <center>
          <h4>
            <b>Status</b>
          </h4>
        </center>
      ),
      dataIndex: "status",
      render: (_: any, record: any) => (
        <Status
          allRecord={currentState}
          defaultValue={record.status}
          row={record}
          onSaveData={saveCurrentState}
          onDeleteRow={onDeleteRow}
        />
      ),
    },
    {
      key: "project_Id",
      title: (
        <center>
          <h4>
            <b>Project</b>
          </h4>
        </center>
      ),
      dataIndex: "project_Id",
      render: (_: any, record: any) => (
        <div style={{ width: 200 }}>
          <Project
            ProjectOption={dummyProject}
            allRecord={currentState}
            row={record}
            onSaveData={saveCurrentState}
            setProject={setProject}
          />
        </div>
      ),
    },
    {
      key: "duration",
      title: (
        <center>
          <h4>
            <b>Duration</b>
          </h4>
        </center>
      ),
      dataIndex: "duration",
      render: (_: any, record: any) => (
        <React.Fragment>
          <Duration
            defaultValue={record.duration}
            row={record}
            allRecord={currentState}
            onSaveData={saveCurrentState}
          />
        </React.Fragment>
      ),
    },
    {
      key: "action",
      title: (
        <center>
          <h4>
            <b>Action</b>
          </h4>
        </center>
      ),
      render: (row: any) => (
        <>
          <Space>
            {row.key <= noOfDays ? (
              <Button
                type="primary"
                onClick={() => onAddProject(row)}
                style={{ backgroundColor: "orange" }}
                disabled={
                  row.status.toLowerCase() === "leave" ||
                  row.status.toLowerCase() === "holiday" ||
                  row.count === 0
                    ? true
                    : false
                }
              >
                <PlusCircleOutlined />
                Add Project
              </Button>
            ) : (
              <Button
                danger
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => onDeleteRow(row)}
                disabled={
                  row.status.toLowerCase() === "leave" ||
                  row.status.toLowerCase() === "holiday"
                    ? true
                    : false
                }
              >
                <DeleteOutlined />
                Delete
              </Button>
            )}
          </Space>
        </>
      ),
    },
  ];
  const columns_summary = [
    {
      key: "summary_date",
      title: (
        <h4>
          <b>Date</b>
        </h4>
      ),
      render: () => (
        <Input value={format(new Date(), "dd-MM-yyyy")} readOnly={true} />
      ),
    },
    {
      key: "no_of_days_worked",
      title: (
        <h4>
          <b>No of Days Worked</b>
        </h4>
      ),
      dataIndex: "no_of_days_worked",
    },
    {
      key: "no_of_leaves_taken",
      title: (
        <h4>
          <b>No of Leaves Taken</b>
        </h4>
      ),
      dataIndex: "no_of_leaves_taken",
    },
    {
      key: "no_of_leaves_taken",
      title: (
        <h4>
          <b>Total Duration(hrs)</b>
        </h4>
      ),
      dataIndex: "total_duration",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveCurrentState = (newRecord: any) => {
    const presentState = [...newRecord];
    setCurrentState(presentState);
  };
  const summary_data = [
    {
      key: "summary_data1",
      no_of_days_worked: daysWorked,
      no_of_leaves_taken: leavesTaken,
      total_duration: totalDuration,
    },
  ];

  const onAddProject = (row: DataObject) => {
    const filteredColumn = currentState.filter(
      (a: DataObject) => a.key === row.key
    )[0];
    filteredColumn.count -= 1;

    const newRecord: DataObject = {
      key: Math.random() + 100,
      date: row.date,
      day: row.day,
      status:
        row.status === ""
          ? row.day.toLowerCase() === "saturday" ||
            row.day.toLowerCase() === "sunday"
            ? "Holiday"
            : ""
          : row.status,
      project: row.project,
      duration: Number(0),
      count: 0, // Add the count property to the new record
    };

    const newState = [...currentState];
    const index = currentState.indexOf(row);
    newState.splice(index + 1, 0, newRecord);
    setCurrentState(newState);
  };

  const onDeleteRow = (row: DataObject) => {
    const filteredColumn = currentState.filter(
      (a: DataObject) => a.date == row.date
    )[0];
    filteredColumn.count += 1;
    const record = [...currentState];
    const index = record.indexOf(row);
    record.splice(index, 1);
    setCurrentState(record);
  };

  const calculateAttendance = () => {
    const newCopy = [...currentState];
    var leave = 0,
      worked = 0;
    newCopy.forEach((element) => {
      if (element.status.toLowerCase() === "leave" && element.key < 100) {
        leave++;
      }
      if (
        (element.status.toLowerCase() === "present" ||
          element.status.toLowerCase() === "wfh") &&
        element.key < 100
      ) {
        worked++;
      }
    });
    setLeavesTaken(leave);
    setDaysWorked(worked);
  };

  const calculateTotalDuration = () => {
    let totalHrs = 0;
    currentState.forEach((element) => {
      if (element.duration !== null && element.duration > 0) {
        totalHrs += Number(element.duration);
      }
    });
    setTotalDuration(Number(totalHrs));
  };
  const downloadXL1 = async () => {
    await axios({
      ///api/Employee/ExportExcel?id=15&monthid=3&year=4321&project_id=12
      url: `/api/Employee/ExportExcel?id=${employee_Id}&monthid=${
        month + 2
      }year=${year}&project_id=${excelNumber}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Timeheet.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const downloadXL2 = async () => {
    await axios({
      //  url: `https://timesheetjy.azurewebsites.net/api/Employee/ExportExcel?id=${1}&monthid=${month + 1}&year=${year}&project_id=${state2[0].project_Id}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Timeheet.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const downloadXL3 = async () => {
    await axios({
      url: `/api/Employee/ExportExcel?id=${employee_Id}&monthid=${
        month + 2
      }&year=${year}&project_id=${excelNumber}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Timeheet.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  const showModal1 = () => {
    setModal(true);
  };
  const handleOk1 = () => {
    setModal(false);
  };
  const handleCancel1 = () => {
    setModal(false);
  };

  interface TimesheetSummary {
    timesheet_summary_Id: number;
    project_Id: number;
    date: Date;
    day: string;
    leave: boolean;
    duration_in_Hrs: number;
  }
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleFileChange1 = (a: any) => {
    setFile1(a.target.files[0]);
  };

  const postData = async (values: any) => {
    let date: Date | null = null;

    let count = 0;

    const newState: TimesheetSummary[] = [];
    const newState1: TimesheetSummary[] = [];
    const newState2: TimesheetSummary[] = [];
    const dummystate: TimesheetSummary[] = [];

    currentState.forEach((element: any) => {
      dummystate.push({
        // project_Id: element.project,
        project_Id:
          element.status.toLowerCase() === "present" ||
          element.status.toLowerCase() === "wfh"
            ? element.project
            : project,
        date: element.date,
        day: element.day,
        leave:
          element.status.toLowerCase() === "leave" ||
          element.status.toLowerCase() === "holiday"
            ? true
            : false,
        // duration_in_Hrs: element.duration === null ? parseInt(0) : parseInt(element.duration),
        duration_in_Hrs:
          element.status.toLowerCase() === "present" ||
          element.status.toLowerCase() === "wfh"
            ? element.duration
            : 0,
        timesheet_summary_Id: 0,
      });
      if (date != element.date) {
        newState.push({
          // project_Id: element.project,
          project_Id:
            element.status.toLowerCase() === "present" ||
            element.status.toLowerCase() === "wfh"
              ? element.project
              : 0,
          date: element.date,
          day: element.day,
          leave:
            element.status.toLowerCase() === "leave" ||
            element.status.toLowerCase() === "holiday"
              ? true
              : false,
          // duration_in_Hrs: element.duration === null ? parseInt(0) : parseInt(element.duration),
          duration_in_Hrs:
            element.status.toLowerCase() === "present" ||
            element.status.toLowerCase() === "wfh"
              ? element.duration
              : 0,
          timesheet_summary_Id: 0,
        });
        date = element.date;
        count = 1;
        return;
      }
      if (date == element.date && count === 1) {
        newState1.push({
          // project_Id: element.project,
          project_Id:
            element.status.toLowerCase() === "present" ||
            element.status.toLowerCase() === "wfh"
              ? element.project
              : 0,
          date: element.date,
          day: element.day,
          leave:
            element.status.toLowerCase() === "leave" ||
            element.status.toLowerCase() === "holiday"
              ? true
              : false,
          // duration_in_Hrs: element.duration === null ? parseInt(0) : parseInt(element.duration),
          duration_in_Hrs:
            element.status.toLowerCase() === "present" ||
            element.status.toLowerCase() === "wfh"
              ? element.duration
              : 0,
          timesheet_summary_Id: 0,
        });
        date = element.date;
        count = 2;
        return;
      }
      if (date == element.date && count == 2) {
        newState2.push({
          // project_Id: element.project,
          project_Id:
            element.status.toLowerCase() === "present" ||
            element.status.toLowerCase() === "wfh"
              ? element.project
              : 0,
          date: element.date,
          day: element.day,
          leave:
            element.status.toLowerCase() === "leave" ||
            element.status.toLowerCase() === "holiday"
              ? true
              : false,
          // duration_in_Hrs: element.duration === null ? parseInt(0) : parseInt(element.duration),
          duration_in_Hrs:
            element.status.toLowerCase() === "present" ||
            element.status.toLowerCase() === "wfh"
              ? element.duration
              : 0,
          timesheet_summary_Id: 0,
        });
        date = element.date;
        return;
      }
    });

    setState1(newState);
    setState2(newState1);
    setState3(newState2);

    const uploadFiles = async () => {
      const formData = new FormData();
      formData.append("image", file as File);
      const {
        data: { imagePath },
      } = await axios.post("/api/Employee/Image", formData);

      const formData1 = new FormData();
      formData1.append("Image", file1 as File);
      const {
        data: { imagePath: imagePath1 },
      } = await axios.post("/api/Employee/Image", formData1);

      return { imagePath, imagePath1 };
    };

    const dataToSave = async () => {
      const { imagePath, imagePath1 } = await uploadFiles();
      console.log(imagePath, imagePath1);
      return {
        employee_Id: employee_Id,
        noOfdays_Worked: summary_data[0].no_of_days_worked,
        noOfLeave_Taken: summary_data[0].no_of_leaves_taken,
        total_Working_Hours: summary_data[0].total_duration,
        imagePathUpload: imagePath,
        imagePathTimesheet: imagePath1,
        addTimesheetDay: dummystate,
      };
    };
    const dataToSaveObj = await dataToSave();
    await axios({
      method: "post",
      url: "/api/Employee/AddTimesheet",
      data: dataToSaveObj,
    })
      .then(async (r: any) => {
        setMessage(r.request.status, " Timesheet Added Successfully");
        var toke = sessionStorage.token;
        var data = await axios.get(
          `https://timesheetjy.azurewebsites.net/api/Employee/GetProjects?month=${
            month + 1
          }&year=${year}&emp_id=${employee_Id}`,
          {
            headers: {
              Authorization: `Bearer ${toke}`,
            },
          }
        );
        // setSelectedOption(data.data);
        var projectIds = data.data;
        var index = projectIds.indexOf(project);
        projectIds.splice(index, 1);
        setSelectedOption(projectIds);
        debugger;
      })
      .catch((error) => {
        setMessage(error.response.status, "Employee Id Alredy Exists");
      });
  };

  const excelDownload = (value: any) => {
    setIsDownload(false);
    setExcelNumber(value);
    debugger;
  };

  function setFiles(arg0: never[]) {
    throw new Error("Function not implemented.");
  }

  return (
    <Space>
      <Card style={{ marginLeft: 75 }}>
        <h1
          style={{
            fontSize: 30,
            color: "blue",
            fontFamily: "Times New Roman, Times, serif",
            marginLeft: -600,
          }}
        >
          <b>{`${month_name[month]}`}-2023 </b>
        </h1>
        <br></br>
        <React.Fragment>
          <div style={{ position: "relative", left: 200, top: -40 }}>
            <Space>
              {/* <Upload {...props}>
                <Button  name="imagePathUpload" icon={<UploadOutlined />} >
                Approval Image
                </Button> 
              </Upload> */}
              {/* <Upload {...props}> */}
              {/* <Button onClick={handleFileChange} icon={<UploadOutlined />} name= "imagePathTimesheet" >
                Approval Image
                </Button>  */}
              {/* </Upload> */}
              <input
                placeholder="Timesheet Image"
                name="imagePathUpload"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />

              <input
                placeholder="Approval Image"
                name="imagePathTimesheet"
                type="file"
                onChange={handleFileChange1}
                accept="image/*"
              />
            </Space>
          </div>

          <div style={{ paddingLeft: "200px" }}>
            <Space>
              {state1.length > 1 ? (
                <Button type="primary" onClick={downloadXL3}>
                  <DownloadOutlined /> Download XL1
                </Button>
              ) : (
                ""
              )}
              {state2.length > 1 ? (
                <Button type="primary" onClick={downloadXL2}>
                  <DownloadOutlined /> Download XL2
                </Button>
              ) : (
                ""
              )}
              {state3.length > 1 ? (
                <Button type="primary" onClick={downloadXL3}>
                  <DownloadOutlined /> Download XL3
                </Button>
              ) : (
                ""
              )}
            </Space>
          </div>

          <div style={{ paddingLeft: "60%" }}>
            <Select
              disabled={isDisabled}
              style={{ width: 200 }}
              onChange={(value) => excelDownload(value)}
            >
              {selectedOption.map((element: any) => (
                <Select.Option value={element.project_Id}>
                  {element.project_Name}
                </Select.Option>
              ))}
            </Select>
            <Button disabled={isDownload} onClick={downloadXL3}>
              Download Excel
            </Button>
          </div>

          <Table
            columns={columns_summary}
            dataSource={summary_data}
            pagination={false}
          />
          <Table
            bordered
            columns={columns}
            dataSource={currentState}
            pagination={false}
          />
          <div style={{ paddingLeft: "85%", paddingTop: 10 }}>
            <Form layout="vertical" onFinish={postData}>
              <Button type="primary" htmlType="submit" disabled={isDisabled}>
                Submit
              </Button>
            </Form>
          </div>
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                onClick={() => {
                  setFiles([]);
                  setIsModalVisible(!isModalVisible);
                }}
                danger
              >
                cancel
              </Button>,
            ]}
          ></Modal>

          <Modal
            visible={modal}
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={[
              <Button danger onClick={handleCancel1}>
                Cancel
              </Button>,
            ]}
          >
            {/* <UploadApTimesheet /> */}
          </Modal>
        </React.Fragment>
      </Card>
      {/* <Popover content="Logout">
        <Button
          style={{ width: "5em", backgroundColor: "#f77c7c", marginTop: "5%" }}
        >
          <LogoutOutlined onClick={navig} />
        </Button>
      </Popover> */}
    </Space>
  );
}

export default AddTimesheet;
