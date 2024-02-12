import React from 'react';

function RandomPerson({ fetchRandomPerson, person }) {
  return (
    <div className="random-person">
      {person && (
        <div className="person-card">
          <h2>{person.name}</h2>
          <br />
          <p>{person.occupation}</p>
          <p>
            {person.birthyear} - {person.deathyear}
          </p>
          <p>
            <span className="info">Fame Score:</span> {person.hpi}
          </p>
        </div>
      )}
      <button className="generate-btn" onClick={fetchRandomPerson}>
        Generate Random Person
      </button>
    </div>
  );
}

export default RandomPerson;
