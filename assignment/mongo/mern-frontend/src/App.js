import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { UserContext } from './UserContext';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Login from './Login';
import Landing from './Landing';
import Home from './Home';
import NotFound from './NotFound';
import useFindUser from './useFindUser';

function App() {
  
  const { user, setUser, isLoading } = useFindUser();

  return (
   <Router>
       <UserContext.Provider value={{ user, setUser, isLoading }}>
       <Routes>
          <Route exact path="/" component={Landing}/>  
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route exact path='/' element={PrivateRoute}>
            <Route path="/home" component={Home}/>
          </Route>
          <Route component={NotFound}/>
        </Routes>
      </UserContext.Provider>
   </Router>
  );
}

export default App;