import React from 'react';

function PersonDetail({ person }) {
  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Occupation: {person.occupation}</p>
      <p>Birth Year: {person.birthyear}</p>
      <p>Death Year: {person.deathyear}</p>
      <p>Overlap Percentage: {person.overlap_percentage}%</p>
      <p>Fame Score: {person.hpi}</p>
      <br />
    </div>
  );
}

export default PersonDetail;
