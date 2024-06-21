import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/components/loginDeleteButton.css";


function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const sessionData = {
            sessionID: window.sessionStorage.getItem('sessionID'),
            username: window.sessionStorage.getItem('username'),
            userID: window.sessionStorage.getItem('userID'),
        };

        const url = process.env.REACT_APP_BASE_API + "/auth/logout.php";

        console.log(url, process.env.REACT_APP_BASE_API, process.env.REACT_APP_BASE_URL)
    

        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        };


        // const url =  process.env.REACT_APP_BASE_API+ "/auth/signup.php"
        
        // 
        // const headers = {
        //     "Content-Type": "application/json",
        //     'Access-Control-Allow-Origin': '*'
        //     //Authorization: token, Bearer token or whatever applies
        // }


        axios.post(url, sessionData,  headers )
            .then(response => {
                if (response.status === 200) {
                    // Clear the session data in the client-side
                    window.sessionStorage.removeItem('sessionID');
                    window.sessionStorage.removeItem('username');
                    window.sessionStorage.removeItem('userID');

                    // Navigate to the login page
                    navigate('/login');
                } else {
                    // Handle the case when the response status is not 200
                    throw new Error(`Logout failed with status code: ${response.status}`);
                }
            })
            .catch(error => {
                console.error("Logout failed:", error);
            });
    };

    return (
        <button 
            className="will-logout-btn will-logout-delete-btns" 
            type="button" 
            style={{ cursor: 'pointer' }} 
            onClick={handleLogout}
        >
            LOGOUT
        </button>
    );
}

export default LogoutButton;
