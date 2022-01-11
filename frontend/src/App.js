import { React, useState, useEffect } from "react";
import './App.css';
import 'antd/dist/antd.min.css'
import {StepBackwardOutlined} from '@ant-design/icons'
import { Button, Menu } from "antd"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Container/LoginPage";
import Navbar from "./Container/Navbar"
import SearchCourse from "./Container/SearchCourse";

import CreateProblem from "./Container/CreateProblem";

import Cookie from "js.cookie";

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [memberMail, setMemberMail] = useState("");


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <div className="tc bg-gray ma0 pa4 min-vh-100">
            <div className="navbar">
            <Navbar memberName={memberName} isLogin={isLogin}
                setMemberName={setMemberName} setIsLogin={setIsLogin}
            />
            </div>
            <SearchCourse />
            </div>
          }
          />
          <Route path="/login"element={
            <div className="tc bg-gray ma0 pa4 min-vh-100">
            <LoginPage isLogin={isLogin} memberName={memberName} setMemberName={setMemberName} setIsLogin={setIsLogin}setMemberMail={setMemberMail} />
            </div>
          }/>
          <Route path="/createProblem" element={
            <div className="tc bg-gray ma0 pa4 min-vh-100">
            <CreateProblem/>
            </div>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
