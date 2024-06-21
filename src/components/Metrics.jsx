

// import "../styles/dashboard.css"
// import "../App.css"
// import React, { useRef, forwardRef, useState, useEffect } from "react"
// import Plotly from "plotly.js-dist";

// import { ColorPicker, ConfigProvider, Modal } from 'antd';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// import AvgRatings from "./common/StarRating.jsx";


// import stars from "../assets/stars.png"
// import meter from "../assets/meter.png"
// import needle from "../assets/needle.png"
// import plus from "../assets/plus.png"

// import AddMediaModal from "./AddMediaModal"

// function ChronicallyOnlineMeter(){
//     return(
//         <React.Fragment>
//             <p className="blue co-heading">Chronically Online Score</p>
//             <div class="meter-bg stars-cont cols">
//                 <img class="transparent meter-img" src={meter} alt="" />
//                 <img class="transparent needle" src={needle} alt="" />
//                 <p className="pink bold stars-cont co-body">better than most...</p>
//             </div>
//         </React.Fragment>
//     )
// }



// function GrassMeter(){
//     return(
//         <React.Fragment>
//             <p className="blue co-heading ">Touched Grass</p>
//             <div id="grass-cont">
//                 <div id="inner" className="stars-cont">

//                     {/* automate by adding  clip-path: inset(<percentage>% 0px 0px 0px) prop */}
//                     <div id="green-fill"></div>
//                 </div>

//             </div>

//         </React.Fragment>
//     )
// }

// function Tracking(props){

//     // if( ref.current){
//     //     console.log(props, ref.current.querySelector("#tracking-container")[0], ref.current == null)
//     // }
//     let ref = useRef()
//     const [reqLoaded, setLoaded] = useState(false)

//     useEffect(() => {
//         Plotly.newPlot('track-cont', data, layout)
//     }, []);

//     console.log(ref.current)
//     var data = [{
//         type: "pie",
//         values: [2, 3, 4],
//         labels: ["Books", "Movies", "Games"],
//         textinfo: "label+percent",
//         automargin: true
//     }]
      
//     var layout = {
//         height: 160,
//         width: 160,
//         margin: {"t": 0, "b": 0, "l": 0, "r": 0},
//         paper_bgcolor:'rgba(0,0,0,0)',
//         plot_bgcolor: 'rgba(0,0,0,0)',
//         font:{
//             color:"#FFFF"
//         },
//         showlegend: false
//     }


//     return(
//         <React.Fragment>
//             <p className="blue co-heading ">Tracking History</p>
//             <div id="track-cont">
//                 <div ref={ref} >
//             </div>
            
//             </div>

//         </React.Fragment>
//     )
// }


// function Log() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         media_name: '',
//         creator: '',
//         media_type: '',
//         media_review: '',
//         media_rating: 0,
//         media_img: '',
//         user_id: sessionStorage.getItem("userID"),
//         username: sessionStorage.getItem("username")
//     });

//     const [errorMessage, setErrorMessage] = useState('');

//     const showModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleRatingChange = (rating) => {
//         setFormData({
//           ...formData,
//           media_rating: rating,
//         });
//       };

//     const handleOk = () => {
        
//         // setFormData({...formData, user_id: sessionStorage.getItem("userID"), username: sessionStorage.getItem("username")})
//         console.log(formData);
//         const url = process.env.REACT_APP_BASE_API + "/add-media.php";

//         axios
//             .post(url, formData, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             })
//             .then((response) => {
//                 if (response.status == 200){
//                     console.log(response.data)

//                     setErrorMessage('')

//                     setIsModalOpen(false);
//                 }
//                 else{
//                     console.error('Error: ', response.status)
//                     console.log(response.data)

//                     setErrorMessage('Error: status code ' + response.status)
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error: ', error)

//                 setErrorMessage('Error: ' + error.message)
//             });
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <React.Fragment>
//             <p className="blue log-heading">Log Media</p>

