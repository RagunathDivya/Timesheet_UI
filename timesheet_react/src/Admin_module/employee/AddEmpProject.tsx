import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
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
  const [projectData, setProjectData] = useState<Projects[]>([]);
  interface Projects {
    project_Id: number;
    project_Name: string;
  }
  const { Option } = Select;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/Admin/GetProjectIsActive?isActive=true"
      );
      const data = await response.json();
      setProjectData(data);
    }
    fetchData();
  }, []);

  const [employeeData, setEmployeeData] = useState<Employees[]>([]);
  interface Employees {
    employee_Id: number;
    full_Name: string;
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/Admin/GetEmployeeIsActive?isActive=true"
      );
      const data = await response.json();
      setEmployeeData(data);
    }
    fetchData();
  }, []);

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
          label="Employee"
          name="employee_Id"
          rules={[
            { required: true, message: "Please input your employee ID!" },
          ]}
        >
          <Select>
            {employeeData.map((employee) => (
              <Option key={employee.employee_Id} value={employee.employee_Id}>
                {employee.full_Name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Project"
          name="project_Id"
          rules={[{ required: true, message: "Please input your Project ID!" }]}
        >
          <Select>
            {projectData.map((project) => (
              <Option key={project.project_Id} value={project.project_Id}>
                {project.project_Name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Project Start Date"
          name="start_Date"
          rules={[{ required: true, message: "Please input your Start Date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Project Completion Deadline"
          name="end_Date"
          rules={[{ required: true, message: "Please input your End Date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input your Location!" }]}
        >
          <Select>
            <Option value="Banglore">Bengaluru</Option>
            <Option value="Coimbatore">Coimbatore</Option>
          </Select>
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
        message.success("Record have been updated successfully");
        setEditModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  const [projectData, setProjectData] = useState<Projects[]>([]);
  interface Projects {
    project_Id: number;
    project_Name: string;
  }
  const { Option } = Select;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/Admin/GetProjectIsActive?isActive=true"
      );
      const data = await response.json();
      setProjectData(data);
    }
    fetchData();
  }, []);

  const [employeeData, setEmployeeData] = useState<Employees[]>([]);
  interface Employees {
    employee_Id: number;
    full_Name: string;
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/Admin/GetEmployeeIsActive?isActive=true"
      );
      const data = await response.json();
      setEmployeeData(data);
    }
    fetchData();
  }, []);

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
            rules={[{ required: true, message: "Please input EmpProject Id!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee"
            name="employee_Id"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Select>
              {employeeData.map((employee) => (
                <Option key={employee.employee_Id} value={employee.employee_Id}>
                  {employee.full_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Project"
            name="project_Id"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Select>
              {projectData.map((project) => (
                <Option key={project.project_Id} value={project.project_Id}>
                  {project.project_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Project Start Date"
            name="start_Date"
            rules={[
              { required: true, message: "Please input project start date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Project end date"
            name="end_Date"
            rules={[
              { required: true, message: "Please input project end date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Select>
              <Option value="Banglore">Banglore</Option>
              <Option value="Coimbatore">Coimbatore</Option>
            </Select>
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
