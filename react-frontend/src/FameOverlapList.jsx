import React from 'react';
import PersonDetail from './PersonDetail';

function FameOverlapList({ people }) {
  return (
    <div className="list fame-overlap-list">
      <h2>Fame Overlap</h2>
      {people.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </div>
  );
}

export default FameOverlapList;
