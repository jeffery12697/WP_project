import { useState } from 'react';
import { Form, Input, Button, Checkbox, Space, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { link, Redirect } from '@uiw/react-md-editor';
// import { getMail, loginCheck } from '../api/User';


const Login = ({ setMemberName, setIsLogin, setLoginOrRegister, setMemberMail, islogin }) => {
	const [email, setEmail] = useState("initialState");
	const [password, setPassword] = useState("initialState");

	const Submit = (values) => {

		setIsLogin(true);
		setMemberName(values.username);

	};


	const onChange_Email = (e) => {
		setEmail(e.target.value)
	}
	const onChange_Password = (e) => {
		setPassword(e.target.value)
	}

	const onClickRegister = (e) => {
		e.preventDefault();
		setLoginOrRegister("register")
	}

	return (
		<div className="site-card-border-less-wrapper">
			{islogin}
			<Card title="登入" bordered={true} style={{ width: 300 ,flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{
						remember: true,
					}}
					onFinish={Submit}
				>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: '請輸入您的暱稱!',
								whitespace: true,
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="使用者姓名"
							onChange={onChange_Email}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: '請輸入你的密碼!',
							},
						]}
					>

						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="密碼"
							onChange={onChange_Password}
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>記住我</Checkbox>
						</Form.Item>

						{/* <a className="login-form-forgot" href="">
				忘記密碼
				</a> */}
					</Form.Item>

					<Form.Item>
						<Space>
							<Button type="primary" htmlType="submit" className="login-form-button" onClick>
								登入
							</Button>
							<p>
							</p>
							<a onClick={onClickRegister}> 沒有帳號?馬上註冊!</a>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Login;