import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
  message,
} from "antd";
import axios from "axios";
import TabPane from "antd/es/tabs/TabPane";
import moment from "moment";
import { EditFilled, SearchOutlined } from "@ant-design/icons";
import {
  AddClient,
  AddDesignation,
  AddEmpType,
  AddHrInfo,
  AddProject,
} from "./Add_configs";
import {
  EditClient,
  EditDesignation,
  EditEmpType,
  EditHrInfo,
  EditProject,
} from "./Edit_configs";

export function Config() {
  const [tableData, setTableData] = useState(Array<any>);
  const [selectedTab, setSelectedTab] = useState("GetClientIsActive");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [page, setPage]: any = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageSizeOptions = [3, 5, 10, 20];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(true);
  const [clientData, setClientData] = useState();
  const [desigData, setDesigData] = useState();
  // Tabel columns
  const tableColumns: any = {
    GetClientIsActive: [
      {
        title: "Sl.No",
        dataIndex: "id",
        key: "ids",
        render: (value: any, item: any, index: any) =>
          (page - 1) * pageSize + index + 1,
        align: "center",
      },
      {
        key: "client_Id",
        title: "Client ID",
        dataIndex: "client_Id",
        align: "center",
      },
      {
        key: "client_Name",
        title: "Client",
        dataIndex: "client_Name",
        align: "center",
      },
      {
        key: "no_Of_Employees",
        title: "No. of Employees",
        dataIndex: "no_Of_Employees",
        align: "center",
      },
      {
        title: "",
        key: "edit",
        render: (c: any) => {
          return (
            <div
              hidden={
                c.client_Id == selectedRowKeys[0] && rowData.length == 1
                  ? false
                  : true
              }
            >
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  background:
                    "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <EditFilled />
              </Button>
            </div>
          );
        },
        align: "center",
      },
    ],
    GetProjectIsActive: [
      {
        title: "Sl.No",
        dataIndex: "id",
        key: "ids",
        render: (value: any, item: any, index: any) =>
          (page - 1) * pageSize + index + 1,
        align: "center",
      },
      {
        key: "project_Id",
        title: "Project Id",
        dataIndex: "project_Id",
        align: "center",
      },
      {
        key: "project_Code",
        title: "Project code",
        dataIndex: "project_Code",
        align: "center",
      },
      {
        key: "project_Name",
        title: "Project Name",
        dataIndex: "project_Name",
        align: "center",
      },
      {
        key: "no_Of_Employees",
        title: "No. of Employees",
        dataIndex: "no_Of_Employees",
        align: "center",
      },
      {
        key: "project_Start_Date",
        title: "Start date",
        dataIndex: "project_Start_Date",
        render: (project_Start_Date: any) =>
          moment(project_Start_Date).format("DD-MM-YYYY"),
        align: "center",
      },
      {
        key: "project_End_Date",
        title: "End date",
        dataIndex: "project_End_Date",
        render: (project_End_Date: any) =>
          moment(project_End_Date).format("DD-MM-YYYY"),
        align: "center",
      },
      {
        title: "",
        key: "edit",
        render: (c: any) => {
          return (
            <div
              hidden={
                c.project_Code == selectedRowKeys[0] && rowData.length == 1
                  ? false
                  : true
              }
            >
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  background:
                    "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <EditFilled />
              </Button>
            </div>
          );
        },
        align: "center",
      },
    ],
    GetDesignationIsActive: [
      {
        title: "Sl.No",
        dataIndex: "id",
        key: "ids",
        render: (value: any, item: any, index: any) =>
          (page - 1) * pageSize + index + 1,
        align: "center",
      },
      {
        key: "designation_Id",
        title: "Designation ID",
        dataIndex: "designation_Id",
        align: "center",
      },
      {
        key: "designation",
        title: "Desigations",
        dataIndex: "designation",
        align: "center",
      },
      {
        key: "no_of_Employees",
        title: "No. of Employees",
        dataIndex: "no_of_Employees",
        align: "center",
      },
      {
        title: "",
        key: "edit",
        render: (c: any) => {
          return (
            <div
              hidden={
                c.designation_Id == selectedRowKeys[0] && rowData.length == 1
                  ? false
                  : true
              }
            >
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  background:
                    "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <EditFilled />
              </Button>
            </div>
          );
        },
        align: "center",
      },
    ],
    GetEmployeeTypeIsActive: [
      {
        title: "Sl.No",
        dataIndex: "",
        key: "ids",
        render: (value: any, item: any, index: any) =>
          (page - 1) * pageSize + index + 1,
        align: "center",
      },
      {
        key: "employee_Type_Id",
        title: "ID",
        dataIndex: "employee_Type_Id",
        align: "center",
      },
      {
        key: "employee_Type",
        title: "Employee Type",
        dataIndex: "employee_Type",
        align: "center",
      },
      {
        key: "no_of_Employees",
        title: "No. of Employees",
        dataIndex: "no_of_Employees",
        align: "center",
      },
      {
        title: "",
        key: "edit",
        render: (c: any) => {
          return (
            <div
              hidden={
                c.employee_Type_Id == selectedRowKeys[0] && rowData.length == 1
                  ? false
                  : true
              }
            >
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  background:
                    "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <EditFilled />
              </Button>
            </div>
          );
        },
        align: "center",
      },
    ],
    GetHrContactInfoIsActive: [
      {
        title: "Sl.No",
        dataIndex: "id",
        key: "ids",
        render: (value: any, item: any, index: any) =>
          (page - 1) * pageSize + index + 1,
        align: "center",
      },
      {
        key: "hr_Contact_Id",
        title: "ID",
        dataIndex: "hr_Contact_Id",
        align: "center",
      },
      {
        key: "hr_Name",
        title: "First Name",
        dataIndex: "hr_Name",
        align: "center",
      },

      {
        key: "hr_Email_Id",
        title: "Email",
        dataIndex: "hr_Email_Id",
        align: "center",
      },

      {
        key: "hr_Contact_No",
        title: "Contact",
        dataIndex: "hr_Contact_No",
        align: "center",
      },
      {
        title: "",
        key: "edit",
        render: (c: any) => {
          return (
            <div
              hidden={
                c.hr_Contact_Id == selectedRowKeys[0] && rowData.length == 1
                  ? false
                  : true
              }
            >
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  background:
                    "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <EditFilled />
              </Button>
            </div>
          );
        },
        align: "center",
      },
    ],
  };

  const columns = selectedTab ? tableColumns[selectedTab] : [];
  var clientTableData: any = [];
  var designationData: any = [];

  const getData = (select: any) => {
    let urlT = `/api/Admin/${selectedTab}`;

    if (select == true || select === false) {
      urlT = `/api/Admin/${selectedTab}?isActive=${select}`;
    } else {
      urlT = `/api/Admin/${selectedTab}`;
    }
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: urlT,
    })
      .then((r: any) => {
         message.success("Data fetched successfully");
        setTableData(r.data);

        if (selectedTab === "GetClientIsActive") {
          clientTableData = r.data.map((item: any) => {
            return {
              key: item.client_Id,
              name: item.client_Name,
              isActive: item.is_Active,
            };
          });
          setClientData(clientTableData);
        } else {
          clientTableData = r.data;
        }
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  //search
  const filteredData = tableData.filter((record: any) => {
    const values = Object.values(record).join(" ").toLowerCase();
    return values.includes(searchText.toLowerCase());
  });

  //Pagination
  const handlePagination = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  //get selected row data
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      setRowData(selectedRows);
    },
    selectedRowKeys,
  };

  //common table for 5 tabs
  const renderTable = (tabName: any) => {
    return (
      <>
        <div style={{ display: "flex", float: "right" }}>
          {selectedTab === "GetClientIsActive" ? (
            <AddClient />
          ) : selectedTab === "GetProjectIsActive" ? (
            <AddProject clientData={clientData} />
          ) : selectedTab === "GetDesignationIsActive" ? (
            <AddDesignation />
          ) : selectedTab === "GetEmployeeTypeIsActive" ? (
            <AddEmpType />
          ) : selectedTab === "GetHrContactInfoIsActive" ? (
            <AddHrInfo />
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            display: "flex",
            float: "right",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            hidden={
              rowData.filter((row: any) => row.is_Active == false).length === 0
            }
          >
            <Button
              onClick={() => handleActivateDeactivate(true)}
              type="primary"
              style={{
                width: 85,
                background:
                  "-webkit-linear-gradient(45deg, darkgreen, lightgreen 105%)",
                fontWeight: 500,
                marginRight: 4,
              }}
            >
              Activate
            </Button>
          </div>
          <div
            hidden={
              rowData.filter((row: any) => row.is_Active == true).length === 0
            }
          >
            <Button
              type="primary"
              style={{
                width: 100,
                fontWeight: 500,
                marginRight: 4,
                background:
                  "-webkit-linear-gradient(45deg, #8B0000, #FFC0CB 105%)",
              }}
              onClick={() => handleActivateDeactivate(false)}
            >
              Deactivate
            </Button>
          </div>
        </div>
        <Input.Search
          value={searchText}
          onChange={(e: any) => setSearchText(e.target.value)}
          placeholder="Search"
          style={{
            width: 110,
            textAlign: "center",
            marginRight: 5,
            borderRadius: 4,
            padding: 3,
            background:
              "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.9), rgba(0, 255, 149, 0.5) 105%)",
            color: "black",
            fontWeight: "bold",
          }}
          //suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
        />

        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{
            width: 110,
            borderRadius: 3,
            padding: 3,
            background:
              "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.9), rgba(0, 255, 149, 0.5) 105%)",
            color: "black",
            fontWeight: "bold",
          }}
          dropdownStyle={{
            background:
              "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
            color: "black",
            fontWeight: "bold",
          }}
          placeholder="Filter table"
        >
          <Select.Option
            value={undefined}
            style={{
              background:
                "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
              color: "black",
              fontWeight: "bold",
            }}
          >
            All
          </Select.Option>
          <Select.Option
            value={true}
            style={{
              background:
                "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Active
          </Select.Option>
          <Select.Option
            value={false}
            style={{
              background:
                "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Inactive
          </Select.Option>
        </Select>

        <Table
          rowKey={(record) =>
            selectedTab === "GetClientIsActive"
              ? record.client_Id
              : selectedTab === "GetProjectIsActive"
              ? record.project_Code
              : selectedTab === "GetDesignationIsActive"
              ? record.designation_Id
              : selectedTab === "GetEmployeeTypeIsActive"
              ? record.employee_Type_Id
              : selectedTab === "GetHrContactInfoIsActive"
              ? record.hr_Contact_Id
              : ""
          }
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          pagination={{
            current: page,
            pageSize,
            showTotal: (total: any) => `Total ${total} items`,
            showSizeChanger: true,
            pageSizeOptions,
          }}
          onChange={handlePagination}
          style={{ marginTop: 8, fontWeight: 600 }}
        />

        <Modal
          title="Edit Details"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedTab === "GetClientIsActive" ? (
            <EditClient rowData={rowData} />
          ) : selectedTab === "GetProjectIsActive" ? (
            <EditProject rowData={rowData} clientData={clientData} />
          ) : selectedTab === "GetDesignationIsActive" ? (
            <EditDesignation rowData={rowData} />
          ) : selectedTab === "GetEmployeeTypeIsActive" ? (
            <EditEmpType rowData={rowData} />
          ) : selectedTab === "GetHrContactInfoIsActive" ? (
            <EditHrInfo rowData={rowData} />
          ) : (
            ""
          )}
        </Modal>
      </>
    );
  };
  //Edit Modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  var editActive: any =
    selectedTab === "GetClientIsActive"
      ? (editActive = "EditClientIsActive")
      : selectedTab === "GetProjectIsActive"
      ? (editActive = "EditProjectIsActive")
      : selectedTab === "GetDesignationIsActive"
      ? (editActive = "EditDesignationIsActive")
      : selectedTab === "GetEmployeeTypeIsActive"
      ? (editActive = "EditEmployeeTypeIsActive")
      : selectedTab === "GetHrContactInfoIsActive"
      ? (editActive = "EditHrContactInfoIsActive")
      : (editActive = "");

  //get active, Inactive and all employees
  function handleOptionChange(value: any) {
    setSelectedOption(value);
    getData(value);
  }

  useEffect(() => {
    getData(selectedOption);
  }, [selectedTab]);

  //Deactivate employees
  const handleActivateDeactivate = (isActive: boolean) => {
    const val = {
      id: selectedRowKeys,
      is_Active: isActive,
    };

    //const ids = selectedRowKeys;
    if (selectedRowKeys == null) {
      message.error("No selected row");
      return;
    }
    const hasCompletedRows =
      rowData.filter((row: any) => row.is_Active === false).length > 0;
    const active = !hasCompletedRows;

    if (isActive === false && !active) {
      message.error("Cannot deactivate inactive user");
      return;
    }
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      url: `/api/Admin/${editActive}?Is_Active=${isActive}`,
      data: val,
    })
      .then((response) => {
        message.success("Record's status updated");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div>
      <h1
        style={{
          fontSize: 25,
          background: "-webkit-linear-gradient(45deg, #09009f, #00ff95 35%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Configuration{" "}
        {selectedTab === "GetClientIsActive"
          ? "/Clients"
          : selectedTab === "GetProjectIsActive"
          ? "/Projects"
          : selectedTab === "GetDesignationIsActive"
          ? "/Job Roles"
          : selectedTab === "GetEmployeeTypeIsActive"
          ? "/Employee Types"
          : selectedTab === "GetHrContactInfoIsActive"
          ? "/HR Contact Info"
          : ""}
      </h1>
      <Card
        style={{
          width: "100%",
          marginTop: 16,
          //background: "rgba(235, 235, 235,0.6)",
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        }}
      >
        <Tabs
          activeKey={selectedTab}
          onChange={(key: string) => {
            setSelectedTab(key);
            setSelectedRowKeys([]);
            setRowData([]);
          }}
        >
          <TabPane
            tab={
              <span
                style={{
                  marginRight: 45,
                  marginLeft: 45,
                  fontWeight: "bold",
                  textShadow: "1px 1px rgba(179, 75, 92, 0.74)",
                }}
              >
                Clients
              </span>
            }
            key="GetClientIsActive"
          >
            {selectedTab === "GetClientIsActive" && renderTable("tab1")}
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  marginRight: 45,
                  marginLeft: 45,
                  fontWeight: "bold",
                  textShadow: "1px 1px rgba(179, 75, 92, 0.74)",
                }}
              >
                Projects
              </span>
            }
            key="GetProjectIsActive"
          >
            {selectedTab === "GetProjectIsActive" && renderTable("tab2")}
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  marginRight: 45,
                  marginLeft: 45,
                  fontWeight: "bold",
                  textShadow: "1px 1px rgba(179, 75, 92, 0.74)",
                }}
              >
                Job Roles
              </span>
            }
            key="GetDesignationIsActive"
          >
            {selectedTab === "GetDesignationIsActive" && renderTable("tab3")}
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  marginRight: 45,
                  marginLeft: 45,
                  fontWeight: "bold",
                  textShadow: "1px 1px rgba(179, 75, 92, 0.74)",
                }}
              >
                Employee Types
              </span>
            }
            key="GetEmployeeTypeIsActive"
          >
            {selectedTab === "GetEmployeeTypeIsActive" && renderTable("tab4")}
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  marginRight: 20,
                  marginLeft: 20,
                  fontWeight: "bold",
                  textShadow: "1px 1px rgba(179, 75, 92, 0.74)",
                }}
              >
                HR Contact Info
              </span>
            }
            key="GetHrContactInfoIsActive"
          >
            {selectedTab === "GetHrContactInfoIsActive" && renderTable("tab5")}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
