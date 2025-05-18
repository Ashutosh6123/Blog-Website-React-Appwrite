import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import './index.css';
import { Header, Footer } from './components/index';
import { login, logout } from './store/authSlice';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect( () => {
    authService.getUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}));
        }
        else{
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if(loading){
    return null;
  }
  else{
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header />
        <main>
          {/* <Outlet /> // To be handled by React Router DOM */}
        </main>
        <Footer />
      </div>
      </div>
    )
  }  

}

export default App
