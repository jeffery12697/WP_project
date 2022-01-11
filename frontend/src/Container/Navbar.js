import { Button, Menu } from "antd"
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js.cookie"


const Navbar = ({memberName, isLogin, setMemberName, setIsLogin}) => {


    const onClick_Logout = async () => {
        // const result = await logoutCheck();
        setIsLogin(false)
        setMemberName('')
        Cookies.remove("memberName");
    }

    return (
    <>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ width: "20%", marginRight: "5px" }}>
            <Menu.Item key="1" className="menu-item">
                <Link to="/" style={{ textDecoration: "none" }}> 課程搜尋  </Link>
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
    </>
    )
};

export default Navbar;