import './App.css';
import AddUser from "./users/AddUser";
import SearchUser from "./users/SearchUser";
import { Container, Col, Row } from "react-bootstrap";
import { Router, Routes, Route, useNavigate } from "react-router-dom";
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./Home";
import User from "./User";
import Library from "./Library";
import Register from "./Register";
import Login from "./Login";

export default function App() {

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/account', {replace: true});
  };

  const navigateToUser = () => {
    navigate('/user', {replace: true});
  };

  const navigateToLibrary = () => {
    navigate('/library', {replace: true});
  };

  const navigateToFreeComponent = () => {
    navigate('/free', {replace: true});
  };

  const navigateToAuthComponent = () => {
    navigate('/auth', {replace: true});
  };

  const navigateHome = () => {
    navigate('/', {replace: true});
  };

  return (

    <Row>
      <Col className="text-center">
        <h1>React Virtual Library</h1>

        <section id="navigation">
          <button onClick={navigateHome}>Home</button>
          <hr />
          <button onClick={navigateToLogin}>Login</button>
          <hr />
          <button onClick={navigateToUser}>User</button>
          <hr />
          <button onClick={navigateToLibrary}>Library</button>
          <hr />
          <button onClick={navigateToFreeComponent}>Free Component</button>
          <hr />
          <button onClick={navigateToAuthComponent}>Auth Component</button>
        </section>

        <Routes>
          <Route exact path="/" elemetn={<Home/>} />
          <Route exact path="/account" element={<Account/>} />
          <Route exact path="/user" element={<User/>} />
          <Route exact path="/library" element={<Library/>} />
          <Route exact path="/free" element={<FreeComponent/>} />
          <Route exact path="/auth" element={<AuthComponent/>} />
        </Routes>
      </Col>
    </Row>
  );
}