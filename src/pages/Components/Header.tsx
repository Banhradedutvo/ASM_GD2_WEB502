import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="logo">Logo</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">Cart</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />} style={{ marginLeft: 'auto' }}>
          <Link to="/signup">Đăng ký</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />} style={{ marginRight: 0 }}>
          <Link to="/login">Đăng nhập</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;