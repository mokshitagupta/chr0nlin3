import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../App.css";
import "../../styles/dashboard.css";
import "../../styles/searchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  let debounceTimeout = null;

  const searchAPIs = async (search) => {
    const apiEndpoints = ['movie', 'book', 'videogame', 'user'];
    const resultsArray = [];

    if (search.trim().length < 2) {
      setResults([]);
      return;
    }


    for (const endpoint of apiEndpoints) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_API + `/${endpoint}-search.php`,
          { search }
        );
        resultsArray.push({ type: endpoint, data: response.data });
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
      }
    }
    setResults(resultsArray);
    return resultsArray;
  };

  useEffect(() => {
    if (searchTerm) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        searchAPIs(searchTerm);
      }, 300);
    } else {
      setResults([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [searchTerm]);

  const handleSearch = async () => {
    const searchResults = await searchAPIs(searchTerm);
    setResults([]); // Clear results after search
    navigate('/Search', { state: { searchTerm, results: searchResults } });
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = async (result) => {
    const newSearchTerm = result.media_name || result.username;
    setSearchTerm(newSearchTerm);
    const searchResults = await searchAPIs(newSearchTerm);
    setResults([]); // Clear results after selecting a recommended search
    navigate('/Search', { state: { searchTerm: newSearchTerm, results: searchResults } });
  };

  const handleInputChanged = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim().length >= 2) {
      searchAPIs(e.target.value);
    } else {
      setResults([]);
    }
  };

  const handleBlur = () => {
    if (!isFocused) {
      setTimeout(() => setResults([]), 100);
    }
  };

  const toggleGroupVisibility = (type) => {
    setExpandedGroups({ ...expandedGroups, [type]: !expandedGroups[type] });
  };

  return (
    <div className="searchBarContainer">
      <input
        className="search-field"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChanged}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        style={{paddingLeft: '15%'}}
      />
      {searchTerm && results.length > 0 && (
        <div 
          className="searchResults"
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          <ul>
            {results.map((resultGroup, index) => (
              <li key={index} className='sectionHeading'>
                {resultGroup.type.toUpperCase()}: 
                {resultGroup.data.slice(0, expandedGroups[resultGroup.type] ? resultGroup.data.length : 3).map((result, i) => (
                  <div key={i} onClick={() => handleResultClick(result)} className="searchResultItem">
                    {result.media_name || result.username}
                  </div>
                ))}
                {resultGroup.data.length > 3 && (
                  <button onClick={() => toggleGroupVisibility(resultGroup.type)} className="loadMoreButton">
                    {expandedGroups[resultGroup.type] ? 'SHOW LESS' : 'LOAD MORE'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
