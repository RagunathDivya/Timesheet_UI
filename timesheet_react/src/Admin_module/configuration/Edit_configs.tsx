import { Button, DatePicker, Form, Input, Select, message } from "antd";
import axios from "axios";
import format from "date-fns/format";

import dayjs from "dayjs";
import "dayjs/locale/en";

import { useEffect, useState } from "react";
const { Option } = Select;

const onFinish = (values: any, url: any) => {
  axios({
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    url: url,
    data: values,
  })
    .then((response) => {
      message.success("Records updated successfully");
    })
    .catch((error) => {
      message.error(error.response.data);
    });
};
export function EditClient(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]);

  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditClient");
    window.location.reload();
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Client ID" name="client_Id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Client Name"
          name="client_Name"
          rules={[{ required: true, message: "Please input client Name!" }]}
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
export function EditProject(props: any) {
  const { rowData } = props;
  const [form] = Form.useForm();

  form.setFieldsValue(rowData[0]);

  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditProject");
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
  const dateFormat = "DD/MM/YYYY";

  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Project ID" name="project_Id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Project code"
          name="project_Code"
          rules={[{ required: true, message: "Please input project code!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project name"
          name="project_Name"
          rules={[{ required: true, message: "Please input project name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Client name"
          name="client_Id"
          rules={[{ required: true, message: "Please input Client name!" }]}
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
          name="start_Date"
          rules={[
            { required: false, message: "Please input project start date!" },
          ]}
        >
          <DatePicker
            defaultValue={dayjs(props.rowData[0].project_Start_Date)}
            format={dateFormat}
            disabled
          />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="end_Date"
          rules={[
            { required: true, message: "Please input project end date!" },
          ]}
        >
          <DatePicker
            defaultValue={dayjs(props.rowData[0].project_End_Date)}
            format={dateFormat}
          />
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
export function EditDesignation(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditDesignation");
    window.location.reload();
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Designation ID" name="designation_Id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Designation Name"
          name="designation"
          rules={[{ required: true, message: "Please input Designation!" }]}
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
export function EditEmpType(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditEmployeetype");
    window.location.reload();
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Employee Type ID" name="employee_Type_Id">
          <Input disabled />
        </Form.Item>{" "}
        <Form.Item
          label="Name"
          name="employee_Type"
          rules={[{ required: true, message: "Please input employee type!" }]}
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
export function EditHrInfo(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditHrContactInfo");
    window.location.reload();
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="HR contact ID" name="hr_Contact_Id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Name"
          name="hr_Name"
          rules={[{ required: true, message: "Please input Admin Last Name!" }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Email"
          name="hr_Email_Id"
          rules={[{ required: true, message: "Please input Admin Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact number"
          name="hr_Contact_No"
          rules={[
            { required: true, message: "Please input Admin contact number!" },
          ]}
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
