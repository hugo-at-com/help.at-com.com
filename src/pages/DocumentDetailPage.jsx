// src/pages/DocumentDetailPage.jsx
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Card, Row, Col, Anchor } from 'antd';
import MainLayout from '../components/MainLayout';

const { Title } = Typography;
const { Link: AnchorLink } = Anchor;

// Hàm trích xuất các heading (h2-h6) có id từ nội dung HTML
const getHeadingsFromContent = (htmlContent) => {
  const regex = /<(h[2-6])\s+id="([^"]+)"[^>]*>(.*?)<\/\1>/gi;
  const headings = [];
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    headings.push({
      tag: match[1],
      id: match[2],
      title: match[3],
    });
  }
  return headings;
};

const DocumentDetailPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryParam = queryParams.get('category');

  // Lấy dữ liệu categories từ store
  const categories = useSelector((state) => state.categories.data);

  // Tìm document theo id trong category đã chọn
  const document =
    categoryParam && categories[categoryParam]
      ? categories[categoryParam].find((doc) => String(doc.id) === id)
      : null;

  if (!document) {
    return (
      <MainLayout>
        <Title level={3}>Document not found</Title>
        <Link to="/documents">Back to Documents</Link>
      </MainLayout>
    );
  }

  const headings = getHeadingsFromContent(document.content);
  return (
    <MainLayout>
      <Row gutter={16}>
        <Col span={4}>
          <Anchor affix>
            {headings.map((heading) => (
              <AnchorLink key={heading.id} href={`#${heading.id}`} title={heading.title} />
            ))}
          </Anchor>
        </Col>
        <Col span={20}>
          <Card title={document.name}>
            <div dangerouslySetInnerHTML={{ __html: document.content }} />
          </Card>
          <Link to={`/documents?category=${encodeURIComponent(categoryParam)}`}>
            Back to Documents
          </Link>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default DocumentDetailPage;
