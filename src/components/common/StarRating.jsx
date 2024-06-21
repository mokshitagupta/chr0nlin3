import star1 from "../../assets/star1.png"
import star2 from "../../assets/star2.png"
import star3 from "../../assets/star3.png"
import star4 from "../../assets/star4.png"
import star5 from "../../assets/star5.png"
import "../../styles/dashboard.css"
import "../../App.css"
import React, { useState, useEffect } from "react"


const transition = {transition:"opacity 100ms", cursor:"pointer", height:"70%", width:"70%"}

function Star1({ onStarClick, selectedRating }) {
  return (
    <img
      style={transition}
      src={star1}
      onClick={() => onStarClick(1)}
      className={selectedRating >= 1 ? "selected" : ""}
    />
  );
}

function Star2({ onStarClick, selectedRating }) {
  return (
    <img
      style={transition}
      src={star2}
      onClick={() => onStarClick(2)}
      className={selectedRating >= 2 ? "selected" : ""}
    />
  );
}

function Star3({ onStarClick, selectedRating }) {
  return (
    <img
      style={transition}
      src={star3}
      onClick={() => onStarClick(3)}
      className={selectedRating >= 3 ? "selected" : ""}
    />
  );
}

function Star4({ onStarClick, selectedRating }) {
  return (
    <img
      style={transition}
      src={star4}
      onClick={() => onStarClick(4)}
      className={selectedRating >= 4 ? "selected" : ""}
    />
  );
}

function Star5({ onStarClick, selectedRating }) {
  return (
    <img
      style={transition}
      src={star5}
      onClick={() => onStarClick(5)}
      className={selectedRating >= 5 ? "selected" : ""}
    />
  );
}

export default function AvgRatings({ onRatingChange }){

    const [selectedRating, setSelectedRating] = useState(null);

    const handleStarClick = (rating) => {
        onRatingChange(rating);
        setSelectedRating(rating);
    };   

    let [currHover, setHover] = useState(null)
    let [currClick, setClick] = useState(null)

    let [star1Visibility, set1Hover] = useState(1)
    let [star2Visibility, set2Hover] = useState(1)
    let [star3Visibility, set3Hover] = useState(1)
    let [star4Visibility, set4Hover] = useState(1)
    let [star5Visibility, set5Hover] = useState(1)

    const reset = (num) => {

        setClick(null)
        setHover(num)

    }

    useEffect(() => {
        if(currClick == 1){
            set5Hover(0)
            set4Hover(0)
            set3Hover(0)
            set2Hover(0)

        }
        if(currClick == 2){
            set5Hover(0)
            set4Hover(0)
            set3Hover(0)

        }
        if(currClick == 3){
            set5Hover(0)
            set4Hover(0)

        }
        if(currClick == 4){
            set5Hover(0)
        }

    }, [currClick])


    useEffect(()=>{
        if (currClick){
            return 
        }
        if (currHover){

            if(currHover == 1){
                //erase all stars except 1
                set5Hover(1)
                set4Hover(1)
                set3Hover(1)
                set2Hover(1)
                set1Hover(1)

                set5Hover(0)
                set4Hover(0)
                set3Hover(0)
                set2Hover(0)
                

            }
            if(currHover == 2){
                //erase all stars after 2
                set5Hover(1)
                set4Hover(1)
                set3Hover(1)
                set2Hover(1)
                set1Hover(1)

                set5Hover(0)
                set4Hover(0)
                set3Hover(0)
                
            }
            if(currHover == 3){
                //erase all stars after 3
                set5Hover(1)
                set4Hover(1)
                set3Hover(1)
                set2Hover(1)
                set1Hover(1)

                set5Hover(0)
                set4Hover(0)
                
            }
            if(currHover == 4){
                //erase all stars after 4
                set5Hover(1)
                set4Hover(1)
                set3Hover(1)
                set2Hover(1)
                set1Hover(1)

                set5Hover(0)
                
            }
            if(currHover == 5){
                //erase no stars
                set5Hover(1)
                set4Hover(1)
                set3Hover(1)
                set2Hover(1)
                set1Hover(1)                
            }

        }else{
            set5Hover(1)
            set4Hover(1)
            set3Hover(1)
            set2Hover(1)
            set1Hover(1)
        }
    },[currHover])

    // return(
    //     <React.Fragment>
    //         {/* <p className="blue co-heading">Your Average Rating</p> */}
    //         <div className="meter-bg" id="stars-cont">
    //             <Star1 onStarClick={handleStarClick} selectedRating={selectedRating} />
    //             <Star2 onStarClick={handleStarClick} selectedRating={selectedRating} />
    //             <Star3 onStarClick={handleStarClick} selectedRating={selectedRating} />
    //             <Star4 onStarClick={handleStarClick} selectedRating={selectedRating} />
    //             <Star5 onStarClick={handleStarClick} selectedRating={selectedRating} />
    //         </div>
    //     </React.Fragment>
    // )


    return(
      <React.Fragment>
          
          {/* <p className="blue co-heading">Your Average Rating</p> */}
          <div class="meter-bg" id="stars-cont">
              <div style={{opacity:star1Visibility}}
              onClick={() => {
                  if (currClick == 1){
                      reset(1)
                  }
                  else{
                      setClick(1)
                  }
              }}
              onMouseEnter={() => setHover(1)}
              onMouseLeave={() => setHover(null)}>
                  <Star1 onStarClick={handleStarClick} selectedRating={selectedRating}/>
              </div>

              <div style={{opacity:star2Visibility}}
              onClick={() => {
                  if (currClick == 2){
                      reset(2)
                  }
                  else{
                      setClick(2)
                  }
              }}
              onMouseEnter={() => setHover(2)} 
              onMouseLeave={() => setHover(null)}>
                  <Star2 onStarClick={handleStarClick} selectedRating={selectedRating}/>
              </div>

              <div style={{opacity:star3Visibility}}
              onClick={() => {
                  if (currClick == 3){
                      reset(3)
                  }
                  else{
                      setClick(3)
                  }
              }}
              onMouseEnter={() => setHover(3)}
              onMouseLeave={() => setHover(null)}>
                  <Star3 onStarClick={handleStarClick} selectedRating={selectedRating}/>
              </div>

              <div style={{opacity:star4Visibility}}
              onClick={() => {
                  if (currClick == 4){
                      reset(4)
                  }
                  else{
                      setClick(4)
                  }
              }}

              onMouseEnter={() => setHover(4)}
              onMouseLeave={() => setHover(null)}>
                  <Star4 onStarClick={handleStarClick} selectedRating={selectedRating}/>
              </div>

              <div style={{opacity:star5Visibility}}

              onClick={() => {
                  if (currClick == 5){
                      reset(5)
                  }
                  else{
                      setClick(5)
                  }
              }}

              onMouseEnter={() => setHover(5)}
              onMouseLeave={() => setHover(null)}>
                  <Star5 onStarClick={handleStarClick} selectedRating={selectedRating}/>
              </div>
          </div>

      </React.Fragment>
  )


    
}