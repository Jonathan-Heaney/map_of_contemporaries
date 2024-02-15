import React, { useState } from 'react';
import RandomPerson from './RandomPerson';
import OverlapList from './OverlapList';
import FameOverlapList from './FameOverlapList';
import axios from 'axios';
import './App.css';

function App() {
  const [randomPerson, setRandomPerson] = useState(null);
  const [minHpi, setMinHpi] = useState(0);
  const [overlapList, setOverlapList] = useState([]);
  const [fameOverlapList, setFameOverlapList] = useState([]);

  const fetchRandomPerson = async () => {
    try {
      console.log(minHpi);
      const response = await axios.get(
        `http://localhost:8000/random_person/?min_hpi=${minHpi}`
      );
      setRandomPerson(response.data);

      fetchOverlapLists(response.data.id);
    } catch (error) {
      console.error('There was an error fetching the random person:', error);
    }
  };

  const fetchOverlapLists = async (personId) => {
    try {
      const overlapResponse = await axios.get(
        `http://localhost:8000/top_overlap/${personId}/`
      );
      setOverlapList(overlapResponse.data);

      const fameOverlapResponse = await axios.get(
        `http://localhost:8000/fame_overlap/${personId}/`
      );
      setFameOverlapList(fameOverlapResponse.data);
    } catch (error) {
      console.error('Error fetching overlap lists:', error);
    }
  };

  return (
    <div className="Container">
      <h1 className="title">Map of Contemporaries</h1>
      <h3 className="explainer">
        Click the button to generate a random historical figure and find out
        whose lives overlapped with theirs!
      </h3>
      <RandomPerson
        fetchRandomPerson={fetchRandomPerson}
        person={randomPerson}
      ></RandomPerson>
      <input
        className="hpi-filter"
        type="range"
        min="50"
        max="90"
        value={minHpi}
        onChange={(e) => setMinHpi(e.target.value)}
      />
      <div className="lists">
        <OverlapList people={overlapList} person={randomPerson}></OverlapList>
        <FameOverlapList
          people={fameOverlapList}
          person={randomPerson}
        ></FameOverlapList>
      </div>
    </div>
  );
}

export default App;
