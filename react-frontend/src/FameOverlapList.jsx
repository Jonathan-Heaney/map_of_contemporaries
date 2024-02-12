import React from 'react';
import PersonDetail from './PersonDetail';

function FameOverlapList({ people }) {
  return (
    <div className="list fame-overlap-list">
      <h1 className="list-title">Fame Overlap</h1>
      {people.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </div>
  );
}

export default FameOverlapList;
