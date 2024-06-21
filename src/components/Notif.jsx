import React, { useState } from "react";
import '../App.css';
import axios from "axios"
import accept from "../assets/checkmark.png"
import decline from "../assets/decline.png"

function Notif(props){

    let sender = props.sender;
    let sender_id = props.sender_id;
    let request_type = props.request_type;
    let request_id = props.request_id;
    const dashLink = "/dashboard?id=" + sender_id;

        const formData = new FormData();
        formData.append('new_friend', sender_id);
        formData.append('user_id', sessionStorage.getItem("userID"));
        formData.append('request_id', request_id)

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        function refreshPage() {
            window.location.reload(false);
        }

        function addFriend(){

            const url = process.env.REACT_APP_BASE_API+ "/update-friends.php"
            
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'HEAD, DELETE, POST, GET, OPTIONS, PUT, PATCH',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
            }

            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        
            // axios.post(url, null, {data: formData})
            // .then((response) => {
            //     console.log(response.data)
            //     if (response.status >= 200 && response.status <= 300){
            //         console.log(response);
            //     }
                
            // })
            // .catch(function (error) {
            //     console.log(error)
            // })

            refreshPage();

        }

        function rejectFriend(){

            const url = process.env.REACT_APP_BASE_API+ "/delete-notification.php"
            
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'HEAD, DELETE, POST, GET, OPTIONS, PUT, PATCH',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
            }

            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        
            // axios.post(url, null, {data: formData})
            // .then((response) => {
            //     console.log(response.data)
            //     if (response.status >= 200 && response.status <= 300){
            //         console.log(response);
            //     }
                
            // })
            // .catch(function (error) {
            //     console.log(error)
            // })

            refreshPage();

        }
    
    return(
                <div class="feed_entry" style={request_type && request_type === "friend" ? {marginTop: '.75%', marginLeft: '10px'} : {display: 'none'}}>
                    <div class="entry_content">
                        <div class="notif"><a style={{cursor: 'pointer'}} href={dashLink}>{sender}</a> has requested to be your friend!</div>
                        <a onClick={() => { addFriend(); }}>
                            <img src={accept} style={{height: '6vh', marginTop: '-1vh', position: 'relative'}}></img>
                        </a>

                        <a onClick={() => { rejectFriend(); }}>
                        <img src={decline} style={{height: '6vh', marginTop: '-1vh', position: 'relative'}}></img>
                        </a>
                    </div>
                </div>
    )
}

export default Notif