//             <div id="plus-cont">
//                 <img id="plus" src={plus} alt="" style={{ cursor: "pointer" }} onClick={showModal} />
//                 <ConfigProvider
//                     theme={{
//                         components: {
//                             Modal: {
//                                 contentBg: "#290024",
//                                 headerBg: "#290024",
//                                 titleColor: "white",
//                                 titleFontSize: "large",
//                             },
//                         },
//                     }}
//                 >
//                     <Modal
//                         open={isModalOpen}
//                         // okButtonProps={{
//                         //     style: { class: "primary", backgroundColor: "#CA89FF", color: "white", fontSize: "16px", height: "35px" },
//                         // }}
//                         // cancelButtonProps={{
//                         //     style: { class: "primary", backgroundColor: "red", color: "white", fontSize: "16px", height: "35px" },
//                         // }}
//                         //onOk={handleOk}
//                         //onCancel={handleCancel}
//                         footer={null}
//                         width={800}
//                         bodyStyle={{ backgroundColor: "#290024" }}
//                     >
//                         <div className="modalContainer" style={{paddingBottom:"20px"}}>

//                             <div className="modalContent">
//                                 <span style={{paddingLeft:"280px", color:"white", fontSize:"20px", fontWeight:"bolder"}}>Add Content...</span>
//                             </div>

//                             <div className="modalContent">
//                                 <span className="blue labels" style={{paddingLeft:"10px"}}>Content Type:</span>
//                             </div>

//                             <div className="modalContent" style={{paddingBottom:"30px"}}>
//                             <select
//                             style={{
//                                 backgroundColor: "#8a0791",
//                                 color: "#CA89FF",
//                                 marginTop: "5px",
//                                 fontSize: "18px",
//                                 width: "340px",
//                                 height: "34px",
//                                 borderRadius: "30px",
//                                 paddingLeft: "30px"
//                             }}
//                             value={formData.media_type}
//                             onChange={(e) => handleInputChange({ target: { name: "media_type", value: e.target.value } })}
//                             >
//                                 <option value="Book">Book</option>
//                                 <option value="Movie">Movie/TV Show</option>
//                                 <option value="Video Game">Video Game</option>
//                                 </select>
//                             </div>

//                             <div className="modalContent">
//                                 <span className="blue labels" style={{paddingLeft:"10px", paddingRight:"280px"}}>Content Title:</span>
//                                 <span className="blue labels">
//                                     Your Rating:
//                                 </span>
//                             </div>

//                             <div className="modalContent">
//                                 <input
//                                 className="input-field pink"
//                                 type="text"
//                                 name="media_name"
//                                 value={formData.media_name}
//                                 onChange={handleInputChange}
//                                 style={{ width: "300px" }}
//                                 />
//                                 <div className="modalContent" style={{height:"75px", width:"280px", paddingLeft:"100px"}}>
//                                     <AvgRatings onRatingChange={handleRatingChange} />
//                                 </div>
//                             </div>

//                             <div className="modalContent">
//                                 <span className="blue labels" style={{paddingLeft:"10px"}}>Content Creator:</span>
//                             </div>

//                             <div className="modalContent" style={{paddingBottom:"30px"}}>
//                                 <input
//                                 className="input-field pink"
//                                 type="text"
//                                 name="creator"
//                                 value={formData.creator}
//                                 onChange={handleInputChange}
//                                 style={{ width: "300px" }}
//                                 />
//                             </div>

//                             <div className="modalContent">
//                                 <span className="blue labels" style={{paddingLeft:"10px"}}>Review:</span>
//                             </div>

//                             <div className="modalContent">
//                                 <textarea
//                                 className="input-field pink"
//                                 type="text"
//                                 name="media_review"
//                                 value={formData.media_review}
//                                 onChange={handleInputChange}
//                                 style={{ width: "600x", height: "50px", paddingLeft: "38px", paddingRight: "38px" }}
//                                 ></textarea>
//                             </div>
//                         </div>

//                         {errorMessage && (
//                             <div style={{ color: 'red', marginTop: '1px', marginBottom: '5px', paddingLeft: '12px', fontFamily:'Roboto Mono', fontSize: '18px', alignItems:'center' }}>
//                                 {errorMessage}
//                             </div>
//                         )}

