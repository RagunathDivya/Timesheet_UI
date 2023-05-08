import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import joy from "../Main_module/TSBG.jpg";
import joy1 from "../Main_module/logo.png";

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
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handleFPCancel = () => {
    setShowForgotPasswordModal(false);
    setOtpSent(false);
    setEmail("");
    setOtp("");
    setNewPassword("");
  };
  const handleGetOTP = async () => {
    try {
      await axios.post(`/api/Login/GenerateOTP?email=${email}`);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetNewPassword = async () => {
    try {
      await axios.post(
        `/api/Login/VerifyOTP?email=${email}&otp=${otp}&newPassword=${newPassword}`
      );
      Modal.success({
        title: "Success",
        content: "Your password has been reset successfully",
      });
      handleFPCancel();
    } catch (error) {
      console.error(error);
      Modal.error({
        title: "Error",
        content:
          "An error occurred while resetting your password. Please try again later",
      });
    }
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
        position: "fixed",
      }}
    >
      <img
        src={joy1}
        alt="img"
        style={{
          width: "10%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <img src={joy} alt="img" style={{ width: "60%" }} />
      <div
        style={{
          width: "350px",
          height: "500px",
          //background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
          background: "linear-gradient(to bottom, #87CEEB, #ADD8E6, #00BFFF)",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "5px 20px 50px #000",
          marginBottom: 50,
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
                  color: "black",
                  fontSize: "2.3em",
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: 30,
                  marginTop: 90,
                  fontWeight: "bold",
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
                style={{
                  marginLeft: "36%",
                  background: "#ff66d9",
                  color: "black",
                  marginTop: 20,
                }}
              >
                Login
              </Button>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 65,
              }}
            >
              <Form.Item>
                <Button
                  type="link"
                  style={{
                    fontWeight: 700,
                    textDecoration: "underline",
                    display: "flex",
                    color: "#000099",
                  }}
                  onClick={handleForgotPasswordClick}
                >
                  Forgot Password
                </Button>
              </Form.Item>
              <Form.Item></Form.Item>
            </div>
          </Form>
          <Modal
            title="Forgot Password"
            open={showForgotPasswordModal}
            onCancel={handleFPCancel}
            footer={[
              <Button key="cancel" onClick={handleFPCancel}>
                Cancel
              </Button>,
              otpSent ? (
                <Button
                  key="set-password"
                  type="primary"
                  onClick={handleSetNewPassword}
                >
                  Set New Password
                </Button>
              ) : (
                <Button key="get-otp" type="primary" onClick={handleGetOTP}>
                  Get OTP
                </Button>
              ),
            ]}
          >
            {otpSent ? (
              <>
                <Form.Item label="OTP">
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
                </Form.Item>
                <Form.Item label="New Password">
                  <Input.Password
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Item>
              </>
            ) : (
              <Form.Item label="Email">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
