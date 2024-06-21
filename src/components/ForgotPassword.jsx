import React, { useRef, useState,useEffect } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../App.css';

import PreloginNavbar from "./common/PreloginNavbar";
import FeedbackPreLogin from "./common/FeedbackPreLogin.jsx"


import sqiggles from "../assets/sqiggles.png";
import axios from "axios";
import qs from 'qs';



export default function ForgotPassword(){

    const ref = useRef()
    const navigate = useNavigate();
    const [feedbackText, setText] = useState("")
    const [type, setType] = useState("red")
    const [newFeedBack, setNew] =  useState(null)

    useEffect(() => {
        setNew(<FeedbackPreLogin type={type} feedback={feedbackText} />)
    },[feedbackText])

    const sendEmail = () => {
        const url =  process.env.REACT_APP_BASE_API+ "/auth/request-reset.php" 
        
        console.log(url, process.env.REACT_APP_BASE_API, process.env.REACT_APP_BASE_URL)

        const email = ref.current.value
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        console.log(email, "email")

        if (email.length == 0 ){
            setText("Email field is empty!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on empty fields
        }

        if (emailPattern.test(email) == false){
            setText("Email is invalid!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on weak pass
        }

        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            //Authorization: token, Bearer token or whatever applies
        }
    
        axios.post(url, qs.stringify({
            email: email,
        }), headers)
        .then(function (response) {
            console.log(response.data)
            setText("Token sent!")
            setType("green")
            // setNew(newFeedBack? !newFeedBack : true)

            navigate("/reset");
            
        })
        .catch(function (error) {
            setText("Email is not associated with an account!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
        })

    }


    return(
        <div id="forgot-container">
            <PreloginNavbar/>
            
            <div id="forgot-cont">
                <form id="forgot-form">
                <span class="blue labels">Email:</span> <br></br>
                <input ref={ref} class="input-field pink" type="text" name="name"></input> <br></br>
                {newFeedBack }
                <br></br> 
                {/* <button onClick={sendEmail} class="button center" type="button"><a class="invisible blue" href="/reset">Verify</a></button> */}
                <button onClick={sendEmail} class="button center" type="button">Verify</button>
                </form>
            </div>

            <img id="sqiggles" src={sqiggles}></img>
        </div>
    )
}