//                         <div className="modalContent modalButton">
//                             <button className="ok" class="modalButtonStyle" onClick={handleOk}>
//                                 Save
//                             </button>

//                             <div style={{paddingRight:"12px"}}></div>

//                             <button className="cancel" class="modalButtonStyle" onClick={handleCancel} style={{background:"red", color:"white"}}>
//                                 Cancel
//                             </button>
//                         </div>


                        
//                     </Modal>
//                 </ConfigProvider>
//             </div>
//         </React.Fragment>
//     );
// }




// export default function Metrics(){
    

//     return(
//         <div id="metric-container">

//             <div id="metric-col1" className="cols">
//                 <div id="co-container" className="cols">
//                     <ChronicallyOnlineMeter/>
//                 </div>
//                 <div id="rating-container" className="cols" style={{pointerEvents:"none"}}>
//                     <AvgRatings/>
//                 </div>
//             </div>

//             <div id="metric-col2" className="cols">
//                 <div id="tracking-container" className="cols transparent stars-cont">
//                     <Tracking /> 
//                 </div>   
//                 {<div id="log-container" className="cols">
//                     <Log />
//                 </div>}
//             </div>

//             <div id="metric-col3">
//                 <div id="grass-container" className="cols transparent stars-cont">
//                     <GrassMeter/>
//                 </div>
//             </div>

//         </div>
//     )
// }


import "../styles/dashboard.css"
import "../App.css"
import React, { useRef, forwardRef, useState, useEffect } from "react";
import Plotly from "plotly.js-dist";

import { ColorPicker, ConfigProvider, Modal } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AvgRatings from "./common/StarRating.jsx";
import stars from "../assets/stars.png";
import meter from "../assets/meter.png";
import needle from "../assets/needle.png";
import plus from "../assets/plus.png";
import AddMediaModal from "./AddMediaModal";
import * as d3 from "d3";


import "../styles/searchBar.css";
import "../styles/components/metrics.css";

let BOOK_WEIGHT = 30
let MOVIE_WEIGHT = 30
let GAME_WEIGHT = 40
let BOOK_OVERPOWER_SCORE = 2

function ChronicallyOnlineMeter(props){
    let bookLen = props.data.books? props.data.books.length : 0
    let movieLen = props.data.movies? props.data.movies.length : 0
    let gameLen = props.data.games? props.data.games.length : 0
    let percent = ((movieLen+gameLen) / ( movieLen+gameLen+bookLen + 1) )* 100
    // min = 100
    // max = 160
    let newpercent = 80 - (percent/100)*160
    console.log(percent, bookLen, movieLen, gameLen, "com")
    return(
        <React.Fragment>
            <p className="blue co-heading">Chronically Online Score</p>
            <div class="meter-bg stars-cont cols">
                <img class="transparent meter-img" src={meter} alt="" />
                <img style={{transform:`rotate(${newpercent}deg)`}} class="transparent needle" src={needle} alt="" />
                <p className="pink bold stars-cont co-body">{percent}%</p>
            </div>
        </React.Fragment>
    )
}



function GrassMeter(props){
    console.log(props.data)
    let bookLen = props.data.books? props.data.books.length : 0
    let movieLen = props.data.movies? props.data.movies.length : 0
    let gameLen = props.data.games? props.data.games.length : 0

    // let bookLen = 25
    // let movieLen = 10
    // let gameLen = 10

    // the more the user tracks, the less these quant will be
    // we want to increase meter for lesser quants and
    // reduce meter for bigger quants

    let aggregate = movieLen+gameLen
    let total = aggregate + bookLen
    // console.log(aggregate,bookWeight)

    let percent = 0
    if (aggregate >= bookLen && bookLen !== 0){
        // still add some weight for the books
        
        percent = ((bookLen / total) * 100 ) - ((aggregate/total * 100)/2)
        console.log("1st case")

    } else if (aggregate >= bookLen) {
        // set to 0
        console.log("2nd case")
        percent = 0
    } else {
        // set to a usual score
        percent = (bookLen / total * 100 ) - ((aggregate/total * 100)/4)
        console.log("3rd case")
    }

    if (percent !== 0){
        percent = Math.min(percent, 100)
        percent = Math.max(percent, 2)
        console.log(percent)
    }

    console.log(percent, "calculated percentage")

    return(
        <React.Fragment>
            <p className="blue co-heading ">Touched Grass</p>
            <div id="grass-cont">
                <div id="inner" className="stars-cont">
                    {/* automate by adding  clip-path: inset(<percentage>% 0px 0px 0px) prop */}
                    <div style={{clipPath:`inset(${100-percent}% 0px 0px 0px)`}} id="green-fill"></div>
                </div>

            </div>

        </React.Fragment>
    )
}

