import { Button, Menu, message } from "antd"
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js.cookie"
import instance from "../api";


const Navbar = ({memberName, isLogin, setMemberName, setIsLogin}) => {

    const onClick_Logout = async () => {
        // const result = await logoutCheck();
        await handleLogout()
        setIsLogin(false)
        setMemberName('')
        Cookies.remove("memberName");
    }

    const displayStatus = (payload) => {
		if (payload.msg) {
			const { type, msg } = payload
			const content = { content: msg, duration: 0.5 }
			switch (type) {
				case 'success':
					message.success(content)
					break
				case 'error':
				default:
					message.error(content)
					break
		  }
		}
	}

    const handleLogout = async () => {
        try {
            const {
                data: { msg },
            } = await instance.post('/user/logout');
            console.log(msg);
            displayStatus({
                type: "success",
                msg: msg,
            });
        }
        catch (error) {
            // console.error(error)
            console.log(error.response.data.msg)
            displayStatus({
                type: "error",
                msg: error.response.data.msg,
            });
        }
    }

    return (
    <>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ float: "right", width: "20%", marginRight: "5px" }}>
            <Menu.Item key="2">
            <Link to="/login" style={{ textDecoration: "none" }}>
                {isLogin
                ?
                <>
                    {/* <div> {memberName + " 您好"} </div> */}
                    <Button onClick={onClick_Logout}> 登出</Button>
                </>
                :
                "登入 / 註冊"}
            </Link>
            </Menu.Item>
        </Menu>
    </>
    )
};

export default Navbar;