import { useState,useEffect } from 'react';
import ProblemListView from '../Components/ProblemListView';
import { testProblem } from '../testData';



const CoursePage = ({courseName, isLogin, memberName}) => {
    const [courseProblemData, setCourseProblemData] = useState([...testProblem])

	useEffect(async () => {
		if (courseName) {
			
		}
	}, [courseName]
	);

    return (
        <div className="Problems">
			{
				courseName
					?
					<>
						<ProblemListView courseProblemData={courseProblemData} isLogin={isLogin} memberName={memberName}/>
					</>
					:
					null
			}
		</div>

    )
}

export default CoursePage;