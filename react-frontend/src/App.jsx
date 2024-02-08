import React, { useState } from 'react';
import RandomPerson from './RandomPerson';
import OverlapList from './OverlapList';
import FameOverlapList from './FameOverlapList';

function App() {
  const [randomPerson, setRandomPerson] = useState(null);
  const [overlapList, setOverlapList] = useState([]);
  const [fameOverlapList, setFameOverlapList] = useState([]);

  return (
    <div>
      <RandomPerson setRandomPerson={setRandomPerson}></RandomPerson>
      <OverlapList people={overlapList}></OverlapList>
      <FameOverlapList people={fameOverlapList}></FameOverlapList>
    </div>
  );
}

export default App;
