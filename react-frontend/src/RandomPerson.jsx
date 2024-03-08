import React from 'react';
import { getOccupationColor, formatYears } from './utils';

function RandomPerson({ fetchRandomPerson, person }) {
  return (
    <div className="random-person">
      {person && (
        <div
          className="person-card random-person-card"
          style={{
            border: `3px solid ${getOccupationColor(person.occupation)}`,
          }}
        >
          <a
            style={{ color: getOccupationColor(person.occupation) }}
            href={person.wikipedia_link}
            target="blank"
          >
            <h2>{person.name}</h2>
          </a>
          <br />
          <p style={{ color: getOccupationColor(person.occupation) }}>
            {person.occupation}
          </p>
          <p>{formatYears(person.birthyear, person.deathyear)}</p>
          <p>
            <span className="info">Fame Score:</span> {person.hpi}
          </p>
        </div>
      )}
      <br />
      <button className="generate-btn" onClick={fetchRandomPerson}>
        Generate Random Person
      </button>
    </div>
  );
}

export default RandomPerson;
