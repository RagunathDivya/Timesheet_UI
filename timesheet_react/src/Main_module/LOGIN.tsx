import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChangePassword, ForgotPassword } from "./ForgotPasw";

const LoginPage: React.FC = () => {
  const [AddProjectForm] = Form.useForm();
  const navigate = useNavigate();
  const [token, settoken] = useState("");

  const setMessage = (statusCode: any, responseMessage: any) => {
    if (statusCode == 200) {
      message.success(responseMessage, 5);
    } else if (statusCode == 404) {
      message.error("You are not Registered");
    } else if (statusCode == 400) {
      message.error("Invalid password", 5);
    } else if (statusCode == 401) {
      message.error("You are not Registered", 5);
    } else {
      message.error(responseMessage);
    }
  };

  const onFinish = (values: any) => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Login/Login",
      data: values,
    })
      .then((r: any) => {
        localStorage.setItem("token", r.data.token);
        localStorage.setItem("Employee_Id", r.data.employee_Id);
        if (r.data.role_Id === 1) {
          navigate("/admin");
        } else if (r.data.role_Id === 2) {
          navigate("/employee");
        } else {
          message.error("You are not a registered user");
          navigate("/");
        }
        settoken(r.data.token);
        AddProjectForm.resetFields();
        const employeeId = r.data.employee_Id;

        axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          url: `/api/Admin/GetByEmployeeId?id=${employeeId}`,
        })
          .then((response: any) => {
            console.log(response.data[0].official_Email);
            const employeeEmail = response.data[0].official_Email;
            localStorage.setItem("mailId", employeeEmail);
            console.log(employeeId);
            console.log(employeeEmail);
          })
          .catch((error: any) => {
            message.error(error.message);
          });
      })
      .catch((error: any) => {
        setMessage(error.response.status, error.response.message);
        AddProjectForm.resetFields();
      });
  };

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handleFPCancel = () => {
    setShowForgotPasswordModal(false);
  };

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleChangePasswordClick = () => {
    setShowChangePasswordModal(true);
  };

  const handleCPCancel = () => {
    setShowChangePasswordModal(false);
  };
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "'Jost', sans-serif",
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      }}
    >
      <div
        style={{
          width: "350px",
          height: "500px",
          background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "5px 20px 50px #000",
        }}
      >
        <div>
          <Form
            onFinish={onFinish}
            form={AddProjectForm}
            style={{ margin: "0 auto", width: "80%" }}
          >
            <Form.Item>
              <label
                htmlFor="chk"
                style={{
                  color: "#eee",
                  fontSize: "2.3em",
                  justifyContent: "center",
                  display: "flex",
                  margin: "60px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: ".5s ease-in-out",
                }}
              >
                Login
              </label>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
              name="email"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                style={{
                  height: 40,
                  justifyContent: "center",
                  display: "flex",
                  borderRadius: "5px",
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  height: 40,
                  borderRadius: "5px",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "36%" }}
              >
                Login
              </Button>
            </Form.Item>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <Form.Item>
                <Button
                  type="link"
                  style={{
                    fontWeight: 700,
                    textDecoration: "underline",
                    display: "flex",
                    //marginLeft: 65,
                  }}
                  onClick={handleForgotPasswordClick}
                >
                  Forgot Password
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="link"
                  style={{
                    fontWeight: 700,
                    textDecoration: "underline",
                    display: "flex",
                   // marginLeft: 65,
                  }}
                  onClick={handleChangePasswordClick}
                >
                  Change Password
                </Button>
              </Form.Item>
            </div>
          </Form>
          <Modal
            title="Forgot Password"
            open={showForgotPasswordModal}
            onCancel={handleFPCancel}
            footer={null}
          >
            <ForgotPassword />
          </Modal>
          <Modal
            title="Change Password"
            open={showChangePasswordModal}
            onCancel={handleCPCancel}
            footer={null}
          >
            <ChangePassword />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
