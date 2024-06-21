import React from "react";
import '../App.css';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

import Protect from "./common/Protection.js"

import PostLoginNavbar from "./common/PostLoginNavbar";
import WomanTextingBench from "../assets/WomanTextingBench.png";

export default function DeleteAccount(){
    let navigate = useNavigate()
    useEffect(() => {Protect({navigate:navigate})}, [])
    
    return(
        <div class="fixed">
            <PostLoginNavbar hide="true"/>
            <div class="flex-banner">
                <img id="WomanTextingBench" src={WomanTextingBench} style={{marginLeft: '32%', width: '600px', height: '600px'}}></img>
                <div style={{marginLeft: '30%', position: 'fixed', marginTop: '32%', width: '50%'}}>
                    <span class="white" style={{fontSize: '25px', marginLeft: '5%'}}>Your account has been successfully deleted!<br></br></span>
                    <span class="white" style={{fontSize: '25px', marginLeft: '7%'}}>Hopefully you went to touch some grass.</span>
                    <a href="/register"><button class="button" type="submit" style={{marginLeft: '15.4%', marginTop: '6%', cursor:'pointer'}}>Create new account</button></a>
                </div>
            </div>
        </div>
    )
}