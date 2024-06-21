import React, { useState } from "react";
import { forwardRef, useRef } from 'react';
import { useNavigate } from "react-router-dom";


import axios from 'axios';
import qs from 'qs';

import '../App.css';
import '../styles/pages/register.css'
import 'animate.css';

import PreloginNavbar from "./common/PreloginNavbar";
import boy from "../assets/BoyInScreen.png";
import FeedbackPreLogin from "./common/FeedbackPreLogin.jsx"


function validatePassword(email,username,password,confPassword){

    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const usernamePattern = /^[a-zA-Z0-9]+$/
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    //Minimum eight characters, at least one letter and one number
    //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript



    if (email.length == 0 ){
        return ["Email field is empty", false, "email"]
        //some feedback on empty fields
    }

    if ( username.length == 0 ){
        return ["Username field is empty", false, "username"]
        //some feedback on empty fields
    }

    if (password.length == 0){
        return ["Password field is empty", false, "password"]
        //some feedback on empty fields
    }

    if (confPassword.length == 0){
        return ["Confirm Password is empty", false, "confPassword"]
        //some feedback on empty fields
    }

    console.log(pattern.test(password))

    if (pattern.test(password) == false){
        return ["Password must contain 8+ characters, including at least one letter and number", false, "password"]
        //some feedback on weak pass
    }

    if (usernamePattern.test(username) == false){
        return ["Username is invalid", false, "username"]
        //some feedback on weak pass
    }

    if (emailPattern.test(email) == false){
        return ["Email is invalid", false, "email"]
        //some feedback on weak pass
    }

    if (password != confPassword){
        return ["Passwords doesn't match", false, "confPassword"]
        //some feedback on different pass
    }

    return ["", true]
}





export default function Register(){
    const [validated, setValid] = useState(null)
    const [feedbackText, setFB] = useState(false)
    const [newFeedback, setNew] = useState(null)
    const navigate = useNavigate();

    let register = (ref) => {


        let form = new FormData(document.querySelector("form"))
        console.log(form.get("username"), form.get("password"), form.get("email"))
    
        const email = form.get("email")
        const username = form.get("username")
        const password = form.get("password")
        const confPassword = form.get("confPassword")

        const feedback = validatePassword(email, username, password, confPassword)
    
        if ( feedback[1] == false){
            setNew(!newFeedback)
            setValid(false)
            setFB(feedback[0])
            return 
        }
    
        const url =  process.env.REACT_APP_BASE_API+ "/auth/signup.php"
        
        console.log(url, process.env.REACT_APP_BASE_API, process.env.REACT_APP_BASE_URL)
    
        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            //Authorization: token, Bearer token or whatever applies
        }

        // let data = new FormDat 
    
        axios.post(url, form, headers)
        .then(function (response) {

            console.log(response)
            if (response.status >= 200 && response.status <= 300){
                setValid(true)
                setNew(null)
                console.log(response.data)
                setFB("Registration Succesful!")

                sessionStorage.setItem("userID", response.data.userID)
                sessionStorage.setItem("sessionID", response.data.sessionID)
                sessionStorage.setItem("username", response.data.username)

                navigate( "/setup-account")
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
            <PreloginNavbar highlight="register"/>
            <div class="flex-banner">
                
                <div class="register-form">
                    <form>
                        <span class="register-label">Email:</span> 
                        <input class="register-input" type="text" name="email"></input> 
                        
                        <span class="register-label">Username:</span> 
                        <input class="register-input" type="text" name="username"></input> 
                        <span class="register-label">Password:</span>
                        <input class="register-input" type="password" name="password"></input> 
                        <span class="register-label">Confirm Password:</span> 
                        <input class="register-input" type="password" name="confPassword"></input> 

                        {newFeedback != null ? <FeedbackPreLogin type="red" feedback={feedbackText} /> : null}
                        {validated == true ? <FeedbackPreLogin type="green" feedback={feedbackText} /> : null}
                        
                        <button id="reg-btn" type="button" onClick={register} class="register-button">Register</button>
                        
                
                    </form>

                    
                    

                </div>

                <img id="couple-image" class = 'couple-image' src={boy}></img>
            </div>
        </div>
    )
}