import { useState,useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css'
import { Typography, Button, Input, message, Form, Space, Card} from 'antd'
import { Link } from "react-router-dom";
import instance from '../api';


const mdKaTeX = `This is to display the 
\`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
in one line

\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

export default function CreateProblem({courseName, username}) {
    const [summitCourseName, setSummitCourseName] = useState(courseName)
    const [title, setTitle] = useState("")
    const [teacher, setTeacher] = useState("")
    const [content, setContent] = useState("")
    const [answer, setAnswer] = useState("")
    const [tags, setTags] = useState([])

    const submit = async (values) => {
        await handleCreateProblem();
    };

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

    const handleCreateProblem = async () => {
        if (title.length > 0 && content.length > 0) {
            try {
                const {
                    data: { msg },
                } = await instance.post('/create/problem', {
                    course_name: summitCourseName,
                    username,
                    title,
                    teacher,
                    description: content,
                    answer,
                    tags
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
            alert("You have to fill in at least a course name, a title and some descriptions!")
        }
    }

    return (
    <>
        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 800 }}>
        <Form
					name="normal_login"
					className="login-form"
					initialValues={{
						remember: true,
					}}
					onFinish={submit}
				>
					<Form.Item
						name="courseName"
                        label="課程名稱"
						rules={[
							{
								required: true,
								message: '請輸入課程名稱!',
							},
						]}
					>
						<Input.TextArea
							onChange={(e)=>{setSummitCourseName(e.target.value)}}
						/>
					</Form.Item>
					<Form.Item
						name="title"
                        label="問題標題"
						rules={[
							{
								required: true,
							},
						]}
					>

						<Input.TextArea
							onChange={(e)=> setTitle(e.target.value)}
						/>

					</Form.Item>
					<Form.Item
                        label="問題描述"
                    >
                    <MDEditor
                        value={content}
                        onChange={(val) => {
                            setContent(val);
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

					<Form.Item>
						<Space>
                        <Link to="\">
                            <Button type={"primary"} onClick={submit}>
                                Submit
                            </Button>
                        </Link>
						</Space>
					</Form.Item>
				</Form>
        </Card>

    </>
    );
}