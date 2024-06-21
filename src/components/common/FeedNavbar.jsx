import React, { useState } from "react";

import '../../App.css';

import {Link} from "react-router-dom"

import logo from "../../assets/logo.png"
import SearchBar from "./searchbar";
import Tabs from '../Tabs.jsx'
import FriendEntry from "../FriendEntry";
import BlockedEntry from "../BlockedEntry";
import Notif from "../Notif.jsx";


function SearchNavbar(props){

    const[sidebar, setSidebarState] = useState(1);
    const toggleBar = (index) => {
        setSidebarState(index);
    }

    console.log(props)

    let comp = (props.links === false ) 
        ?
        null : 
        <div id="nav-links" style={{marginLeft: '25%', pointerEvents: 'none'}} title="feature under development">
            <Link class= {(props.highlight && props.highlight === "feed" )? "blue" : "white"} type={(props.hide && props.hide === "true")? "hidden" : ""} to="/feed">Feed</Link>
            <Link class= {(props.highlight && props.highlight === "dashboard" )? "blue" : "white"} type={(props.hide && props.hide === "true")? "hidden" : ""} to={"/dashboard?id="+sessionStorage.getItem("userID")}>Dashboard</Link>
        </div>

    console.log(comp, ( props.links == false ) )

    return (
        <div>
            <div id="navbar" style={{ width: '90%'}} title="feature under development">
                <div class="hamburger" onClick={() => toggleBar(1)} type={sidebar == 1 ? "hidden" : "" }>☰</div>
                <div class="hamburger" onClick={() => toggleBar(2)} type={sidebar == 2 ? "hidden" : "" }>☰</div>
                <a href="/" id="logo">
                    <img src={logo} alt="chronline logo"></img>
                </a>
                <form style={{pointerEvents: 'none'}} title="feature under development">
                    <SearchBar />
                    {/* <input type={(props.hide && props.hide === "true")? "hidden" : "search"} class="search-field" placeholder="  Search..." title="feature under development"></input> */}
                </form>

                {comp}
                
            </div>
            <div class="sidebar" type={sidebar == 2 ? "active" : "" }>
                
            </div>
            
        </div>
    )

}

export default SearchNavbar