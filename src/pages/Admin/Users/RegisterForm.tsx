import { Form, Input, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';
const RegisterForm = () => {
  const [form] = Form.useForm();

  const checkExistingAccount = (username, email) => {
    // Gửi yêu cầu kiểm tra tài khoản (username, email) đến server để xác minh
    // Có thể sử dụng fetch hoặc các thư viện HTTP (axios, fetch API) để gửi yêu cầu kiểm tra đến server
    // Ví dụ:
    return fetch('http://localhost:3000/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data.exists;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  const handleSubmit = async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error('Mật khẩu và Xác nhận mật khẩu không khớp');
      return;
    }

    const accountExists = await checkExistingAccount(username, email);

    if (accountExists) {
      message.error('Tài khoản đã tồn tại');
    } else {
      const { username, email, password, confirmPassword } = values;

  if (password !== confirmPassword) {
    message.error('Mật khẩu và Xác nhận mật khẩu không khớp');
    return;
  }

  const accountExists = await checkExistingAccount(username, email);

  if (accountExists) {
    message.error('Tài khoản đã tồn tại');
  } else {
    // Gửi thông tin đăng ký (username, password, email) đến server để xử lý
    axios
      .post('http://localhost:3000/users', {
        username,
        password,
        email,
      })
      .then((response) => {
        message.success('Đăng ký thành công');
        setTimeout(()=>{
          location.assign('/login');
        },1000)
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu cần thiết
        // ...
      });
  }
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu và Xác nhận mật khẩu không khớp'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;