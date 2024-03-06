import React, { useState } from 'react';
import RandomPerson from './RandomPerson';
import PersonDetail from './PersonDetail';
import OverlapList from './OverlapList';
import FameOverlapList from './FameOverlapList';
import SearchBar from './SearchBar';
import axios from 'axios';
import './App.css';

function App() {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [minHpi, setMinHpi] = useState(50);
  const [overlapList, setOverlapList] = useState([]);
  const [fameOverlapList, setFameOverlapList] = useState([]);

  const fetchRandomPerson = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/random_person/?min_hpi=${minHpi}`
      );
      setCurrentPerson(response.data);

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

  const handleSelectPerson = (person) => {
    setCurrentPerson(person);
    fetchOverlapLists(person.id);
  };

  return (
    <div className="Container">
      <h1 className="title">Map of Contemporaries</h1>
      <h3 className="explainer">
        Search for a famous historical figure (or click the button to generate a
        random one) and find out whose lives overlapped with theirs!
      </h3>
      <div>
        <SearchBar onSelect={handleSelectPerson}></SearchBar>
      </div>
      <RandomPerson
        fetchRandomPerson={fetchRandomPerson}
        person={currentPerson}
      ></RandomPerson>
      <div className="hpi-filter-container">
        <label htmlFor="hpi-slider">
          Minimum Fame Score: <span className="min-hpi">{minHpi}</span>
        </label>
        <input
          id="hpi-slider"
          className="hpi-filter"
          type="range"
          min="50"
          max="90"
          value={minHpi}
          onChange={(e) => setMinHpi(e.target.value)}
        />
      </div>

      <div className="lists">
        <OverlapList people={overlapList} person={currentPerson}></OverlapList>
        <FameOverlapList
          people={fameOverlapList}
          person={currentPerson}
        ></FameOverlapList>
      </div>
    </div>
  );
}

export default App;
