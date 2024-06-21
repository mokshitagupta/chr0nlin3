import "../../styles/dashboard.css"
import "../../App.css"
import {Fragment, useEffect} from "react"

import EditButton from "./EditButton.jsx"
import LogoutButton from "./LogoutButton.jsx"
import DeleteAccountButton from "./DeleteAccountButton.jsx"



export default function ProfileSection(props){

    const username = props.username
    const bio = props.bio
    const pic = props.pic
    const clean = props.clean

    

    return(
        <Fragment>
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
                {/* <div style={{height:"50%"}} className='button-wrapper'>
                        <LogoutButton type="button"/>
                        <DeleteAccountButton type="button" />
                </div> */}
            </div>
        </Fragment>
    )
}