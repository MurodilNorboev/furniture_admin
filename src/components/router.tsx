import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from './login/register';
import { useState, useEffect } from 'react';
import Login from './login/login';
import JoyOrderDashboardTemplates from '../apps';
import OrderTables from './tests/ts';

const RouterComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  

  return (
    <Routes>
      <Route path='/login' element={<Login  />} />
      <Route path='/' element={<Login  />} />
      <Route path='/register' element={<Register />} />
      <Route path='/r' element={<OrderTables />} />

      {/* <Route path='/' element={<JoyOrderDashboardTemplate isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />  */}
      {/* <Route path='/*' element={<JoyOrderDashboardTemplate isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> */}  {/* <AddTodo /> */} 
      
      <Route path='/*' element={<JoyOrderDashboardTemplates isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/*' element={<JoyOrderDashboardTemplates isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
  );
};

export default RouterComponent;

