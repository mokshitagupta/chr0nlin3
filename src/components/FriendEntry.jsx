import React, { useState } from "react";
import '../App.css';

function FriendEntry(props){

    let friendname = props.friendname
    let friend_id = props.friend_id
    let dashLink = "/dashboard?id=" + friend_id

    const url = process.env.REACT_APP_BASE_API+ "/unfriend.php"

        const formData = new FormData();
        formData.append('unfriend', friend_id);
        formData.append('user_id', sessionStorage.getItem("userID"));

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        function refreshPage() {
            window.location.reload(false);
        }

    function removeFriend(){
            
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

        refreshPage();

    }
    
    return(
            <div class="feed_entry" type="friend">
                <div class="entry_content"><a href={dashLink}>@{friendname}</a> <a style={{color: '#ff0000'}} onClick={ () => removeFriend() }>Unfriend</a></div>
            </div>
    )
}

export default FriendEntry