import './App.css';
import {BrowserRouter as Router, Route, Routes, Link,} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import {AuthContext} from './helpers/AuthContext';
import {useEffect, useState} from "react";
import axios from 'axios'; 


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  


  useEffect(()=>{
      axios.get('http://localhost:3001/auth/user',{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response)=>{
        console.log(response.data);
        if(response.data.error){
          setAuthState({...AuthContext, status:false});
        }else{
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  },[]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  
  };
  return ( 
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>

      <div className='navbar'>
         {!authState.status ? (
          <>
           <div className='left'>
            <Link to="/login">Login</Link>
            <Link to="/registration">Sign Up</Link>
            </div>
          </>
          ) : (
          <>
          <div className='left'>
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create Post </Link>
            </div>
            <div className='right'>
              {authState.status && (
                <div className='welcomemsg'>Hello, {authState.username}</div>
                )}
                <Link to="/login" onClick={logout}>Logout</Link>
                </div>
           </>
           )}
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/changepassword' element={<ChangePassword />} />
        </Routes>
      </Router>  
      </AuthContext.Provider>
    </div>
  );
}

export default App;
