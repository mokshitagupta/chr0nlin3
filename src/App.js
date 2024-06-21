
import './App.css';
import {React, useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import Homepage from './components/Homepage.jsx';
import Dashboard from './components/Dashboard.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import DeleteAccount from './components/DeleteAccount.jsx';
import Feed from './components/Feed.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Reset from './components/Reset.jsx';
import SetupAccount from './components/SetupAccount.jsx';
import AddMedia from './components/AddMediaModal';
import EditProfile from './components/EditProfile';
import SearchPage from './components/SearchPage.jsx'
import MediaPage from './components/MediaPage.jsx'
import Testing from './components/Testing.jsx';


import Error404 from './components/Error404';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}) => {
  console.log(user, "paths protect")
  if (user==false) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};




function App() {

  const [auth, setAuth] = useState(false)

  // useEffect(() => {
  //   //TODO: ADD A CATCH FOR PAGES THAT DONT NEED AUTH

  //   console.log(auth, "before")
  //   const id = sessionStorage.getItem("sessionID")
  //   const userID = sessionStorage.getItem("userID")
  //   console.log(id, userID)

  //   if (!id || !userID){
  //     setAuth(false)
  //   }

  //   const url =  process.env.REACT_APP_BASE_API+ "/auth/verify.php"
        
  //   console.log(url, process.env.REACT_APP_BASE_API, process.env.REACT_APP_BASE_URL)

  //   const config = {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     headers:{
  //       'Authorization': `Bearer ${id}`,}
  //     }

  //   axios.post(url, {'userID':userID}, config)
  //   .then(function (response) {
  //     console.log(response)
  //     setAuth(true)

  //   })
  //   .catch(function (error) {
  //     console.log(error.response)
  //     setAuth(false)
  //   })
    
  // },[window.location])
  
  console.log(process.env.REACT_APP_BASE_URL, "url base <--")
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <Routes>

          {/* protected path */}
          <Route path="/dashboard" element={<Dashboard redirectPath="/login"/>} />

          {/* protected path */}
          <Route path="/setup-account" element={<SetupAccount />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />

          {/* protected path */}
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<Register />} />

          {/* protected path */}
          <Route path="/delete" element={<DeleteAccount />} />
          {/* protected path */}
          <Route path="/feed" element={<Feed />} />
          {/* protected path */}
          <Route path="/add-media" element={<AddMedia />} />
          {/* protected path */}
          <Route path="/EditProfile" element={< EditProfile/>}/>
          <Route path="/" element={<Homepage />} />   
          <Route path="*" element={< Error404/>}/> 
          <Route path = "/Search" element = {<SearchPage/>}/>
          <Route path = "/mediapage" element = {<MediaPage/>}/>
          <Route path = "/Testing" element = {<Testing/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
