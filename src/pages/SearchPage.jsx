// src/pages/SearchPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, List, Row, Col } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const { Title } = Typography;

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  // Lấy dữ liệu categories từ store (dữ liệu có cấu trúc: { categoryName: [{ id, name }, ...] })
  const categories = useSelector((state) => state.categories.data);

  // Lọc dữ liệu dựa trên searchTerm:
  // - Nếu tên category chứa searchTerm thì hiển thị toàn bộ các document của category đó.
  // - Nếu không, chỉ hiển thị các document có tên chứa searchTerm.
  const filteredCategories = Object.keys(categories).reduce((acc, categoryName) => {
    const items = categories[categoryName];
    if (categoryName.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[categoryName] = items;
    } else {
      const matchedItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedItems.length > 0) {
        acc[categoryName] = matchedItems;
      }
    }
    return acc;
  }, {});

  return (
    <MainLayout>
      <div style={{ padding: '20px' }}>
        <Title level={3}>Kết quả tìm kiếm: {searchTerm}</Title>
        {Object.keys(filteredCategories).length === 0 ? (
          <p>Không có kết quả tìm kiếm.</p>
        ) : <Row gutter={[16, 16]}>
            {
                Object.keys(filteredCategories).map((categoryName, index) => (
                    <Col key={index} span={6}>
                        <div>
                            <Title level={4}>{categoryName}</Title>
                            <List size="small" dataSource={filteredCategories[categoryName]} renderItem={(item) => <List.Item><Link to={`/document/${encodeURIComponent(item.id)}?category=${encodeURIComponent(categoryName)}`}>{item.name}</Link></List.Item>
                            }
                            />
                        </div>
                    </Col>
                ))
            }
        </Row>
        }
      </div>
    </MainLayout>
  );
};

export default SearchPage;
