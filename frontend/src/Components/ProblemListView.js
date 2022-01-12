import { List } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, DislikeOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import IconText from './IconText';

// import { get_post_reply } from "../api/DepPost";


const ProblemListView = ({ courseProblemData, isLogin, memberName}) => {


    return (
        <div className='problemList' >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 8,
                }}
                dataSource={courseProblemData}
                footer={
                    <div>
                        <b>Copyright © 2021 NTU TEAM.</b>  All rights reserved.
                    </div>
                }
                renderItem={(item, index) => {

                    return (
                        <List.Item
                            className="problemCard"
                            key={item.problem_id}
                            actions={[
                                // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} iconNum={item.likes_num} key="list-vertical-like-o" user_likes={item.user_likes} memberName={memberName} />,
                                // <IconText icon={DislikeOutlined} text="30" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} iconNum={item.problem_reply_num} key="list-vertical-message" user_likes={item.user_likes} memberName={memberName}/>,
                                (memberName == item.author) ?
                                    <IconText icon={DeleteOutlined} iconNum={""} key="list-vertical-message" memberName={memberName} />
                                    : null

                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={`https://source.unsplash.com/random/200x150?sig=${index}`}
                                // src="https://media-cdn.tripadvisor.com/media/photo-s/18/4f/7d/fc/caption.jpg"
                                // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >

                        </List.Item>

                    )
                }
                }
            />

        </div >
    )

}

export default ProblemListView