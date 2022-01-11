import { useState,useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css'
import { Typography, Button, Input} from 'antd'


const mdKaTeX = `This is to display the 
\`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
in one line

\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

export default function CreateProblem({courseName}) {
    const [summitCourseName, setSummitCourseName] = useState(courseName)
    const [title, setTitle] = useState("")
    return (
    <>
        {
        courseName?
        <Typography.Title>新增一個 $`{courseName}` 問題.</Typography.Title>
        :
        <div>
        <Input
            type="courseName"
            onChange={(e)=> setSummitCourseName(e.target.value)}
            placeholder="課程名稱"
        />
        </div>
        }
        <Typography.Title>問題標題</Typography.Title>
        <Input
            type="courseName"
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="輸入問題標題"
        />
        <Typography.Title>問題</Typography.Title>
        <MDEditor
            value={mdKaTeX}
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
        <div style={{padding:"10px"}}>
        <Button type={"primary"}>
            Submit
        </Button>
        </div>

    </>
    );
}