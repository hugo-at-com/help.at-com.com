// App.jsx
import React, { useEffect } from "react";
import {
	Routes,
	Route
} from "react-router-dom";

import api from './api';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import SearchPage from "./pages/SearchPage";

function App() {
  const token = localStorage.getItem('token');
	const [auth, setAuth] = React.useState(() => Boolean(token));

	useEffect(() => {
		if (auth) api.get(`/auth/validate_token`).then((response) => {
			if (response.data.status) {
			setAuth(true);
			} else {
			setAuth(false);
			}
		}).catch((error) => {
			console.error("Lỗi khi xác thực:", error);
			setAuth(false);
		});
  	}, [auth]);

	if (!auth) return <LoginPage />;

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/documents" element={<DocumentsPage />} />
			<Route path="/search" element={<SearchPage />} />
			<Route path="/document/:id" element={<DocumentDetailPage />} />
		</Routes>
	);
}

export default App;
