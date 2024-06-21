import React from "react";
import '../App.css';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

import Protect from "./common/Protection.js"
import PostLoginNavbar from "./common/PostLoginNavbar";
import surfboard from "../assets/surfboard.png";

export default function Logout(){
    let navigate = useNavigate()
    useEffect(() => {Protect({navigate:navigate})}, [])

    return(
        <div class="fixed">
            <PostLoginNavbar hide="true" />
            <div class="container">
                <div>
                    <img id="surfboard" src={surfboard} style={{width: '60%', marginLeft: '5%'}}></img>
                </div>
                <div>
                    <span class="big" style={{color: 'white'}}>You have been successfully logged out!<br></br>
                    Hopefully you went to touch some grass.</span>
                </div>
                <div style={{width: '50%', cursor: 'pointer', display:'flex', paddingTop: '5%', marginLeft: '8%'}}>
                    <br></br><br></br>
                    <span style={{padding: '20px'}}></span>
                    <a class="button" type="submit" href="/login">Login</a>
                    <span style={{padding: '20px'}}></span>
                    <a class="button" type="submit" href="/register">Register</a>
                </div>
            </div>
        </div>
    )
}