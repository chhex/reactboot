// src/App.jsx
import AppNavbar from './AppNavbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import ClientList from './ClientList';
import ClientEdit from './ClientEdit';

export default function App() {
  return (
    <div className="container py-3">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/:id" element={<ClientEdit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
