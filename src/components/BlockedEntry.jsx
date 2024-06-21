import React, { useState } from "react";
import '../App.css';

function BlockedEntry(props){

    let blockedname = props.blockedname
    let blocked_id = props.blocked_id
    let dashLink = "/dashboard?id=" + blocked_id

    const url = process.env.REACT_APP_BASE_API+ "/unblock.php"

        const formData = new FormData();
        formData.append('unblock', blocked_id);
        formData.append('user_id', sessionStorage.getItem("userID"));

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        function refreshPage() {
            window.location.reload(false);
        }

    function unblock(){
            
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
            <div class="feed_entry" type="blocked">
                <div class="entry_content"><a href={dashLink}>@{blockedname}</a> <a style={{color: '#ff0000'}} onClick={ () => unblock() }>Unblock</a></div>
            </div>
    )
}

export default BlockedEntry