import React, { useState } from 'react';
import PersonDetail from './PersonDetail';

function RandomPerson({ fetchRandomPerson, person }) {
  return (
    <div>
      {person && (
        <div>
          <p>Name: {person.name}</p>
          <p>Occupation: {person.occupation}</p>
          <p>Birth Year: {person.birthyear}</p>
          <p>Death Year: {person.deathyear}</p>
          <p>Overlap Percentage: {person.overlap_percentage}</p>
          <p>Fame Score: {person.hpi}</p>
        </div>
      )}
      <button onClick={fetchRandomPerson}>Generate Random Person</button>
    </div>
  );
}

export default RandomPerson;
