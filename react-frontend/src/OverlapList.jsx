import React from 'react';
import PersonDetail from './PersonDetail';

function OverlapList({ people }) {
  return (
    <div>
      {people.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </div>
  );
}

export default OverlapList;
