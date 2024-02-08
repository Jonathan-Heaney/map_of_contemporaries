import React from 'react';
import PersonDetail from './PersonDetail';

function FameOverlapList({ people }) {
  return (
    <div>
      {people.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </div>
  );
}

export default FameOverlapList;
