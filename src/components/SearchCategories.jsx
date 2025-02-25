// src/components/SearchCategories.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Typography, List } from 'antd';

const { Title } = Typography;

const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Lấy dữ liệu categories từ store (dữ liệu có cấu trúc: { categoryName: [{id, name}, ...] })
  const categories = useSelector((state) => state.categories.data);

  // Lọc dữ liệu dựa trên searchTerm
  const filteredCategories = Object.keys(categories).reduce((acc, categoryName) => {
    const items = categories[categoryName];
    // Nếu tên category chứa search term thì hiển thị toàn bộ các document
    if (categoryName.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[categoryName] = items;
    } else {
      // Nếu không, chỉ lấy các document có tên chứa search term
      const matchedItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedItems.length > 0) {
        acc[categoryName] = matchedItems;
      }
    }
    return acc;
  }, {});

  return (
    <div>
      <Input.Search
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {Object.keys(filteredCategories).length === 0 ? (
        <p>Không có kết quả tìm kiếm.</p>
      ) : (
        Object.keys(filteredCategories).map((categoryName, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <Title level={4}>{categoryName}</Title>
            <List
              size="small"
              dataSource={filteredCategories[categoryName]}
              renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default SearchCategories;
