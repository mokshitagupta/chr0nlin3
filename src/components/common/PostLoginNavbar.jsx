import React from "react";
import '../../App.css';

import {Link} from "react-router-dom"

import logo from "../../assets/logo.png"

function PostLoginNavbar(props){
    console.log(props)

    return (
        <div id="navbar" style={{width: '100%'}}>
            <Link to="/" id="logo">
                <img src={logo} alt="chronline logo" style={{width: "30%"}}></img>
            </Link>
            
        </div>
    )
}

export default PostLoginNavbar