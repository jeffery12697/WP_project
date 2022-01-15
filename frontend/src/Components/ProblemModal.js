import React, { useState, useEffect, useRef } from 'react';
import { Modal, Space, Tag } from 'antd';
import { Card, Comment, Avatar, Form, Button, List, Input, Tooltip, message } from 'antd';
import moment from 'moment';
import MarkdownPreview from '@uiw/react-markdown-preview';
import instance from '../api';
import Replyicon from './Replyicon';
import Markdown from './Markdown';
import MDEditor from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css'


import 'katex/dist/katex.min.css' 
import IconText from './Replyicon';

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
    const [newLike, setNewLike] = useState(0)

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
	}, [newReply, newLike]);


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
        console.log("Hiiii")
        console.log(replyList)
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
                            <MDEditor
                                value={description}
                                previewOptions={{
                                    components: {
                                    code: ({ inline, children = [], className, ...props }) => {
                                        const txt = children[0] || '';
                                        if (inline) {
                                        if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                            const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                            throwOnError: false,
                                            });
                                            return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                        }
                                        return <code>{txt}</code>;
                                        }
                                        if (
                                        typeof txt === 'string' &&
                                        typeof className === 'string' &&
                                        /^language-katex/.test(className.toLocaleLowerCase())
                                        ) {
                                        const html = katex.renderToString(txt, {
                                            throwOnError: false,
                                        });
                                        return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                        }
                                        return <code className={String(className)}>{txt}</code>;
                                    },
                                    },
                                }}
                                preview="preview"
                                hideToolbar={true}
                            />
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
                                    content={
                                        <>
                                            <MDEditor
                                                value={reply.content}
                                                previewOptions={{
                                                    components: {
                                                    code: ({ inline, children = [], className, ...props }) => {
                                                        const txt = children[0] || '';
                                                        if (inline) {
                                                        if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                                            const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                                            throwOnError: false,
                                                            });
                                                            return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                                        }
                                                        return <code>{txt}</code>;
                                                        }
                                                        if (
                                                        typeof txt === 'string' &&
                                                        typeof className === 'string' &&
                                                        /^language-katex/.test(className.toLocaleLowerCase())
                                                        ) {
                                                        const html = katex.renderToString(txt, {
                                                            throwOnError: false,
                                                        });
                                                        return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                                        }
                                                        return <code className={String(className)}>{txt}</code>;
                                                    },
                                                    },
                                                }}
                                                preview="preview"
                                                hideToolbar={true}
                                            />
                                            <Replyicon user_likes={reply.able_to_like} iconNum={reply.likes_num} memberName={memberName} answer_id={reply.answer_id} newLike={newLike} setNewLike={setNewLike}/>
                                        </>
                                    }
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
        setreplyVal("")
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
            <MDEditor
                value={replyVal}
                onChange={(val) => {
                    setreplyVal(val);
                }}
                previewOptions={{
                    components: {
                    code: ({ inline, children = [], className, ...props }) => {
                        const txt = children[0] || '';
                        if (inline) {
                        if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                            const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                            throwOnError: false,
                            });
                            return <code dangerouslySetInnerHTML={{ __html: html }} />;
                        }
                        return <code>{txt}</code>;
                        }
                        if (
                        typeof txt === 'string' &&
                        typeof className === 'string' &&
                        /^language-katex/.test(className.toLocaleLowerCase())
                        ) {
                        const html = katex.renderToString(txt, {
                            throwOnError: false,
                        });
                        return <code dangerouslySetInnerHTML={{ __html: html }} />;
                        }
                        return <code className={String(className)}>{txt}</code>;
                    },
                    },
                }}
            />
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

