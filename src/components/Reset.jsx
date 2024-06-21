import '../App.css';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import qs from 'qs';



import PreloginNavbar from "./common/PreloginNavbar";
import FeedbackPreLogin from "./common/FeedbackPreLogin.jsx"


import sqiggles from "../assets/sqiggles.png";


export default function Reset(){

    const ref = useRef()
    const [feedbackText, setText] = useState("")
    const [type, setType] = useState("red")
    const [newFeedBack, setNew] =  useState(null)

    useEffect(() => {
        setNew(<FeedbackPreLogin type={type} feedback={feedbackText} />)
    },[feedbackText])

    const reset = () =>{
        const data = new FormData(ref.current)
        const password = data.get("pass")
        const confPassword = data.get("confPass")
        const token = data.get("token")
        const email = data.get("email")

        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    

        if (email.length == 0 ){
            setText("Email field is empty!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on empty fields
        }

    
        if (password.length == 0){
            setText("Password field is empty!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on empty fields
        }
    
        if (confPassword.length == 0){
            setText("Confirm Password is empty!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on empty fields
        }

        if (password != confPassword){
            setText("Passwords doesn't match!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on different pass
        }

        if (emailPattern.test(email) == false){
            setText("Email is invalid!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on weak pass
        }

        if (pattern.test(password) == false){
            setText("Password must contain 8+ characters and at least one letter and number!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
            //some feedback on weak pass
        }

        console.log(password,token)
        const url = process.env.REACT_APP_BASE_API+ "/auth/reset-password.php" 
        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            //Authorization: token, Bearer token or whatever applies
        }


        axios.post(url, qs.stringify({
            password:password,
            token:token,
            email:email,
        }), headers)
        .then(function (response) {
            console.log(response.data)    
            setText("Reset Successful!")
            setType("green")
            // setNew(newFeedBack? !newFeedBack : true)    
            return    
        })
        .catch(function (error) {
            console.log(error.response.data)  
            setText(error.response.data+"!")
            setType("red")
            // setNew(newFeedBack? !newFeedBack : true)
            return
        })

    }
    return(
        <div id="forgot-container">
            <PreloginNavbar/>
            
            <div id="forgot-cont">
                <form id="forgot-form" ref={ref}>
                <span class="blue labels">Verification Code:</span> <br></br>
                <input class="input-field pink" type="password" name="token"></input> <br></br>
                <span class="blue labels">Email:</span> <br></br>
                <input class="input-field pink" type="text" name="email"></input> <br></br>
                <span class="blue labels">New Password:</span> <br></br>
                <input class="input-field pink" type="password" name="pass"></input> <br></br>
                <span class="blue labels">Confirm Password:</span> <br></br>
                <input class="input-field pink" type="password" name="confPass"></input>
                <br></br>
                {newFeedBack}
                <br></br> 
                <button onClick={reset} class="button center" id="reset-btn" type="button">Reset</button>
                </form>
            </div>

            <img id="sqiggles" class="reset" src={sqiggles}></img>
        </div>
    )
}