import React, { useEffect, useState } from "react";
import { Button, Card, Input, message, Modal, Select, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { AddEmployee } from "./Add_emp";
import { EditEmployee } from "./Edit_emp";
import { AddEmpProject, ViewEmpProject } from "./AddEmpProject";
import { EditFilled } from "@ant-design/icons";

export const Employee: React.FC = () => {
  const [tableData, setData] = useState<Array<any>>([]);
  const [tableDatas, setDatas] = useState<Array<any>>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [prevChangesModal, setPrevChangesModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [viewProjectModal, setViewProjectModal] = useState(false);
  const [page, setPage]: any = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageSizeOptions = [3, 5, 10, 20];
  const [selectedOption, setSelectedOption] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState<{ isActive: boolean }[]>([]);

  const showEditModals = () => {
    setEditModalOpen(true);
  };
  const showPrevChangesModal = () => {
    setPrevChangesModal(true);
    getPrevChangesData(selectedRowKeys);
  };
  const showAddProjectModal = () => {
    setAddProjectModal(true);
  };
  const showViewProjectModal = () => {
    setViewProjectModal(true);
  };

  const EmpData = (select: any) => {
    let urlT = "/api/Admin/GetEmployeeIsActive";
    if (select === true || select === false) {
      urlT = `/api/Admin/GetEmployeeIsActive?isActive=${select}`;
    } else {
      urlT = "/api/Admin/GetEmployeeIsActive";
    }
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: urlT,
    })
      .then((r: any) => {
        setData(r.data);
        message.success("Data fetched successfully");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  function handleOptionChange(value: any) {
    setSelectedOption(value);
    EmpData(value);
  }

  useEffect(() => {
    EmpData(selectedOption);
  }, []);

  const filteredData = tableData.filter((record: any) => {
    const values = Object.values(record).join(" ").toLowerCase();

    return values.includes(searchText.toLowerCase());
  });

  const handleActivateDeactivate = (isActive: boolean) => {
    const val = {
      id: selectedRowKeys,
    };

    if (selectedRowKeys == null) {
      message.error("No selected row");
      return;
    }
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      url: `/api/Admin/EditEmployeIsActive?Is_Active=${isActive}`,
      data: val,
    })
      .then((response) => {
        message.success("Record's status updated");
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
    },
  };

  const columns: any = [
    {
      title: "Sl.no",
      dataIndex: "S.No",
      key: "S.No",
      render: (_value: any, _item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
      align: "center",
    },
    {
      title: "Employee Code",
      dataIndex: "employee_code",
      key: "employee_code",
      align: "center",
    },
    {
      title: "Employee ID",
      dataIndex: "employee_Id",
      key: "employee_Id",
      align: "center",
    },
    {
      title: "Employee Name",
      dataIndex: "full_Name",
      key: "full_Name",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "employee_Type",
      key: "employee_Type",
      align: "center",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "center",
    },
    {
      title: "Reporting Manager1",
      dataIndex: "reporting_Manager1",
      key: "reporting_Manager1",
      align: "center",
    },
    {
      title: "Reporting Manager2",
      dataIndex: "reportinng_Manager2",
      key: "reportinng_Manager2",
      align: "center",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_Date",
      key: "joining_Date",
      render: (joining_Date: any) => moment(joining_Date).format("DD-MM-YYYY"),
      align: "center",
    },
    {
      title: "End Date",
      dataIndex: "end_Date",
      key: "end_Date",
      align: "center",
      render: (End_Date: any) => "",
      //moment(End_Date).format("DD-MM-YYYY"),
    },
    {
      title: "Mail Id",
      dataIndex: "official_Email",
      key: "official_Email",
      align: "center",
    },
    {
      title: "Contact No",
      dataIndex: "contact_No",
      key: "contact_No",
      align: "center",
    },
    {
      title: "",
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div
            style={{
              visibility:
                selectedRowKeys.length === 1 &&
                record.employee_Id === selectedRowKeys[0]
                  ? "visible"
                  : "hidden",
              display: "flex",
            }}
          >
            <Button
              style={{
                background:
                  "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
                color: "black",
                fontWeight: "bold",
              }}
              type="primary"
              onClick={showEditModals}
            >
              <EditFilled />
            </Button>
          </div>
        );
      },
      align: "center",
    },
  ];
  const getPrevChangesData = (val: any) => {
    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      url: `/api/Admin/GetViewPreviousChangesById?Id=${val}`,
    })
      .then((r: any) => {
        setDatas(r.data);
        message.success("Data fetched successfully ");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  const columns1: any = [
    {
      title: "Employee ID",
      dataIndex: "employee_Id",
      key: "employee_Id",
    },
    {
      title: "Employee Name",
      dataIndex: "full_Name",
      key: "full_Name",
    },
    {
      title: "Employee Type",
      dataIndex: "employee_Type",
      key: "employee_Type",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_Date",
      key: "joining_Date",
    },

    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Reporting Manager1",
      dataIndex: "reporting_Manager1",
      key: "reporting_Manager1",
    },
    {
      title: "Mail Id",
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: "Contact No",
      dataIndex: "contact_No",
      key: "contact_No",
    },
  ];
  const handlePagination = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
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
        Employees
      </h1>
      <Card
        style={{
          width: "100%",
          marginTop: 16,
          paddingTop: 35,
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            float: "right",
          }}
        >
          <Button
            type="primary"
            onClick={showAddProjectModal}
            style={{
              display: "flex",
              float: "right",
              background:
                "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Add Project
          </Button>
          <Button
            type="primary"
            onClick={showViewProjectModal}
            style={{
              display: "flex",
              float: "right",
              background:
                "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
              color: "black",
              fontWeight: "bold",
            }}
          >
            View Project
          </Button>
        </div>
        <AddEmployee />
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
              selectedRows.filter((row: any) => row.is_Active == false)
                .length === 0
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
              selectedRows.filter((row: any) => row.is_Active == true)
                .length === 0
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
            width: 120,
            display: "flex",
            float: "left",
            textAlign: "center",
            marginRight: 5,
            borderRadius: 4,
            padding: 3,
            background:
              "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.9), rgba(0, 255, 149, 0.5) 105%)",
            color: "black",
            fontWeight: "bold",
          }}
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
        >
          <Select.Option value={false}>Inactive</Select.Option>
          <Select.Option value={true}>Active</Select.Option>
        </Select>

        <Table
          dataSource={filteredData}
          columns={columns}
          rowSelection={rowSelection}
          rowKey={(record: any) => record.employee_Id}
          pagination={{
            current: page,
            pageSize,
            showTotal: (total: any) => `Total ${total} items`,
            showSizeChanger: true,
            pageSizeOptions,
          }}
          onChange={handlePagination}
          style={{ width: 4500, fontWeight: 600, marginTop: 8 }}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <Modal
        title="Update Employee"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={[]}
        width={1000}
        style={{
          fontWeight: 600,
        }}
      >
        <EditEmployee selectedRows={selectedRows} />
        <Button
          type="link"
          block
          onClick={showPrevChangesModal}
          style={{ width: 100, fontWeight: 500 }}
        >
          View Previous Changes
        </Button>
      </Modal>
      <Modal
        open={prevChangesModal}
        onCancel={() => setPrevChangesModal(false)}
        footer={null}
        width={1000}
        centered
      >
        <Table dataSource={tableDatas} columns={columns1} />
      </Modal>
      <Modal
        open={addProjectModal}
        onCancel={() => setAddProjectModal(false)}
        footer={null}
        width={1000}
        centered
      >
        <AddEmpProject />
      </Modal>
      <Modal
        open={viewProjectModal}
        onCancel={() => setViewProjectModal(false)}
        footer={null}
        width={1000}
        centered
      >
        <ViewEmpProject />
      </Modal>
    </div>
  );
};
