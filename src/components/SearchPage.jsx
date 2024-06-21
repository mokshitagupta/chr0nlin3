// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import SearchNavbar from './SearchNavbar';
// import '../styles/searchPage.css';
// import placeholderImage from '../assets/media_place_holder.png';

// function SearchPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { searchTerm, results = [] } = location.state || {};
//   const [expandedGroups, setExpandedGroups] = useState({});

//   const toggleGroupVisibility = (type) => {
//     setExpandedGroups({ ...expandedGroups, [type]: !expandedGroups[type] });
//   };

//   const renderResultFields = (result) => {
//     const fieldsToShow = ['creator', 'score', 'release_date']; // Removed 'description'
//     return fieldsToShow.map((field, i) => (
//       result.hasOwnProperty(field) && (
//         <div key={i} className="resultField">
//           <span className="fieldLabel">{field.replace('_', ' ')}: </span>
//           {result[field]}
//         </div>
//       )
//     ));
//   };

//   const getImageSource = (result) => {
//     return result.media_img ? result.media_img : placeholderImage;
//   };

//   const handleResultClick = (result, type) => {
//     navigate('/mediapage', { state: { result, type } });
//   };

//   return (
//     <div className="searchPageContainer">
//       <SearchNavbar />
//       <p className="resultsTitle">Search Results for: {searchTerm}</p>
//       <div className="resultsContainer">
//         {results.length > 0 ? (
//           results.map((resultGroup, index) => (
//             <div key={index} className="resultGroup">
//               <h3>{resultGroup.type.toUpperCase()}:</h3>
//               {resultGroup.data.slice(0, expandedGroups[resultGroup.type] ? resultGroup.data.length : 3).map((result, i) => (
//                 <button key={i} className="resultItem" onClick={() => handleResultClick(result, resultGroup.type)}>
//                   <div className="resultItemLeft">
//                     <img src={getImageSource(result)} alt={result.media_name || result.username} />
//                   </div>
//                   <div className="resultItemRight">
//                     <h4>{result.media_name || result.username}</h4>
//                     {renderResultFields(result)}
//                   </div>
//                 </button>
//               ))}
//               {resultGroup.data.length > 3 && (
//                 <button onClick={() => toggleGroupVisibility(resultGroup.type)} className="loadMoreButton">
//                   {expandedGroups[resultGroup.type] ? 'SHOW LESS' : 'LOAD MORE'}
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className='noResultsMessage'>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchPage;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchNavbar from './SearchNavbar';
import '../styles/searchPage.css';
import placeholderImage from '../assets/media_place_holder.png';

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, results = [] } = location.state || {};
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroupVisibility = (type) => {
    setExpandedGroups({ ...expandedGroups, [type]: !expandedGroups[type] });
  };

  const renderResultFields = (result) => {
    const fieldsToShow = ['creator', 'score', 'release_date']; // Removed 'description'
    return fieldsToShow.map((field, i) => (
      result.hasOwnProperty(field) && (
        <div key={i} className="resultField">
          <span className="fieldLabel">{field.replace('_', ' ')}: </span>
          {result[field]}
        </div>
      )
    ));
  };

  const getImageSource = (result) => {
    return result.media_img ? result.media_img : placeholderImage;
  };

  const handleResultClick = (result, type) => {
    // If the result type is 'user', do nothing
    if (type === 'user') {
      return;
    }
    // Otherwise, navigate as before
    navigate('/mediapage', { state: { result, type } });
  };

  return (
    <div className="searchPageContainer">
      <SearchNavbar />
      <p className="resultsTitle">Search Results for: {searchTerm}</p>
      <div className="resultsContainer">
        {results.length > 0 ? (
          results.map((resultGroup, index) => (
            <div key={index} className="resultGroup">
              <h3>{resultGroup.type.toUpperCase()}:</h3>
              {resultGroup.data.slice(0, expandedGroups[resultGroup.type] ? resultGroup.data.length : 3).map((result, i) => (
                <button key={i} className={`resultItem ${resultGroup.type === 'user' ? 'userResultItem' : ''}`} onClick={() => handleResultClick(result, resultGroup.type)}>
                  <div className="resultItemLeft">
                    <img src={getImageSource(result)} alt={result.media_name || result.username} />
                  </div>
                  <div className="resultItemRight">
                    <h4>{result.media_name || result.username}</h4>
                    {renderResultFields(result)}
                  </div>
                </button>
              ))}
              {resultGroup.data.length > 3 && (
                <button onClick={() => toggleGroupVisibility(resultGroup.type)} className="loadMoreButton">
                  {expandedGroups[resultGroup.type] ? 'SHOW LESS' : 'LOAD MORE'}
                </button>
              )}
            </div>
          ))
        ) : (
          <p className='noResultsMessage'>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
