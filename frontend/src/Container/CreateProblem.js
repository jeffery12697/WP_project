import { useState,useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css'
import { Typography, Button } from 'antd'


const mdKaTeX = `This is to display the 
\`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
in one line

\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

export default function CreateProblem({coursename}) {
    return (
    <>
        <Typography.Title>Create a course problem.</Typography.Title>
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