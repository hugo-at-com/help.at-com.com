// src/pages/DocumentsPage.jsx
import React from 'react';
import { List, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const { Title } = Typography;

const DocumentsPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryParam = queryParams.get('category');

  // Lấy dữ liệu categories từ store
  const categories = useSelector((state) => state.categories.data);

  // Nếu có category thì hiển thị danh sách document của category đó
  const documents =
    categoryParam && categories[categoryParam]
      ? categories[categoryParam]
      : [];

  return (
    <MainLayout>
      <Title level={3}>
        Documents {categoryParam ? `- ${categoryParam}` : ''}
      </Title>
      <List
        dataSource={documents}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/document/${item.id}?category=${encodeURIComponent(categoryParam)}`}>
              {item.name}
            </Link>
          </List.Item>
        )}
      />
      <Link to={`/`}>
        Back to Home
      </Link>
    </MainLayout>
  );
};

export default DocumentsPage;
