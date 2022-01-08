import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Space, Card} from "antd";
import { useState,useEffect } from 'react';


import Login from "../Components/Login"
import Register from "../Components/Register"
import HaveLogin from '../Components/HaveLogin';


const LoginPage =({isLogin, memberName,setMemberName, setIsLogin, setMemberMail}) =>{
	
	const [loginOrRegister,setLoginOrRegister] = useState("login")
	return (
		<>
		{
		isLogin
		?
		<HaveLogin memberName={memberName}/>
		:
		<div className="login">
			{loginOrRegister === "login" 
				? 
				<Login setMemberName={setMemberName} setIsLogin={setIsLogin} setLoginOrRegister={setLoginOrRegister} setMemberMail={setMemberMail}></Login>
				:
				<Register setLoginOrRegister={setLoginOrRegister}></Register>
			}
		</div>
		}
		</>
		)
}
export default LoginPage;