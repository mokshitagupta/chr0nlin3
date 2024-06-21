import '../App.css';
import '../styles/pages/login.css'

import React, { useState } from "react";
import { forwardRef, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import FeedbackPreLogin from "./common/FeedbackPreLogin.jsx"


import axios from 'axios';


import PreloginNavbar from "./common/PreloginNavbar";
import couple from "../assets/couple.png";

export default function Login(){

    const [validated, setValid] = useState(null)
    const [feedbackText, setFB] = useState(false)
    const [newFeedback, setNew] = useState(null)
    const navigate = useNavigate();

    const login = () => {
        let form = new FormData(document.querySelector("form"))
        const username = form.get("username")
        const password = form.get("password")

        if ( username.length == 0 ){
            setNew(!newFeedback)
            setValid(false)
            setFB("Username field is empty")
            return 
            //some feedback on empty fields
        }

        if (password.length == 0){
            setNew(!newFeedback)
            setValid(false)
            setFB("Password field is empty")
            return 
            //some feedback on empty fields
        }

        const url =  process.env.REACT_APP_BASE_API+ "/auth/login.php"

        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            //Authorization: token, Bearer token or whatever applies
        }


        axios.post(url, form, headers)
        .then(function (response) {

            console.log(response)
            if (response.status >= 200 && response.status <= 300){
                setValid(true)
                setNew(null)
                console.log(response.data)
                setFB("Login Succesful!")

                sessionStorage.setItem("userID", response.data.userID)
                sessionStorage.setItem("sessionID", response.data.sessionID)
                sessionStorage.setItem("username", response.data.username)

                navigate("/dashboard?id="+sessionStorage.getItem("userID"))
                return 

            }
            
        })
        .catch(function (error) {
            console.log("error", error);
            // console.log(error);
            setNew(!newFeedback)

            setValid(false)
            setFB(error.response.data)
            return 
        })
    }


    return(
        <div class="fixed">
            <PreloginNavbar highlight="login"/>
            <div class="flex-banner">
                <img class = 'couple-image' id="couple-image" src={couple}></img>
                <div class="login-form">
                    <form>
                        <span class="user-pass-label">Username:</span> 
                        <input class="user-pass-input" type="text" name="username"></input> 
                        <span class="user-pass-label">Password:</span> 
                        <input class="user-pass-input" type="password" name="password"></input> 
                        <a class="forgot-pass" href="forgot"> Forgot Password?</a>
                        

                        {newFeedback != null ? <FeedbackPreLogin type="red" feedback={feedbackText} /> : null}
                        {validated == true ? <FeedbackPreLogin type="green" feedback={feedbackText} /> : null}
                        
        
                        <button onClick={login} class="login-button" type="button">Login</button>
                    </form>

                </div>
            </div>
        </div>
    )
}