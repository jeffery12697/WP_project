import React, { useState, useEffect, useRef } from 'react';
import { Modal, Space } from 'antd';
import { Card, Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';

const { TextArea } = Input;


const ProblemModal = ({ item, isLogin, memberName }) => {

    const [problemModalFlag, setProblemModalFlag] = useState(false)
    const [replyList, setreplyList] = useState([])


    const pressProblem = async (problem_id) => {
        console.log('press problem', problem_id)


        setProblemModalFlag(prev => !prev)
    }

    return (
        <>
            <div className='problemContent' >
                <List.Item.Meta
                    avatar={<Avatar src={`https://joeschmoe.io/api/v1/${item.author}`} />}
                    title={<a style={{ textDecorationLine: 'underline' }} onClick={() => pressProblem(item.problem_id)} >{item.title}</a>}
                    description={(
                        <>
                            <>{item.author}</>
                            <> </>
                            <> --</>
                            <> </>

                            <Tooltip title={moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(item.datetime).fromNow()}</span>
                            </Tooltip>


                        </>)
                    }

                />
                <div className='text' onClick={() => pressProblem(item.problem_id)} style={{ cursor: 'pointer' }}>

                    {item.content}

                </div>
            </div>


            <Modal className='poroblemCommentModal' visible={problemModalFlag} onCancel={e => setProblemModalFlag(false)} onOk={e => setProblemModalFlag(false)} cancelButtonProps={{ style: { display: 'none' } }}>
                <>
                    <Comment
                        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                        author={<a style={{ fontSize: "20px" }}>{item.author}</a>}
                        avatar={<Avatar src={`https://joeschmoe.io/api/v1/${item.author}`} alt={item.author} />}
                        content={
                            <p>
                                {item.content}
                            </p>
                        }
                        datetime={(
                            <Tooltip title={moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(item.datetime).fromNow()}</span>
                            </Tooltip>
                        )}
                    >
                    </Comment>
                    <List
                        className="comment-list"
                        header={`${replyList.length} replies`}
                        itemLayout="horizontal"
                        dataSource={replyList}
                        renderItem={reply => (
                            <li>
                                <Comment
                                    // actions={item.actions}
                                    author={reply.username}
                                    avatar={`https://joeschmoe.io/api/v1/${reply.username}`}
                                    content={reply.content}
                                    datetime={
                                        (
                                            <Tooltip title={moment(reply.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                                <span>{moment(reply.datetime).fromNow()}</span>
                                            </Tooltip>
                                        )
                                    }
                                />
                            </li>
                        )}
                    />
                    {
                        isLogin ?
                            <CommentBlock problem_id={item.problem_id} memberName={memberName} setreplyList={setreplyList} />
                            : null
                    }

                </>
            </Modal>
        </>
    )
}

export default ProblemModal

const CommentBlock = ({ problem_id, memberName, setreplyList }) => {

    const [replyVal, setreplyVal] = useState('')

    const submitReply = async () => {


    }

    return (
        <>
            <Form.Item label="留言">
                <TextArea placeholder="input text" rows={2} onChange={e => setreplyVal(e.target.value)} value={replyVal} />
            </Form.Item>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center"
                }}
            >
                <Button size='large' htmlType="submit" onClick={submitReply} type="primary">
                    新增
                </Button>
            </div>
        </>
    )
}