import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category_id: number;
};

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));

    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));

    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    navigate(`/admin/${key}`);
  };

  const renderMenuItems = (items: any[]) => {
    return items.map((item) => {
      const { key, icon, label, children } = item;
      if (children && children.length > 0) {
        return (
          <Menu.SubMenu key={key} icon={icon} title={label}>
            {renderMenuItems(children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={key} icon={icon}>
          {label}
        </Menu.Item>
      );
    });
  };

  const menuItems = [
    {
      key: 'subUser',
      icon: <UserOutlined />,
      label: 'Users',
      children: users.map((user: any) => ({
        key: `user`,
        label: user.username,
      })),
    },
    {
      key: 'subCategories',
      icon: <LaptopOutlined />,
      label: 'Categories',
      children: categories.map((category: any) => ({
        key: `category`,
        label: category.name,
      })),
    },
    {
      key: 'subProducts',
      icon: <NotificationOutlined />,
      label: 'Products',
      children: products.map((product: Product) => ({
        key: `product/`,
        label: product.name,
      })),
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={menuItems} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: 'white',width:1200 }}>
          <Sider style={{ background: 'white' }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              onClick={({ key }) => handleMenuClick(key as string)}
            >
              {renderMenuItems(menuItems)}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 380,width:500 }}>Content</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default Dashboard;