function Tracking(props){

    // if( ref.current){
    //     console.log(props, ref.current.querySelector("#tracking-container")[0], ref.current == null)
    // }
    let ref = useRef()
    const [reqLoaded, setLoaded] = useState(false)
    const [empty, setEmpty] = useState(false)

    // useEffect(() => {
        
    // }, []);

    // const make = () => {
    //     console.log("make")
    //     Plotly.newPlot('track-cont', data, layout)
    // }

    useEffect(() => {
        let bookLen = props.data.books? props.data.books.length : 0
        let movieLen = props.data.movies? props.data.movies.length : 0
        let gameLen= props.data.games? props.data.games.length : 0

        const data = [bookLen, movieLen, gameLen];

        

        console.log(props.data, "for tracking", data)

        // Colors
        const colors = ["var(--green)", "var(--orange)", "var(--red)"];

        // Create SVG container
        const container = d3.select("#track-cont");
        container.selectAll("*").remove();

        let radius = 150/200 * 80 
        const pie = d3.pie();

        if (bookLen == 0 && movieLen == 0 && gameLen == 0 ){
            //do something to show that u need to track
            console.log("empty")
            setEmpty(true)
            return
        }

        setEmpty(false)

        const svg = container
        .append("svg")
        .attr("width",  200)
        .attr("height", 160)
        .append("g")
        .attr("transform", "translate(100,75)");

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Bind data and create pie chart segments
        const arcs = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        // Draw each arc
        arcs.append("path")
            .attr("fill", (d, i) => colors[i])
            .attr("d", arc);

        // Add category labels outside the pie chart
        svg.selectAll(".category-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "category-label")
            .attr("transform", (d, i) => {
                const [x, y] = arc.centroid(pie(data)[i]);
                return `translate(${x * 1.7}, ${y * 1.5})`; // Adjust positioning
            })
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "#FFFF")
            .text((d, i) => {
                const categories = ['Books', 'Movies', 'Games'];
                return `${categories[i]}: ${d}`;
            });

    })

    return(
        <React.Fragment>
            <p className="blue co-heading ">Tracking History</p>
            <div key={Date.now()} id="track-cont">
                <div ref={ref} >
                </div>
                {/* {empty == true ? <p className="white co-heading ">Start tracking to see your stats!</p>
                : null} */}
            
            </div>

        </React.Fragment>
    )
}


