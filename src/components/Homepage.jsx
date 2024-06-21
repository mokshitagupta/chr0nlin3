import React from "react";
import '../App.css';

import PreloginNavbar from "./common/PreloginNavbar";

import banner from "../assets/banner.png"

function Homepage(){
    return (
        <div>
            <PreloginNavbar/>

                <div id="hp-flex">
                <img src={banner} id="banner"></img>
                <div id="intro-text">
                    <p class="white">
                        It's time to beat the chronically online allegations. 
                        <br></br><br></br>
                        Track the <span class="pink">media</span> you consume, including 
                        <span class="pink"> movies, books, games, and more! </span> 
                        Using our algorithm, we'll tell you when it's time to <span class="strike">touch grass</span> go outside.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Homepage