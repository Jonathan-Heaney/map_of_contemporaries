import React from 'react';

function PersonDetail({ person }) {
  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Occupation: {person.occupation}</p>
    </div>
  );
}

export default PersonDetail;
