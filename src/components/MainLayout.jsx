// src/components/MainLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <HeaderComponent />
      <Content
        style={{
          padding: '50px',
          marginTop: 64,
          marginBottom: 64,
          minHeight: 'calc(100vh - 128px)',
        }}
      >
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default MainLayout;
