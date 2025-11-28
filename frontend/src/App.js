import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CategoriaPage from './pages/CategoriaPage';
import GastoPage from './pages/GastoPage';
import UsuarioPage from './pages/UsuarioPage';
import Header from './components/Header';
import Footer from './components/Footer';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('usuarioLogado') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <CategoriaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/gastos"
            element={
              <PrivateRoute>
                <GastoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <UsuarioPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
