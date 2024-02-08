import React, { useState } from 'react';
import RandomPerson from './RandomPerson';
import OverlapList from './OverlapList';
import FameOverlapList from './FameOverlapList';
import axios from 'axios';

function App() {
  const [randomPerson, setRandomPerson] = useState(null);
  const [overlapList, setOverlapList] = useState([]);
  const [fameOverlapList, setFameOverlapList] = useState([]);

  const fetchRandomPerson = async () => {
    try {
      const response = await axios.get('http://localhost:8000/random_person/');
      setRandomPerson(response.data);
    } catch (error) {
      console.error('There was an error fetching the random person:', error);
    }
  };

  return (
    <div>
      <RandomPerson
        fetchRandomPerson={fetchRandomPerson}
        person={randomPerson}
      ></RandomPerson>
      <OverlapList people={overlapList}></OverlapList>
      <FameOverlapList people={fameOverlapList}></FameOverlapList>
    </div>
  );
}

export default App;