function Log() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        media_name: '',
        creator: '',
        media_type: '',
        media_review: '',
        media_rating: 0,
        media_img: '',
        user_id: sessionStorage.getItem("userID"),
        username: sessionStorage.getItem("username")
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);


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
              `http://127.0.0.1:80/project-group-chronies/api/${endpoint}-search.php`,
              { search }
            );
            resultsArray.push({ type: endpoint, data: response.data });
          } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
          }
        }
        setResults(resultsArray);
        return resultsArray; // Return the results
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





    const showModal = () => {
        setIsModalOpen(true);

    };

    // const handleResultClick = (resultName) => {
    //     setFormData({
    //         ...formData,
    //         media_name: resultName
    //     });
    //     setResults([]); // Clear results after selection
    // };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setResults([]); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleRatingChange = (rating) => {
        setFormData({
          ...formData,
          media_rating: rating,
        });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setSearchTerm(value); // Set search term for recommendations
    };

    const handleResultClick = (result) => {
        setFormData({ ...formData, media_name: result.media_name || result.username });
        setResults([]); // Clear results after selecting a recommendation
    };


    const handleOk = () => {
        
        // setFormData({...formData, user_id: sessionStorage.getItem("userID"), username: sessionStorage.getItem("username")})
        console.log(formData);
        const url = process.env.REACT_APP_BASE_API + "/add-media.php";

        axios
            .post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => {
                if (response.status == 200){
                    console.log(response.data)

                    setErrorMessage('')

                    setIsModalOpen(false);
                }
                else{
                    console.error('Error: ', response.status)
                    console.log(response.data)

                    setErrorMessage('Error: status code ' + response.status)
                }
            })
            .catch((error) => {
                console.error('Error: ', error)

                setErrorMessage('Error: ' + error.message)
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <React.Fragment>
            <p className="blue log-heading">Log Media</p>

            <div id="plus-cont">
                <img id="plus" src={plus} alt="" style={{ cursor: "pointer" }} onClick={showModal} />
                <ConfigProvider
                    theme={{
                        components: {
                            Modal: {
                                contentBg: "#290024",
                                headerBg: "#290024",
                                titleColor: "white",
                                titleFontSize: "large",
                            },
                        },
                    }}
                >
                    <Modal
                        open={isModalOpen}
                        // okButtonProps={{
                        //     style: { class: "primary", backgroundColor: "#CA89FF", color: "white", fontSize: "16px", height: "35px" },
                        // }}
                        // cancelButtonProps={{
                        //     style: { class: "primary", backgroundColor: "red", color: "white", fontSize: "16px", height: "35px" },
                        // }}
                        //onOk={handleOk}
                        //onCancel={handleCancel}
                        footer={null}
                        width={800}
                        bodyStyle={{ backgroundColor: "#290024" }}
                    >
                        <div className="modalContainer" style={{paddingBottom:"20px"}}>

                            <div className="modalContent">
                                <span style={{paddingLeft:"280px", color:"white", fontSize:"20px", fontWeight:"bolder"}}>Add Content...</span>
                            </div>

                            <div className="modalContent">
                                <span className="blue labels" style={{paddingLeft:"10px"}}>Content Type:</span>
                            </div>

                            <div className="modalContent" style={{paddingBottom:"30px"}}>
                            <select
                            style={{
                                backgroundColor: "#8a0791",
                                color: "#CA89FF",
                                marginTop: "5px",
                                fontSize: "18px",
                                width: "340px",
                                height: "40px",
                                borderRadius: "30px",
                                paddingLeft: "30px",
                                borderColor: "transparent",
                            }}
                            value={formData.media_type}
                            onChange={(e) => handleInputChange({ target: { name: "media_type", value: e.target.value } })}
                            >
                                <option value="Book">Book</option>
                                <option value="Movie">Movie/TV Show</option>
                                <option value="Video Game">Video Game</option>
                                </select>
                            </div>

                            <div className="modalContent">
                                <span className="blue labels" style={{paddingLeft:"10px", paddingRight:"280px"}}>Content Title:</span>
                                <span className="blue labels">
                                    Your Rating:
                                </span>
                            </div>

                            {/* <div className="modalContent">
                                <input

                                className="input-field pink"
                                type="text"
                                name="media_name"
                                value={formData.media_name}
                                onChange={handleInputChange}

                                style={{ width: "300px" }}
                                /> */}

                                <div className="modalContent" style={{display:"flex"}}>
                                    <input
                                        className="input-field pink"
                                        type="text"
                                        name="media_name"
                                        value={formData.media_name}
                                        onChange={handleInputChange}
                                        style={{ width: "300px" }}
                                    />
                                    {searchTerm && results.length > 0 && (
                                        <div className="searchResults" style={{width:"500px"}}>
                                            <ul>
                                                {results.map((resultGroup, index) => (
                                                    <li key={index}>
                                                        {resultGroup.type.toUpperCase()}:
                                                        {resultGroup.data.map((result, i) => (
                                                            <div key={i} onClick={() => handleResultClick(result)} className="searchResultItem">
                                                                {result.media_name || result.username}
                                                            </div>
                                                        ))}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                <div className="modalContent" style={{height:"75px", width:"280px", paddingLeft:"100px"}}>
                                    <AvgRatings onRatingChange={handleRatingChange} />
                                </div>

                            </div>

                            <div className="modalContent">
                                <span className="blue labels" style={{paddingLeft:"10px"}}>Content Creator:</span>
                            </div>

                            <div className="modalContent" style={{paddingBottom:"30px"}}>
                                <input
                                className="input-field pink"
                                type="text"
                                name="creator"
                                value={formData.creator}
                                onChange={handleInputChange}
                                style={{ width: "300px", height: "40px" }}
                                />
                            </div>

                            <div className="modalContent">
                                <span className="blue labels" style={{paddingLeft:"10px"}}>Review:</span>
                            </div>

                            <div className="modalContent" style={{display:"flex", justifyContent:"center"}}>
                                <textarea
                                className="input-field pink"
                                type="text"
                                name="media_review"
                                value={formData.media_review}
                                onChange={handleInputChange}
                                style={{ width: "85%", height: "50px", paddingLeft: "38px", paddingRight: "38px" }}
                                ></textarea>
                            </div>
                        </div>

                        {errorMessage && (
                            <div style={{ color: 'red', marginTop: '1px', marginBottom: '5px', paddingLeft: '12px', fontFamily:'Roboto Mono', fontSize: '18px', alignItems:'center' }}>
                                {errorMessage}
                            </div>
                        )}

                        <div className="modalContent modalButton" style={{display:"flex", justifyContent:"center"}}>
                            <button className="ok" onClick={handleOk}>
                                Save
                            </button>

                            <div style={{paddingRight:"12px"}}></div>

                            <button className="cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>


                        
                    </Modal>
                </ConfigProvider>
            </div>
        </React.Fragment>
    );
}

function ClippedRatings(props){
    
    const average = array => {
        if (array.length == 0){
            return 0
        }

        return array.reduce((a, b) => a + b) / array.length;
    }
    console.log("ratings",props.ratings, average(props.ratings),average(props.ratings)/5 * 100, props.ratings && props.ratings.length > 0)
    console.log("setting", 100-average(props.ratings)/5 * 100)

    return(
        <React.Fragment>
            <p className="blue co-heading">Your Average Rating</p>
            <div class="meter-bg" id="stars-cont">

                {/* we can find how much of this to display by
                    setting the clip-path: inset(0px <100 - avg rating>% 0px 0px)
                    property */}
                <img style={{clipPath:`inset(0px ${100 -( average(props.ratings)/5 * 100)}% 0px 0px)`}} class="transparent stars" src={stars} alt="" />
            </div>
        </React.Fragment>
    )
}


export default function Metrics(props){

    // let books = []
    // let games = []
    // let movies = []
    let data = {
        books:[],
        games:[],
        movies:[]
    }

    let ratings = []

    if (!(props.tracked == {})){
        for (const [k, key] of Object.entries(props.tracked)) {
            if (key.media_type === "Book"){
                data.books.push(key)
            }
            if (key.media_type === "Movie"){
                data.games.push(key)
            }
            if (key.media_type === "Game"){
                data.movies.push(key)
            }

            ratings.push(parseInt(key.media_rating))
        }
    }else{
        console.log("STOP")
    }
    console.log(ratings)


    return(
        <div id="metric-container">

            <div id="metric-col1" className="cols">
                <div id="co-container" className="cols">
                    <ChronicallyOnlineMeter data={data}/>
                </div>
                <div id="rating-container" className="cols" style={{pointerEvents:"none"}}>
                    <ClippedRatings ratings={ratings}/>
                </div>
            </div>

            <div id="metric-col2" className="cols">
                <div id="tracking-container" className="cols transparent stars-cont">
                    <Tracking data={data}/> 
                </div>   
                {<div id="log-container" className="cols">
                    <Log />
                </div>}
            </div>

            <div id="metric-col3">
                <div id="grass-container" className="cols transparent stars-cont">
                    <GrassMeter data={data}/>
                </div>
            </div>

        </div>
    )
}








