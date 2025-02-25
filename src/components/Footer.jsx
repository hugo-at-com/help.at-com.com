// src/components/Footer.jsx
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
      }}>
      Copyright © ATC . All rights reserved.

    </Footer>
  );
};

export default FooterComponent;
