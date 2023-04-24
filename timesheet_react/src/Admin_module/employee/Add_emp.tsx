import { useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";

import axios from "axios";

export function AddEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = (values: any) => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "/api/Admin/AddEmployee",
      data: values,
    })
      .then((r: any) => {
        message.success("Your record have been added successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data);
      });
  };
  return (
    <>
      <Button
        id="idp"
        type="primary"
        onClick={showModal}
        style={{
          display: "flex",
          float: "right",
          background:
            "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.3), rgba(0, 255, 149, 0.3) 95%)",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Add Employee
      </Button>
      <Modal
        title="Add Employee"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        style={{
          fontWeight: 600,
        }}
        width={1000}
      >
        <Form
          name="basic"
          labelCol={{ span: 50 }}
          wrapperCol={{ span: 25 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Form.Item
              label="Employee Code"
              name="employee_code"
              rules={[
                { required: true, message: "Please input your Employee Code!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="first_Name"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_Name"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 290,
            }}
          >
            <Form.Item
              label="Employee Type"
              name="employee_Type_Id"
              rules={[
                {
                  required: true,
                  message: "Please input your Employee Type Id!",
                },
              ]}
            >
              <Select style={{ width: 185 }}>
                <Select.Option value="1">Internal</Select.Option>
                <Select.Option value="2">External</Select.Option>
                <Select.Option value="3">Consultancy</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Designation"
              name="designation_Id"
              rules={[
                { required: true, message: "Please input your Designation !" },
              ]}
            >
              <Select style={{ width: 200 }}>
                <Select.Option value="1">Manager</Select.Option>
                <Select.Option value="2">HR Manager</Select.Option>
                <Select.Option value="3">
                  Senior software Developer
                </Select.Option>
                <Select.Option value="4">Software Developer</Select.Option>
                <Select.Option value="5">Software Tester</Select.Option>
                <Select.Option value="6">
                  Associate Software Engineer
                </Select.Option>
                <Select.Option value="7">Technical Staff</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 230,
            }}
          >
            <Form.Item
              label="Reporting Manager1"
              name="reporting_Manager1"
              rules={[
                {
                  required: true,
                  message: "Please input your Reporting Manager1!",
                },
              ]}
            >
              <Select style={{ width: 180 }}>
                <Select.Option value="Manuj Kumar B">
                  Manuj Kumar B
                </Select.Option>
                <Select.Option value="Appusamy S">Appusamy S</Select.Option>
                <Select.Option value="Rabik S">Rabik S</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Reporting Manager2"
              name="reportinng_Manager2"
              rules={[
                {
                  required: true,
                  message: "Please input Reporting Manager2!",
                },
              ]}
            >
              <Select style={{ width: 200 }}>
                <Select.Option value="Sweta P">Sweta P</Select.Option>
                <Select.Option value="Sadiq S">Sadiq S</Select.Option>
                <Select.Option value="Anjana G">Anjana G</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please set a password!" }]}
            style={{ width: 300 }}
          >
            <Input.Password />
          </Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 450,
            }}
          >
            <Form.Item
              name="Joining Date"
              label="Joining Date"
              rules={[
                { required: true, message: "Please provide Joining Date!" },
              ]}
              hasFeedback
            >
              <DatePicker placeholder="Select Date" />
            </Form.Item>
            <Form.Item
              name="End Date"
              label="End Date"
              rules={[{ required: false, message: "Please provide End Date!" }]}
              hasFeedback
            >
              <DatePicker placeholder="Select Date" />
            </Form.Item>
          </div>
          <h1>Contact Info</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label="Mail ID"
              name="official_Email"
              rules={[{ required: true, message: "Please input your Mail!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Alternate Mail ID"
              name="alternate_Email"
              rules={[
                {
                  required: false,
                  message: "Please input your Alternate  Mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contact No"
              name="contact_No"
              rules={[
                { required: true, message: "Please input your Contact No!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
