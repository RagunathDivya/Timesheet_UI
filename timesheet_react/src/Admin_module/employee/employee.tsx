import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Select,
  SelectProps,
  Table,
} from "antd";

import axios from "axios";

import momentjs from "moment";
import moment from "moment";
import { AddEmployee } from "./Add_emp";
import { EditEmployee } from "./Edit_emp";

export const Employee: React.FC = () => {
  const [tableData, setData] = useState<Array<any>>([]);
  const [tableDatas, setDatas] = useState<Array<any>>([]);

  const [isModalOpens, setIsModalOpens] = useState(false);
  const [isTableModal, setIsTableModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedOption, setSelectedOption] = useState(true);
  const [searchText, setSearchText] = useState("");
  const options: SelectProps["options"] = [];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState<{ isActive: boolean }[]>([]);

  const showModals = () => {
    setIsModalOpens(true);
  };
  const showTableModal = () => {
    setIsTableModal(true);
    getData(selectedRowKeys);
  };

  const [form] = Form.useForm();

  const Tdata = (select: any) => {
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
        message.success("Value Loaded");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  function handleOptionChange(value: any) {
    setSelectedOption(value);
    Tdata(value);
  }

  useEffect(() => {
    Tdata(selectedOption);
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
    const hasCompletedRows =
      tableData.filter((row: any) => row.is_Active === false).length > 0;
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
      url: `/api/Admin/EditEmployeIsActive?Is_Active=${isActive}`,
      data: val,
    })
      .then((response) => {
        message.success("Record's status updated");
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

  const showModals1 = (record: {
    employee_Id: any;
    full_Name: any;
    employee_Type: any;
    designation: any;
    reporting_Manager1: any;
    reportinng_Manager2: any;
    joining_Date: any;
    end_Date: any;
    email: any;
    contact_No: any;
  }) => {
    form.setFieldsValue({
      employee_Id: record.employee_Id,
      full_Name: record.full_Name,
      employee_Type: record.employee_Type,
      designation: record.designation,
      reporting_Manager1: record.reporting_Manager1,
      reportinng_Manager2: record.reportinng_Manager2,
      joining_Date: momentjs(record.joining_Date),
      end_Date: momentjs(record.end_Date),
      email: record.email,
      contact_No: record.contact_No,
    });
  };

  const columns: any = [
    {
      title: "Sl.no",
      dataIndex: "S.No",
      key: "S.No",
      render: (_value: any, _item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: "Employee Code",
      dataIndex: "employee_code",
      key: "employee_code",
    },
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
      title: "Type",
      dataIndex: "employee_Type",
      key: "employee_Type",
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
      title: "Reporting Manager2",
      dataIndex: "reportinng_Manager2",
      key: "reportinng_Manager2",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_Date",
      key: "joining_Date",
      render: (joining_Date: any) => moment(joining_Date).format("DD-MM-YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "end_Date",
      key: "end_Date",
      render: (End_Date: any) => "",
      //moment(End_Date).format("DD-MM-YYYY"),
    },
    {
      title: "Mail Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contact_No",
      key: "contact_No",
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
            <Button type="primary" onClick={showModals}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];
  const getData = (val: any) => {
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
      dataIndex: "reporting_Manager",
      key: "reporting_Manager",
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
          //background: "rgba(235, 235, 235,0.6)",
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        }}
      >
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
            width: 100,
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
            total: tableData.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (current, pageSize) => {
              setPage(current);
              setPageSize(pageSize || 10);
            },
          }}
          style={{ width: 4500, fontWeight: 600, marginTop: 8 }}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <Modal
        title="Update Employee"
        open={isModalOpens}
        onCancel={() => setIsModalOpens(false)}
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
          onClick={showTableModal}
          style={{ width: 100, fontWeight: 500 }}
        >
          View Previous Changes
        </Button>
      </Modal>
      <Modal
        open={isTableModal}
        onCancel={() => setIsTableModal(false)}
        footer={null}
        width={1000}
        centered
      >
        <Table dataSource={tableDatas} columns={columns1} />
      </Modal>
    </div>
  );
};
