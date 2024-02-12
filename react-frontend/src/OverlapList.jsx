import React from 'react';
import PersonDetail from './PersonDetail';

function OverlapList({ people }) {
  return (
    <div className="list overlap-list">
      <h1 className="list-title">Top Overlap</h1>
      {people.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </div>
  );
}

export default OverlapList;
