import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

type User = {
  id: number;
  username: string;
  email: string;
};

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Lấy danh sách người dùng từ API khi component được hiển thị
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
    setIsLoading(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingUser(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        // Gửi yêu cầu cập nhật thông tin người dùng đến API
        await axios.put(`http://localhost:3000/users/${editingUser.id}`, values);
        setUsers(prevUsers =>
          prevUsers.map(user => (user.id === editingUser.id ? { ...user, ...values } : user))
        );
      } else {
        // Gửi yêu cầu tạo người dùng mới đến API
        const response = await axios.post('http://localhost:3000/users', values);
        const newUser: User = response.data;
        setUsers(prevUsers => [...prevUsers, newUser]);
      }
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi tạo/chỉnh sửa người dùng:', error);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button type="primary" icon={<UserOutlined />} onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDeleteUser(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (user: User) => {
    try {
      if (!confirm('Bạn có muốn xóa không?')) return;
      await axios.delete(`http://localhost:3000/users/${user.id}`);
      // Cập nhật danh sách người dùng sau khi xóa thành công
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
      console.log('Delete user:', user);
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create User
      </Button>
      <Table columns={columns} dataSource={users} loading={isLoading} rowKey="id" />

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingUser ? 'Save' : 'Create'}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
           label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagementPage;