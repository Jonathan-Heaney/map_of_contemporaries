import React from 'react';
import PersonDetail from './PersonDetail';

function OverlapList({ people }) {
  return (
    <div className="list overlap-list">
      <h2>Top Overlap</h2>
      {people.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </div>
  );
}

export default OverlapList;
