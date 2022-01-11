import React from 'react';
import Card from './Card';

function CourseSearchList({ filteredCourses }) {
  const filtered = filteredCourses.map(course =>  <Card key={course.id} course={course} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default CourseSearchList;