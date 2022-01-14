import { message } from "antd"
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js.cookie"
import instance from "../api";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../logo.png'
import { width } from "@mui/system";


const Navbare = ({memberName, isLogin, setMemberName, setIsLogin}) => {

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
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ float: "right", width: "20%", marginRight: "5px" }}>
            <Menu.Item key="2">
            <Link to="/login" style={{ textDecoration: "none" }}>
                {isLogin
                ?
                <>

                    <Button onClick={onClick_Logout}> 登出</Button>
                </>
                :
                "登入 / 註冊"}
            </Link>
            </Menu.Item>
        </Menu> */}
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton> */}
                <img src={logo} style={{width:"70px", height:"70px"}}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    K
                </Typography>
                {isLogin ?

                <>
                    <Link to="/createProblem" style={{ textDecoration: "none" ,color:"white"}}> 創建問題 </Link>
                    <Button onClick={onClick_Logout}> 登出 </Button>
                </>

                :
                <Link to="/login" style={{ textDecoration: "none" ,color:"white"}}>登入 / 註冊</Link>
                }
                </Toolbar>
            </AppBar>
        </Box>
    </>
    )
};

export default Navbare;