import { List , Tag} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, DislikeOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import IconText from './IconText';
import ProblemModal from './ProblemModal';



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
                                    <IconText icon={LikeOutlined} iconNum={item.likes_num} key="list-vertical-like-o" user_likes={item.user_likes} memberName={memberName} />,
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

                                    />
                                }
                            >
                            <ProblemModal item={item} isLogin={isLogin} memberName={memberName} />
                            </List.Item>

                        
                    )
                }
                }
            />

        </div >
    )

}

export default ProblemListView