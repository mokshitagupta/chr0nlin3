import React from "react";

import '../App.css';

import {Link} from "react-router-dom"

import logo from "../assets/logo.png"
import SearchBar from "./common/searchbar";



function SearchNavbar(props){
    console.log(props)

    let comp = (props.links === false ) 
        ?
        null : 
        <div id="nav-links" style={{marginLeft: '25%'}}>
            <Link class= {(props.highlight && props.highlight === "feed" )? "blue" : "white"} type={(props.hide && props.hide === "true")? "hidden" : ""} to="/feed">Feed</Link>
            {/* <Link class= {(props.highlight && props.highlight === "dashboard" )? "blue" : "white"} type={(props.hide && props.hide === "true")? "hidden" : ""} to="/dashboard">Dashboard</Link> */}
        </div>

    console.log(comp, ( props.links == false ) )

    return (
        <div id="navbar" style={{ width: '100%'}}>
            <a href="/" id="logo">
                <img src={logo} alt="chronline logo"></img>
            </a>
            <SearchBar />

            {comp}
            
        </div>
    )

}

export default SearchNavbar




