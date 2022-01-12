import React, { useState } from 'react';
import { List, Avatar, Space, Alert, Button, Modal, message } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';



const IconText = ({ icon, user_likes, iconNum, memberName }) => {

    if (icon != LikeOutlined) user_likes = false

    const [pressColor, setpressColor] = useState(user_likes)
    // const [showModal, setshowModal] = useState(false)
    const [showText, setshowText] = useState(iconNum)



    const pressButton = async () => {

        console.log('pressButton')
        console.log('user_likes', user_likes)
        console.log('iconNum', iconNum)


        if (memberName == '') {
            console.log('plz login')
            message.info('請先登入ㄛ')
            return
        }
        if (icon == LikeOutlined) {
            // const res = await likes_post(post_id, memberName)
            // console.log(res)
            setpressColor(prev => !prev)
            setshowText(prev => prev + (pressColor ? -1 : 1))

        }
        if (icon == DeleteOutlined) {
            message.info('刪除貼文')
            // const res = await delete_post(post_id, memberName)
            // console.log(res)

            // const data = await getDepPost(department, memberName);
            // setDepPostData(data)

            // setshowModal(true)
            // onDeleteNotification()
            // setshowModal(false)
        }
        if (icon == MessageOutlined) {
            setpressColor(prev => !prev)

        }
        // setshowModal(prev => !prev)

    }

    return (
        <Space >
            <div style={pressColor ? { color: 'blue' } : null} >
                {React.createElement(icon, { onClick: pressButton })}
            </div>
            {showText}
        </Space >
    );

}

export default IconText