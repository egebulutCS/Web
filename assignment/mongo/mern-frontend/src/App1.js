// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from "./AddUser";
import SearchUser from "./SearchUser";
import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Account from './Account.js';
import FreeComponent from "./FreeComponent.js"
import AuthComponent from './AuthComponent.js';
import ProtectedRoutes from "./ProtectedRoutes";
import Cookies from "universal-cookie";
import { useState } from 'react';

function App() {

  const { user, setUser, isLoading } = useFindUser();

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const Navigation = () => (
    <nav>
      <Link to="/free">Free Component</Link><br />
      <Link to="/auth">Auth Component</Link>
    </nav>
  );

  return (
    <>
      <h1>Authentication</h1>

      <Navigation />

      <Routes>
        <Route index element={<Account />} />
        <Route path="free" element={<FreeComponent/>} />
        <Route path="auth" element={<AuthComponent/>} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  )
}

export default App