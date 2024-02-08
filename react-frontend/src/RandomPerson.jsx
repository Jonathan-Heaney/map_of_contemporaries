import React, { useState } from 'react';

function RandomPerson({ fetchRandomPerson, person }) {
  return (
    <div>
      <button onClick={fetchRandomPerson}>Generate Random Person</button>
      {person && (
        <div>
          <p>Name: {person.name}</p>
        </div>
      )}
    </div>
  );
}

export default RandomPerson;
