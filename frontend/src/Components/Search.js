import React, { useState } from 'react';
import Scroll from './Scroll';
import CourseSearchList from './CourseSearchList';

function Search({ details, setCourseName }) {

  const [searchField, setSearchField] = useState("");

  const filteredCourses = details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .teacher
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <CourseSearchList filteredCourses={filteredCourses} setCourseName={setCourseName}/>
      </Scroll>
    );
  }

  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search your course</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-white ma3"
          type = "search" 
          placeholder = "Search Course Name" 
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export default Search;