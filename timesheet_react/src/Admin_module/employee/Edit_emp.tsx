import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  SelectProps,
  Space,
  Table,
} from "antd";

import axios from "axios";

export function EditEmployee(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.selectedRows[0]);
  const onupdate = (values: any) => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Admin/EditEmployee",
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
      <Form
        name="basic"
        labelCol={{ span: 50 }}
        wrapperCol={{ span: 25 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onupdate}
        form={form}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item
            label="Employee Id"
            name="employee_Id"
            rules={[
              { required: false, message: "Please input your Employee Id!" },
            ]}
            hidden
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
          <Form.Item
            label="Employee Code"
            name="employee_code"
            rules={[
              { required: true, message: "Please input your Employee Code!" },
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
            marginRight: 450,
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
            <Select style={{ width: 100 }}>
              <Select.Option value="Manuj Kumar B">Manuj Kumar B</Select.Option>
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
                message: "Please input your Reporting Manager2!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Sweta P">Sweta P</Select.Option>
              <Select.Option value="Sadiq S">Sadiq S</Select.Option>
              <Select.Option value="Anjana G">Anjana G</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 75,
          }}
        >
          <Form.Item
            label="Employee Type "
            name="employee_Type_Id"
            rules={[
              {
                required: true,
                message: "Please input your Employee Type Id!",
              },
            ]}
          >
            <Select style={{ width: 180 }}>
              <Select.Option value="1">Internal</Select.Option>
              <Select.Option value="2">External</Select.Option>
              <Select.Option value="3">Consultancy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role_id"
            rules={[{ required: true, message: "Please input your Role Id!" }]}
          >
            <Select style={{ width: 100 }}>
              <Select.Option value="1">Admin</Select.Option>
              <Select.Option value="2">Employee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Designation "
            name="designation_Id"
            rules={[
              {
                required: true,
                message: "Please input your Designation Id!",
              },
            ]}
          >
            <Select style={{ width: 200 }}>
              <Select.Option value="1">Manager</Select.Option>
              <Select.Option value="2">HR Manager</Select.Option>
              <Select.Option value="3">Senior software Developer</Select.Option>
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
            marginRight: 440,
          }}
        >
          <Form.Item
            name="joining Date"
            label="Joining Date"
            rules={[
              { required: false, message: "Please provide Joining Date!" },
            ]}
            hasFeedback
          >
            <DatePicker placeholder="Select Date" />
          </Form.Item>
          <Form.Item
            name="end Date"
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
            label="Mail"
            name="official_Email"
            rules={[{ required: true, message: "Please input your Mail!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Alternate Mail"
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
          //wrapperCol={{ offset: 8, span: 16 }}
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
