import React, { useEffect } from 'react';
import { Typography, List, Button, Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/categoriesSlice';

const { Title } = Typography;

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories, loading, error } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <Spin style={{ display: 'block', margin: '100px auto' }} />;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <MainLayout>
      <Row gutter={[16, 16]}>
        {Object.keys(categories).map((categoryName, index) => (
          <Col key={index} span={6}>
            <div>
              <Title level={3}>{categoryName}</Title>
              <List
                size="small"
                dataSource={categories[categoryName].slice(0, 5)}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={`/document/${encodeURIComponent(item.id)}?category=${encodeURIComponent(categoryName)}`}>{item.name}</Link>
                  </List.Item>
                )}
              />
              <Button type="link">
                <Link to={`/documents?category=${encodeURIComponent(categoryName)}`}>
                  Xem tất cả
                </Link>
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default HomePage;
