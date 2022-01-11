import React from 'react';

function Card({course}) {
  return(
    <div className="tc bg-light-gray dib br3 pa3 ma2 grow bw2 shadow-5">
      <div>
        <h2>{course.name}</h2>
        <p>{course.email}</p>
      </div>
    </div>
  );
}

export default Card;