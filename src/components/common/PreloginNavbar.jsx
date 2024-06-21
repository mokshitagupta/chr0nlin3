import React from "react";
import '../../App.css';

import {Link} from "react-router-dom"

import logo from "../../assets/logo.png"



function PreloginNavbar(props){
    console.log(props)
    
    let comp = (props.links == false ) 
        ?
        null : 
        <div id="nav-links">
            <Link class= {(props.highlight && props.highlight === "login" )? "blue" : "white"} to="/login">Login</Link>
            <Link class= {(props.highlight && props.highlight === "register" )? "blue" : "white"} to="/register">Register</Link>
        </div>

    console.log(comp, ( props.links == false ) )
    return (
        <div id="navbar">
            <Link to="/" id="logo">
                <img id="logo-img" src={logo}></img>
            </Link>

            
            {comp}
            
        </div>
    )
}

export default PreloginNavbar

// import React from "react";


// //import the new css file i need to 


// import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";

// function PreloginNavbar(props) {
//     console.log(props);
    
//     let comp = (props.links === false) 
//         ?
//         null : 
//         <div id="nav-links">
//             <Link class={(props.highlight && props.highlight === "login") ? "blue" : "white"} to="/login">Login</Link>
//             <Link class={(props.highlight && props.highlight === "register") ? "blue" : "white"} to="/register">Register</Link>
//         </div>;

//     console.log(comp, (props.links === false));
//     return (
//         <div id="navbar">
//             <Link to="/" id="logo">
//                 <img id="logo-img" src={logo} alt="Logo"></img>
//             </Link>
//             {comp}
//         </div>
//     );
// }

// export default PreloginNavbar;
