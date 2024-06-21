// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import placeholderImage from '../assets/media_place_holder.png';
// import '../styles/mediaPage.css';
// import SearchNavbar from './SearchNavbar';

// function MediaPage() {
//   const location = useLocation();
//   const { result, type } = location.state;
//   const { media_name, media_type, description, score, release_date, creator, media_img } = result;

//   // Determine the appropriate image source
//   const imageSrc = media_img || placeholderImage;

//   return (
//     <div className="mediaPageWrapper">
//       <SearchNavbar />
//       <div className="mediaPageContainer">
//         <div className="leftHalf">
//           <div className="mediaTopSection">
//             <img src={imageSrc} alt="Media" className="mediaImage" />
//             <div className="mediaInfo">
//               <h2>Title: {media_name}</h2>
//               <p className="mediaInfop">Media Type: {media_type}</p>
//               <p className='mediaInfop'>Release Date: {release_date}</p>
//               <p className='mediaInfop'>Creator: {creator}</p>
//               <p className='mediaInfop'>Rating: {score} </p>
//               <p className="mediaInfop">Tracked by: X users</p>
//             </div>
//           </div>
//           <div className="playButtonContainer">
//             <button className="playButton">I Consume This!</button>
//             <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQd"><button className="playButton" type="submit">Something Fun!</button></a>
//           </div>
//           <div className="mediaBottomSection descriptionBox">
//             <h3 className="descriptionTitle titleBanner">Media Description</h3>
//             <p className="description">{description || 'THERE IS NOTHING FOUND YOU BUM UWU SENPAI AND OTHER CRONLINE SHIT'}</p>
//           </div>
//         </div>
//         <div className="rightHalf">
//           <h2 className="reviewTitle titleBanner">Reviews</h2>
//           <div className="reviewsContainer">
//             {[...Array(100)].map((_, index) => (
//               <div key={index} className="review">
//                 <h4 className="username">@User{index + 1}</h4>
//                 <p>Rating: ★★★★☆</p>
//                 <p>Review: This blows worse than ur mom on a Friday night</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MediaPage;


import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useLocation } from 'react-router-dom';
import placeholderImage from '../assets/media_place_holder.png';
import '../styles/mediaPage.css';
import SearchNavbar from './SearchNavbar';

function MediaPage() {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const { result } = location.state;
  const { media_name, media_type, description, score, release_date, creator, media_img } = result;

  // Determine the appropriate image source
  const imageSrc = media_img || placeholderImage;

  // Function to handle navigation to dashboard with userID
  const goToDashboard = () => {
    const userID = sessionStorage.getItem('userID'); // Retrieve userID from session storage
    navigate(`/dashboard?id=${userID}`); // Navigate with userID as query parameter
  };

  return (
    <div className="mediaPageWrapper">
      <SearchNavbar />
      <div className="mediaPageContainer">
        <div className="leftHalf">
          <div className="mediaTopSection">
            <img src={imageSrc} alt="Media" className="mediaImage" />
            <div className="mediaInfo">
              <h2>Title: {media_name}</h2>
              <p className="mediaInfop">Media Type: {media_type}</p>
              <p className='mediaInfop'>Release Date: {release_date}</p>
              <p className='mediaInfop'>Creator: {creator}</p>
              <p className='mediaInfop'>Rating: {score} </p>
              <p className="mediaInfop">Tracked by: X users</p>
            </div>
          </div>
          <div className="playButtonContainer">
            <button className="playButton" onClick={goToDashboard}>I Consume This!</button>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><button className="playButton" type="submit">Something Fun!</button></a>
          </div>
          <div className="mediaBottomSection descriptionBox">
            <h3 className="descriptionTitle titleBanner">Media Description</h3>
            <p className="description">{description || 'No description available.'}</p>
          </div>
        </div>
        <div className="rightHalf">
          <h2 className="reviewTitle titleBanner">Reviews</h2>
          <div className="reviewsContainer">
            {[...Array(100)].map((_, index) => (
              <div key={index} className="review">
                <h4 className="username">@User{index + 1}</h4>
                <p>Rating: ★★★★☆</p>
                <p>Review: This is a sample review.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaPage;

