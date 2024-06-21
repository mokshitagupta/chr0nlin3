import React from "react";
import SearchNavbar from "./SearchNavbar";
import SearchBar from "./common/searchbar";

//import testingButton from "./common/testingButton.jsx";

function Testing() {
  // Inline style for the outer div
  const containerStyle = {
    paddingBottom: '40px', // 40px padding at the bottom
    height: '100%', // Set height to 100% to use the full height of the viewport
    overflowY: 'scroll' // Make the content scrollable
  };

  return (
    <div style={containerStyle}>
      <SearchNavbar />
      <p className="white"> {/* Use className instead of class for React */}
        Is it true?
        You've been feelin' sort of low these days
        Just don't have a place to go these days
      </p>
      
    </div>
  );
}

export default Testing;
