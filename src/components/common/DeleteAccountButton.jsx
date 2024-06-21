import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/components/loginDeleteButton.css";



function DeleteAccountButton() {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        // 1. Retrieve session data
        const sessionData = {
            sessionID: window.sessionStorage.getItem('sessionID'),
            username: window.sessionStorage.getItem('username'),
            userID: window.sessionStorage.getItem('userID'),
        };

        // 2. Send an Axios POST request to delete the account
        const url = process.env.REACT_APP_BASE_API + "/auth/delete-account.php";
        console.log(url, process.env.REACT_APP_BASE_API, process.env.REACT_APP_BASE_URL)
        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        };


        console.log(sessionData);

        try {
            const response = await axios.post(url, sessionData,  headers );

            if (response.status === 200) {
                // 3. Handle success and navigate to /register
                // Clear window session data
                window.sessionStorage.clear();
                navigate('/register');
            } else {
                // Handle non-200 response here if needed
                console.error("Non-200 response received:", response);
                // You can add code here to display an error message to the user if needed
            }
        } catch (error) {
            // 4. Handle the error, you can log the error or display an error message
            console.error("Error deleting account:", error);
            // You can add code here to display an error message to the user if needed
        }
    };

    return (
        //DA2C38
        <button
            className="will-delete-btn will-logout-delete-btns"
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={handleDeleteAccount}
        >
            DELETE ACCOUNT
        </button>
    );
}

export default DeleteAccountButton;
