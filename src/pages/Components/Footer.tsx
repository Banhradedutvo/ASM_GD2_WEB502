import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '16px' }}>
        Designed by Your Company &copy; {new Date().getFullYear()}
      </div>
      <div>
        Powered by Ant Design
      </div>
    </Footer>
  );
};

export default AppFooter;