import React, { useState } from "react";
import { Form, Input, Button, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../api';

const LoginPage = () => {
	const [error, setError] = useState("");
	const onFinish = async (values) => {
		const {  username, password } = values
		setError("");
		try {
            if(!username) setError("Vui lòng nhập tên đăng nhập!");
            if(!password) setError("Vui lòng nhập mật khẩu!");
			const response = await api.post('/auth/login', { username, password });
			if (response.data.status) {
                localStorage.setItem('token', response.data.token);
				window.location.href = "/";
			} else setError("Tên đăng nhập hoặc mật khẩu không đúng!");
		} catch (err) {
			setError("Có lỗi xảy ra trong quá trình đăng nhập.");
		}
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f2f5' }}>
            <Card title="Đăng nhập" style={{ width: 300 }}>
                <Form name="login_form" onFinish={onFinish}>
                    {error && <div className="error"><Alert message={ error } type="error" /></div>}
                    <Form.Item name="username" rules={[{ required: false, message: 'Vui lòng nhập tên đăng nhập!' }]} >
                        <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: false, message: 'Vui lòng nhập mật khẩu!' }]} >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Đăng nhập</Button>
                    </Form.Item>
                </Form>
            </Card>
		</div>
	);
};

export default LoginPage;
