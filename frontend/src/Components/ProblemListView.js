import { List, Tag, Form, Select} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, DislikeOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import IconText from './IconText';
import ProblemModal from './ProblemModal';



const children = ["midterm", "final", "solved", "quiz", "test", "homework"]


const options = [{ value: 'solved', label:"solved", color:"gold" }, { value: 'midterm', label:"midterm", color:"lime" }, { value: 'final', label:"final", color:"green" }, { value: 'test', label:"test", color:"cyan" }
                ,{value: 'quiz', label:'quiz'} , {value: 'homework', label:'homework'} 
]

function tagRender(props) {
    const { label, value, closable, onClose, color } = props;
    const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
        color={value === "solved"? "gold" : value === "midterm"? "lime" : value === "final" ?"green": value === "test" ? "cyan" : value === "quiz" ? "red" : value === "homework" ? "orange" :"silver"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
        >
        {label}
        </Tag>
    );
}

const ProblemListView = ({ courseProblemData, isLogin, memberName}) => {

    const [filterCourseProblemData, setFilterCourseProblemData] = useState([...courseProblemData])


    useEffect(() => {

        setFilterCourseProblemData([...courseProblemData])

    }, [courseProblemData])


    return (
        <>
        <Form >
            <Form.Item
            >
            <Select
                mode="tags"
                showArrow
                tagRender={tagRender}
                style={{ width: '50%' }}
                options={options}
                onChange={(value)=>{
                    console.log(value)
                    if(value.length === 0){
                        setFilterCourseProblemData([...courseProblemData])
                        return
                    }
                    const filterData = []
                    for(let i = 0; i < courseProblemData.length; i++){
                        for(let j = 0; j < courseProblemData[i].tags.length; j++){
                            for(let k = 0; k < value.length; k++){
                                if(value[k] === courseProblemData[i].tags[j]){
                                    filterData.push(courseProblemData[i])
                                }
                                else if(courseProblemData[i].title.includes(value[k])){
                                    filterData.push(courseProblemData[i])
                                }
                                else if(courseProblemData[i].teacher.includes(value[k])){
                                    filterData.push(courseProblemData[i])
                                }
                            }
                        }
                    }
                    setFilterCourseProblemData([...filterData])
                }}
            >

            {children}

            </Select>
            </Form.Item>
        </Form>
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
                dataSource={filterCourseProblemData}
                footer={
                    <div>
                        <b>Copyright © 2022 NTU KaoGuTi TEAM.</b>  All rights reserved.
                    </div>
                }
                renderItem={(item, index) => {

                    return (
                        <List.Item
                            className="problemCard"
                            key={item.problem_id}
                            actions={[
                                <IconText icon={LikeOutlined} iconNum={item.likes_num} key="list-vertical-like-o" user_likes={item.able_to_like} memberName={memberName} problem_id={item.problem_id}/>,
                                <IconText icon={MessageOutlined} iconNum={item.answers_num} key="list-vertical-message" user_likes={item.able_to_like} memberName={memberName} problem_id={item.problem_id}/>,
                                (memberName == item.publisher && false) ?
                                    <IconText icon={DeleteOutlined} iconNum={""} key="list-vertical-message" memberName={memberName} problem_id={item.problem_id}/>
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

        </>
        
    )

}

export default ProblemListView