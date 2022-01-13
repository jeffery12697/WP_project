import { Button, Menu, PageHeader } from "antd"
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js.cookie"
import logo from "../logo.png"


const Navbar = ({memberName, isLogin, setMemberName, setIsLogin}) => {


    const onClick_Logout = async () => {
        // const result = await logoutCheck();
        setIsLogin(false)
        setMemberName('')
        Cookies.remove("memberName");
    }

    return (
    <div className="row" style={{display:"flex"}}>
        <img src={logo} style={{ marginLeft: "10px", width: "120px", height: "80px"}} alt="logo" />

        <PageHeader> 台大考古題交流網站 </PageHeader>
        
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ float: "right", width: "20%", marginRight: "5px"}}>

            <Menu.Item key="1" className="menu-item">
            <Link to="/" style={{ textDecoration: "none" }}> 搜尋課程  </Link>
            </Menu.Item>
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

    </div>
    )
};

export default Navbar;