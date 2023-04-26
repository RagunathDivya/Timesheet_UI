import { Button, DatePicker, Form, Input, Modal, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function AddEmpProject() {
  const onFinish = (values: any) => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "/api/Admin/AddEmployeeProject",
      data: values,
    })
      .then((r: any) => {
        message.success("Project added successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data);
      });
    window.location.reload();
  };
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Employee ID"
          name="employee_Id"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project ID"
          name="project_Id"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Project Start Date"
          name="start_Date"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Project Completion Deadline"
          name="end_Date"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export function ViewEmpProject() {
  const [empProjectData, setEmpProjectData] = useState<Array<any>>([]);
  const EmpProjects = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: "/api/Admin/getAllEmployeeProjectsByEmpPro",
    })
      .then((r: any) => {
        setEmpProjectData(r.data);
        message.success("Employe projects fetched successfully ");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };
  useEffect(() => {
    EmpProjects();
  }, []);
  const columns: any = [
    {
      title: "Employee Project ID",
      dataIndex: "employee_Project_Id",
      key: "employee_Project_Id",
    },
    {
      title: "First Name",
      dataIndex: "first_Name",
      key: "first_Name",
    },
    {
      title: "Last name",
      dataIndex: "last_Name",
      key: "last_Name",
    },
    {
      title: "Project name",
      dataIndex: "project_Name",
      key: "project_Name",
    },
    {
      title: "Project start Date",
      dataIndex: "start_Date",
      key: "start_Date",
    },
    {
      title: "Project end Date",
      dataIndex: "end_Date",
      key: "end_Date",
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];
  const [editModalOpen, setEditModalOpen] = useState(false);
  const showEditModals = () => {
    setEditModalOpen(true);
  };
  const onupdate = (values: any) => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Admin/EditEmployeeproject",
      data: values,
    })
      .then((response) => {
        message.success("Your record have been updated successfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  return (
    <>
      <Table dataSource={empProjectData} columns={columns} />
      <Button type="primary" onClick={showEditModals}>
        Edit Employee Project
      </Button>
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
        {" "}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onupdate}
          autoComplete="off"
        >
          <Form.Item
            label="Employee Project ID"
            name="employee_Project_Id"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee ID"
            name="employee_Id"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project ID"
            name="project_Id"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Project Start Date"
            name="start_Date"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Project Completion Deadline"
            name="end_Date"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
