import React from 'react';

function PersonDetail({ person }) {
  return (
    <div className="person-card">
      <h2>{person.name}</h2>
      <br />
      <p>{person.occupation}</p>
      <p>
        {person.birthyear}-{person.deathyear}
      </p>
      <p>Overlap Percentage: {person.overlap_percentage}%</p>
      <p>Fame Score: {person.hpi}</p>
      <br />
    </div>
  );
}

export default PersonDetail;
