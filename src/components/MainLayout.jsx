// src/components/MainLayout.jsx
import React, { useEffect } from 'react';
import { Layout, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { fetchCategories } from '../store/categoriesSlice';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

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
        {loading ? <Spin style={{ display: 'block', margin: '100px auto' }} /> : children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default MainLayout;
