import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Option } = Select;

const onFinish = (values: any, url: any) => {
  axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    url: url,
    data: values,
  })
    .then((r: any) => {
      message.success("Ok! Records are Added Successfully");
    })
    .catch((error: any) => {
      message.error(error.response.data);
    });
};

export function AddClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/AddClient");
    handleCancel();
    window.location.reload();
    window.location.reload();
  };
  return (
    <div>
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
        Add new Client
      </Button>

      <Modal
        title="Fill in Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Client name"
            name="client_Name"
            rules={[{ required: true, message: "Please input Client Name!" }]}
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
    </div>
  );
}

export function AddProject(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clientData, rowdata } = props;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/AddProject");
    handleCancel();
    window.location.reload();
  };

  const [clientDetail, setClientData] = useState<Clients[]>([]);
  interface Clients {
    client_Id: number;
    client_Name: string;
  }
  const { Option } = Select;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/Admin/GetClientIsActive?isActive=true"
      );
      const data = await response.json();
      setClientData(data);
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        Add new Project
      </Button>

      <Modal
        title="Fill in Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Project code"
            name="Project_Code"
            rules={[{ required: true, message: "Please input project code !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project name"
            name="project_Name"
            rules={[{ required: true, message: "Please input project Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Client name"
            name="client_Id"
            rules={[
              {
                required: true,
                message: "Please select client for this project!",
              },
            ]}
          >
            <Select>
              {clientDetail.map((client) => (
                <Option key={client.client_Id} value={client.client_Id}>
                  {client.client_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="project_Start_Date"
            rules={[
              { required: true, message: "Please specify project start date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="project_End_Date"
            rules={[
              { required: true, message: "Please specify project end date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export function AddDesignation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/AddDesignation");
    handleCancel();
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        Add new Designation
      </Button>

      <Modal
        title="Fill in Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Designation name"
            name="designation"
            rules={[{ required: true, message: "Please input Designation !" }]}
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
    </div>
  );
}
export function AddEmpType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/AddEmployeeType");
    handleCancel();
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        Add new Employee type
      </Button>

      <Modal
        title="Fill in Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Employee type name"
            name="employee_Type"
            rules={[{ required: true, message: "Please input Employee type!" }]}
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
    </div>
  );
}
export function AddHrInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/AddHrContactInfo");
    handleCancel();
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        Add HR contact info
      </Button>

      <Modal
        title="Fill in Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          autoComplete="off"
        >
          <Form.Item
            label="HR Email "
            name="hr_Email_Id"
            rules={[{ required: true, message: "Please input HR Email!" }]}
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
    </div>
  );
}
