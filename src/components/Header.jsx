// src/components/Header.jsx
import { Layout, Menu, Button, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const onSearch = (value) => {
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Menu theme="dark" mode="horizontal" style={{ flex: 1 }}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200, marginRight: '20px' }}
        />
        <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
