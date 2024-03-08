import React from 'react';
import { getOccupationColor, formatYears } from './utils';

function PersonDetail({ person, handleSelectPerson }) {
  const borderStyle = {
    border: `3px solid ${getOccupationColor(person.occupation)}`,
  };

  const fontColorStyle = {
    color: `${getOccupationColor(person.occupation)}`,
    fontWeight: `bold`,
  };

  const linkColorStyle = {
    color: `${getOccupationColor(person.occupation)}`,
  };

  const dateString = formatYears(person.birthyear, person.deathyear);

  return (
    <div className="person-card" style={borderStyle}>
      <a style={linkColorStyle} href={person.wikipedia_link} target="blank">
        <h2>{person.name}</h2>
      </a>
      <br />
      <p style={fontColorStyle}>{person.occupation}</p>
      <p>{dateString}</p>
      {person.percentage > 0 && (
        <p>
          <span className="info">Overlap Percentage: </span>
          {person.percentage}%
        </p>
      )}
      <p>
        <span className="info">Overlap Years: </span> {person.start} -{' '}
        {person.end} ({person.years} years)
      </p>
      <p>
        <span className="info">Fame Score:</span> {person.hpi}
      </p>
      <br />
      <button
        className="generate-btn"
        onClick={() => handleSelectPerson(person)}
      >
        Find Contemporaries
      </button>
    </div>
  );
}

export default PersonDetail;
