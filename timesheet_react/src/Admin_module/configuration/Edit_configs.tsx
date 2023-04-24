import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
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
      message.success("Your records have been updated successfully");
    })
    .catch((error) => {
      message.error(error.response.data);
    });
};
export function EditClient(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditClient");
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Client ID" name="client_Id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Client Name"
          name="client_Name"
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
export function EditProject(props: any) {
  const { rowData, clientData } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditProject");
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Project ID" name="project_Id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Project code"
          name="project_Code"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Project name"
          name="project_Name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Client name"
          name="client_Id"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Select>
            {clientData.map((client: any) => (
              <Option key={client.key} value={client.key}>
                {client.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="project_Start_Date"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="project_End_Date"
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
export function EditDesignation(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditDesignation");
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Designation ID" name="designation_Id" hidden>
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Designation Name"
          name="designation"
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
export function EditEmpType(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditEmployeetype");
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="Employee Type ID" name="employee_Type_Id" hidden>
          <Input readOnly />
        </Form.Item>{" "}
        <Form.Item
          label="Name"
          name="employee_Type"
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
export function EditHrInfo(props: any) {
  const [form] = Form.useForm();
  form.setFieldsValue(props.rowData[0]); // pass checked row values from props to fields
  const onFinishAdd = (values: any) => {
    onFinish(values, "/api/Admin/EditHrContactInfo");
  };
  return (
    <>
      <Form name="basic" form={form} onFinish={onFinishAdd} autoComplete="off">
        <Form.Item label="HR contact ID" name="hr_Contact_Id" hidden>
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="first_Name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_Name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="hr_Email_Id"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact number"
          name="hr_Contact_No"
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
