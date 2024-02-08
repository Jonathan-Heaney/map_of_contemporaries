import React, { useState } from 'react';
import axios from 'axios';

function RandomPerson({ setRandomPerson }) {
  const [person, setPerson] = useState(null);

  const fetchRandomPerson = async () => {
    try {
      const response = await axios.get('http://localhost:8000/random_person/');
      setPerson(response.data);
    } catch (error) {
      console.error('There was an error fetching the random person:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchRandomPerson}>Generate Random Person</button>
    </div>
  );
}
