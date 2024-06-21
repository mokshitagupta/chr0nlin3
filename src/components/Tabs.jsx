import React, { useState, useEffect } from "react";
import '../App.css';
import FriendEntry from "./FriendEntry.jsx";
import BlockedEntry from "./BlockedEntry.jsx";
import Notif from "./Notif.jsx";
import axios from "axios"

function Tabs(){
    const [requests, setRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [blocked, setBlocked] = useState([])
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }
    const getID = sessionStorage.getItem('userID');

    useEffect(() => {
        const url = process.env.REACT_APP_BASE_API+ "/get-requests.php"
            
        const headers = {
            // "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': '*'
        }
    
        axios.get(url, headers)
        .then((response) => {
            console.log(response.data)
            if (response.status >= 200 && response.status <= 300){

                let filteredData = []
                response.data.forEach((element) => {
                    if (element.user_id == getID) {
                        filteredData.push(element)
                    }
                });

                setRequests(filteredData.reverse());
                console.log(requests);

            }
            
        })
        .catch(function (error) {
            console.log(error)
        })
    },[])

    let formData = new FormData();
    formData.append('user_id', sessionStorage.getItem("userID"));

    useEffect(() => {
        const url = process.env.REACT_APP_BASE_API+ "/get-friends.php"

        const headers = {
            // "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': '*',
            'Authorization': `Bearer ${sessionStorage.getItem('sessionID')}`
        }
            
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
               setFriends(data);
               console.log(friends)
            })
            .catch(error => {
                console.error(error);
            });
    
    },[])

    useEffect(() => {
        const url = process.env.REACT_APP_BASE_API+ "/get-blocked.php"

        const headers = {
            // "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': '*',
            'Authorization': `Bearer ${sessionStorage.getItem('sessionID')}`
        }
            
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
               setBlocked(data);
               console.log(blocked)
            })
            .catch(error => {
                console.error(error);
            });
    
    },[])

    function checkLength(element){
        return element.length > 0
    }

    let f = friends.toString()
    //let json = JSON.parse(f)

    // let f = friends.toString().split(":")
    // let users = f[0]
    // let usersArr = users.split(",")
    // // usersArr = usersArr.filter(checkLength)
    // console.log("usersArr " + usersArr)

    // usersArr.forEach(element => {
    //     if(element.length > 0){
    //         console.log("Length" + element.length)
    //     }
    // });

    // let ids = f[1]
    // // f = f.toString().replace('"', '')
    // // let friendsArr = f.toString().split(",")
    // console.log(f)
    
    return(
        <div class="feed_sidebar">
            <div class="feed_notif">
                <div class="feed_head">
                    Notifications
                </div>
                <div class="flex-notif" style={{overflowY: 'scroll'}}>
                    {requests.map(request =>
                        <Notif sender = {request.sender} sender_id = {request.sender_id} request_type = {request.request_type} request_id = {request.request_id}/>
                    )}
                </div>
            </div>

            <div class="feed_fb">
                <div class="feed_tab" type={toggleState === 1 ? "active" : ""} onClick={() => toggleTab(1)}>
                    Friends
                </div>
                <div class="feed_tab" type={toggleState === 2 ? "active" : ""} onClick={() => toggleTab(2)}>
                    Blocked
                </div>
                
                <div class="feed_content" type={toggleState == 1 ? "active" : "" }>
                    <div class="flex-fb">
                        {friends.map(friend =>
                            <FriendEntry friendname = {friend['username']} friend_id = {friend['user_id']} />
                        )}
                    </div>
                </div>
                <div class="feed_content" type={toggleState == 2 ? "active" : "" }>
                    <div class="flex-fb">
                        {blocked.map(block =>
                            <BlockedEntry blockedname = {block['username']} blocked_id = {block['user_id']} />
                        )}
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Tabs