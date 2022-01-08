import {Result, Button} from "antd";
import {SmileOutlined} from "@ant-design/icons"

const HaveLogin = ({memberName}) =>{
	return(
		<Result
			icon={<SmileOutlined twoToneColor="red"/>}
			title={`${memberName} 您好~`}
			extra={<div>歡迎使用本網站</div>}
		/>
	)
}

export default HaveLogin;