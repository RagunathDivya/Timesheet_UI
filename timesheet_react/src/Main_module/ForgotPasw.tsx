import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { useState } from "react";

export function ForgotPassword() {
  const onFinish = (values: any) => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Login/ForgetPassword",
      data: values,
    })
      .then((response) => {
        message.success("Password set successfully");
      })
      .catch((error) => {
        message.error(error.response.data);
      });
  };
  return (
    <>
      <Form name="forgot-password-form" onFinish={onFinish}>
        <Form.Item
          name="email"
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
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input new password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Set new password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

// export const ForgotPassword = (visible: any, onCancel: any) => {
//   const [email, setEmail] = useState("");
//   const [otp, setOTP] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleGetOTP = async () => {
//     try {
//       const response = await axios.post(
//         `/api/Login/GenerateOTP?email=${email}`
//       );
//       message.success("OTP sent to your email address");
//     } catch (error) {
//       message.error("Error sending OTP");
//     }
//   };

//   const handleSetNewPassword = async () => {
//     try {
//       const response = await axios.post(
//         `/api/Login/VerifyOTP?email=${email}&otp=${otp}&newPassword=${newPassword}`
//       );
//       message.success("Password updated successfully");
//       onCancel();
//     } catch (error) {
//       message.error("Error updating password");
//     }
//   };

//   return (
//     <Modal
//       title="Forgot Password"
//       open={visible}
//       onCancel={onCancel}
//       footer={[
//         <Button key="cancel" onClick={onCancel}>
//           Cancel
//         </Button>,
//         <Button key="submit" type="primary" onClick={handleSetNewPassword}>
//           Set New Password
//         </Button>,
//       ]}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Email">
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email address"
//           />
//         </Form.Item>
//         <Button type="primary" onClick={handleGetOTP}>
//           Get OTP
//         </Button>
//         <Form.Item label="OTP">
//           <Input
//             value={otp}
//             onChange={(e) => setOTP(e.target.value)}
//             placeholder="Enter the OTP you received"
//           />
//         </Form.Item>
//         <Form.Item label="New Password">
//           <Input.Password
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="Enter your new password"
//           />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// // export default function LoginPage() {
// //   const [isModalVisible, setIsModalVisible] = useState(false);

// //   const handleForgotPassword = () => {
// //     setIsModalVisible(true);
// //   };

// //   const handleCancelModal = () => {
// //     setIsModalVisible(false);
// //   };

// //   return (
// //     <div>

// //       <Button onClick={handleForgotPassword}>Forgot Password?</Button>
// //       <ForgotPasswordModal
// //         visible={isModalVisible}
// //         onCancel={handleCancelModal}
// //       />
// //     </div>
// //   );
// // }
