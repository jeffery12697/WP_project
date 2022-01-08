import { React, useState, useEffect } from "react";
import './App.css';
import 'antd/dist/antd.min.css'
import {StepBackwardOutlined} from '@ant-design/icons'
import { Button, Menu } from "antd"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Container/LoginPage";
import Navbar from "./Container/Navbar"

import Cookie from "js.cookie";

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [memberMail, setMemberMail] = useState("");


  return (
    <div className="App">
      <Button />
      <Router>
        <>
        <div className="navbar">
          <Navbar memberName={memberName} isLogin={isLogin}
              setMemberName={setMemberName} setIsLogin={setIsLogin}
          />
        </div>
        <Routes>
          <Route exact path="/" element={<h1>dekmd</h1>}/>
          <Route path="/login"element={<LoginPage isLogin={isLogin} memberName={memberName} setMemberName={setMemberName} setIsLogin={setIsLogin}setMemberMail={setMemberMail} />}/>
          {/* <Route path="/login">
            <LoginPage isLogin={isLogin} memberName={memberName} setMemberName={setMemberName} setIsLogin={setIsLogin}setMemberMail={setMemberMail} />
          </Route> */}
        </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
