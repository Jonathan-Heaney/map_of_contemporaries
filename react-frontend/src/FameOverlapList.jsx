import React from 'react';
import PersonDetail from './PersonDetail';

function FameOverlapList({ people, person, handleSelectPerson }) {
  return (
    <div className="list fame-overlap-list">
      {person && <h1 className="list-title">Fame Overlap</h1>}
      {people.map((person) => (
        <PersonDetail
          key={person.id}
          person={person}
          handleSelectPerson={handleSelectPerson}
        />
      ))}
    </div>
  );
}

export default FameOverlapList;
