import "../../styles/dashboard.css"
import "../../styles/editprof.css"
import "../../App.css"
import React from "react"

import EditButton from "./EditButton.jsx"



export default function ProfileSection(props){

    const username = props.username
    const bio = props.bio
    const pic = props.pic
    const clean = props.clean

    return(
        <React.Fragment>
            <div id="pic-grp">
                <div class="pfp-bg">
                    {pic ? <img class="pfp" src={pic} alt="User's profile picture" /> : null}
                    
                </div>
                {clean == true? null : <EditButton position="corner"/>}
            </div>
            
            <div class="bio-bg">
                <div class="text-info">
                    <b><p class="blue heading mid username">@{username}</p></b>
                    <p class="pink body mid">{bio}</p>
                </div>
            </div>
        </React.Fragment>
    )
}