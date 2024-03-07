import React from 'react';
import { getOccupationColor } from './utils';

function PersonDetail({ person, handleSelectPerson }) {
  function handleFindContemporaries(person) {
    handleSelectPerson(person);
  }

  const borderStyle = {
    border: `3px solid ${getOccupationColor(person.occupation)}`,
  };

  const fontColorStyle = {
    color: `${getOccupationColor(person.occupation)}`,
    fontWeight: `bold`,
  };

  return (
    <div className="person-card" style={borderStyle}>
      <a href={person.wikipedia_link} target="blank">
        <h2>{person.name}</h2>
      </a>
      <br />
      <p style={fontColorStyle}>{person.occupation}</p>
      <p>
        {person.birthyear} - {person.deathyear}
      </p>
      {person.overlap_percentage > 0 && (
        <p>
          <span className="info">Overlap Percentage: </span>
          {person.overlap_percentage}%
        </p>
      )}
      <p>
        <span className="info">Overlap Years: </span> {person.overlap_start} -{' '}
        {person.overlap_end} ({person.overlap_years} years)
      </p>
      <p>
        <span className="info">Fame Score:</span> {person.hpi}
      </p>
      <br />
      <button className="generate-btn" onClick={handleFindContemporaries}>
        Find Contemporaries
      </button>
    </div>
  );
}

export default PersonDetail;
