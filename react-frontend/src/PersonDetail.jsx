import React from 'react';
import { getOccupationColor } from './utils';

function PersonDetail({ person }) {
  const borderStyle = {
    border: `3px solid ${getOccupationColor(person.occupation)}`,
  };

  const fontColorStyle = {
    color: `${getOccupationColor(person.occupation)}`,
    fontWeight: `bold`,
  };

  return (
    <div className="person-card" style={borderStyle}>
      <h2>{person.name}</h2>
      <br />
      <p style={fontColorStyle}>{person.occupation}</p>
      <p>
        {person.birthyear} - {person.deathyear}
      </p>
      <p>
        <span className="info">Overlap Percentage: </span>
        {person.overlap_percentage}%
      </p>
      <p>
        <span className="info">Fame Score:</span> {person.hpi}
      </p>
      <br />
    </div>
  );
}

export default PersonDetail;
