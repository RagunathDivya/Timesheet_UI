import { Button, DatePicker, Form, Input } from "antd";

export function AddEmpProject() {
  const onFinish = (values: any) => {
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
          label="Project name"
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
