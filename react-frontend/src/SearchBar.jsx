import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ query, setQuery, results, setResults, onSelect }) {
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      // Only search if query length > 2 to reduce requests
      const fetchResults = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/search_person/?q=${query}`
          );
          setResults(response.data.results);
          setSearchPerformed(true);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setSearchPerformed(false);
    }
  }, [query]);

  function handleSelect(person) {
    setResults([]);
    setSearchPerformed(false);
    setQuery('');
    onSelect(person);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a famous person..."
      />
      <ul>
        {results.map((person) => (
          <li key={person.id} onClick={() => handleSelect(person)}>
            {person.name} ({person.birthyear}-{person.deathyear})
          </li>
        ))}
      </ul>
      {searchPerformed && results.length === 0 && (
        <div className="no-results">No people found.</div>
      )}
    </div>
  );
}

export default SearchBar;
