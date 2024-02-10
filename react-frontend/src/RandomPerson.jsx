import React, { useState } from 'react';
import PersonDetail from './PersonDetail';

function RandomPerson({ fetchRandomPerson, person }) {
  return (
    <div className="random-person">
      {person && (
        <div className="person-card">
          <p>Name: {person.name}</p>
          <p>Occupation: {person.occupation}</p>
          <p>Birth Year: {person.birthyear}</p>
          <p>Death Year: {person.deathyear}</p>
          <p>Fame Score: {person.hpi}</p>
        </div>
      )}
      <button className="generate-btn" onClick={fetchRandomPerson}>
        Generate Random Person
      </button>
    </div>
  );
}

export default RandomPerson;
