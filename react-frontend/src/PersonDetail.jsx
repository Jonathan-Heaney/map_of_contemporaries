import React from 'react';

function PersonDetail({ person }) {
  return (
    <div className="person-card">
      <h2>{person.name}</h2>
      <br />
      <p>{person.occupation}</p>
      <p>
        {person.birthyear} - {person.deathyear}
      </p>
      <p>
        <span className="info">Overlap Percentage: </span>
        {person.overlap_percentage}%
      </p>
      <p>
        <span className="info">Fame Score:</span> {person.hpi}
      </p>
      <br />
    </div>
  );
}

export default PersonDetail;
