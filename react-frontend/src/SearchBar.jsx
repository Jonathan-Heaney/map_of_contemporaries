import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      // Only search if query length > 2 to reduce requests
      const fetchResults = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/search_person/?q=${query}`
          );
          setResults(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a famous person..."
      />
      <ul>
        {results.map((person) => (
          <li key={person.id} onClick={() => onSelect(person)}>
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
