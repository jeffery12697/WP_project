import React, { useState, useEffect, useRef } from 'react';
import { Modal, Space, Tag } from 'antd';
import { Card, Comment, Avatar, Form, Button, List, Input, Tooltip, message } from 'antd';
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import MarkdownPreview from '@uiw/react-markdown-preview';
import instance from '../api';

import 'katex/dist/katex.min.css' 

const { TextArea } = Input;


const ProblemModal = ({ item, isLogin, memberName }) => {

    const [problemModalFlag, setProblemModalFlag] = useState(false)
    const [replyList, setreplyList] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [teacher, setTeacher] = useState("")
    const [publisher, setPublisher] = useState("")
    const [tags, setTags] = useState([])
    const [likes_num, setLikes_num] = useState(0)
    const [able_to_like, setAble_to_like] = useState(true)
    const [time, setTime] = useState("")

    const [newReply, setNewReply] = useState(0)

    useEffect(async () => {
		let info = await handleProblem();
        setreplyList(info.answers);
        setTitle(info.title);
        setDescription(info.description);
        setTeacher(info.teacher);
        setPublisher(info.publisher);
        setTags(info.tags);
        setLikes_num(info.likes_num);
        setAble_to_like(info.able_to_like);
        setTime(info.time);
	}, [newReply]);

    const handleProblem = async () => {
        try {
            const { data } = await instance.get('/problem', {
                params: {
                    username: memberName,
                    problem_id: item.problem_id
                }
            });
            console.log(data)
            return data
        } 
        catch (error) {
            // console.error(error)
            console.log(error.response.data.msg)
            displayStatus({
				type: "error",
				msg: error.response.data.msg,
			});
            return
        }
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

    const pressProblem =  (problem_id) => {
        console.log('press problem', problem_id)
        console.log(description)
        console.log(replyList)
        console.log(memberName)
        setProblemModalFlag(prev => !prev)
    }

    return (
        <>
            <div className='problemContent' >
                <List.Item.Meta
                    avatar={<Avatar src={`https://joeschmoe.io/api/v1/${publisher}`} />}
                    title={<a style={{ textDecorationLine: 'underline' }} onClick={() => pressProblem(item.problem_id)} >{title}</a>}
                    description={(
                        <>
                            <>{publisher}</>
                            <> </>
                            <> --</>
                            <> </>

                            <Tooltip title={moment(time).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(time).fromNow()}</span>
                            </Tooltip>


                        </>)
                    }

                />

                {tags.map((tag) => <Tag>{tag}</Tag>)}

            </div>


            <Modal className='poroblemCommentModal' visible={problemModalFlag} onCancel={e => setProblemModalFlag(false)} onOk={e => setProblemModalFlag(false)} cancelButtonProps={{ style: { display: 'none' } }}>
                <>
                    <Comment
                        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                        author={<a style={{ fontSize: "20px" }}>{publisher}</a>}
                        avatar={<Avatar src={`https://joeschmoe.io/api/v1/${publisher}`} alt={publisher} />}
                        content={
                            // <ReactMarkdown
                            // children={item.content}
                            // remarkPlugins={[remarkMath]}
                            // rehypePlugins={[rehypeKatex]}
                            // />
                            <MarkdownPreview source={description}/>
                            // <p>hi</p>
                        }
                        datetime={(
                            <Tooltip title={moment(time).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(time).fromNow()}</span>
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
                                    author={reply.publisher}
                                    avatar={`https://joeschmoe.io/api/v1/${reply.publisher}`}
                                    content={reply.content}
                                    datetime={
                                        (
                                            <Tooltip title={moment(reply.time).format('YYYY-MM-DD HH:mm:ss')}>
                                                <span>{moment(reply.time).fromNow()}</span>
                                            </Tooltip>
                                        )
                                    }
                                />
                            </li>
                        )}
                    />
                    {
                        isLogin ?
                            <CommentBlock problem_id={item.problem_id} memberName={memberName} setreplyList={setreplyList} newReply={newReply} setNewReply={setNewReply}/>
                            : null
                    }

                </>
            </Modal>
        </>
    )
}

export default ProblemModal

const CommentBlock = ({ problem_id, memberName, setreplyList, newReply, setNewReply }) => {

    const [replyVal, setreplyVal] = useState('')

    const submitReply = async () => {
        await handleCreateAnswer();
        setNewReply(newReply+1);
        console.log(memberName)
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

    const handleCreateAnswer = async () => {
        if (replyVal.length > 0) {
            try {
                const {
                    data: { msg },
                } = await instance.post('/create/answer', {
                    problem_id,
                    content: replyVal,
                    username: memberName
                });
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
        else {
            alert("You have to fill in at least some contents!")
        }
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