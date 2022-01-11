import React from 'react';
import Search from '../Components/Search'
import testData from '../testData';


function SearchCourse() {
    return (
      <div className="tc bg-balck ma0 pa4 min-vh-100">
        <Search details={testData}/>
      </div>
    );
  }
  
  export default SearchCourse;