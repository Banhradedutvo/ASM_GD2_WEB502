import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

type LoginFormProps = {
  onLoginSuccess: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Đăng nhập thành công
        setUsername('');
        setPassword('');
        notification.success({
          message: 'Đăng nhập thành công',
        });
        onLoginSuccess();
      } else {
        // Đăng nhập thất bại
        const errorData = await response.json();
        notification.error({
          message: 'Đăng nhập thất bại',
          description: errorData.message,
        });
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}>
        <Input value={username} onChange={handleUsernameChange} />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
        <Input.Password value={password} onChange={handlePasswordChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;