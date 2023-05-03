import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";

import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/en";

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
        message.success("Record have been updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.response.data);
      });
  };
  const [designations, setDesignations] = useState<Designation[]>([]);
  interface Designation {
    designation_Id: number;
    designation: string;
    is_Active: boolean;
    create_Date: string;
    modified_Date: string | null;
  }
  useEffect(() => {
    const fetchDesignations = async () => {
      const response = await axios.get("/api/Admin/GetAllDesignations");
      setDesignations(response.data);
    };
    fetchDesignations();
  }, []);

  interface EmployeeType {
    employee_Type_Id: number;
    employee_Type: string;
    is_Active: boolean;
    create_Date: string;
    modified_Date: string | null;
  }
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);
  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      const response = await axios.get<EmployeeType[]>(
        "/api/Admin/GetAllEmplyoeeTypes"
      );
      setEmployeeTypes(response.data);
    };
    fetchEmployeeTypes();
  }, []);
  const dateFormat = "DD/MM/YYYY";
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
        style={{ paddingTop: 30 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 300,
          }}
        >
          <Form.Item
            label="Employee Id"
            name="employee_Id"
            rules={[
              { required: false, message: "Please input your Employee Id!" },
            ]}
          >
            <Input disabled />
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
            marginRight: 300,
          }}
        >
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
            marginRight: 45,
          }}
        >
          <Form.Item
            label="Employee Type"
            name="employee_Type"
            rules={[
              {
                required: true,
                message: "Please select an Employee Type!",
              },
            ]}
          >
            <Select style={{ width: 135 }}>
              {employeeTypes.map((employeeType) => (
                <Select.Option value={employeeType.employee_Type}>
                  {employeeType.employee_Type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: "Please input your Designation !" },
            ]}
          >
            <Select style={{ width: 240 }}>
              {designations.map((designation) => (
                <Select.Option value={designation.designation}>
                  {designation.designation}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Reporting Manager"
            name="reporting_Manager1"
            rules={[
              {
                required: true,
                message: "Please input your Reporting Manager1!",
              },
            ]}
          >
            <Select style={{ width: 155 }}>
              <Select.Option value="Manuj Kumar B">Manuj Kumar B</Select.Option>
              <Select.Option value="Appusamy S">Appusamy S</Select.Option>
              <Select.Option value="Rabik S">Rabik S</Select.Option>
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
          >
            <DatePicker
              defaultValue={dayjs(props.selectedRows[0].joining_Date)}
              format={dateFormat}
              disabled
            />
          </Form.Item>
        </div>

        <h4>Contact Info</h4>
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
