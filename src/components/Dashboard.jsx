import FeedNavbar from "./common/FeedNavbar.jsx"
// import PostLoginNavbar from "./common/PostLoginNavbar.jsx"
import ProfileSection from "./common/ProfileSection.jsx"
import Metrics from "./Metrics.jsx"
import Protect from "./common/Protection.js"

import cover from "../assets/cover.png"


//wills imports
import DeleteAccountButton from "./common/DeleteAccountButton.jsx"
import LogoutButton from "./common/LogoutButton.jsx"

import "../styles/dashboard.css"

import { useNavigate, useParams, useSearchParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios"



function ScrollList(props){
    console.log(props.data, "Data")
    return(
        <div class="list-bg">

            <div class="l-arrow">
                <svg style={{fill:"var(--blue)", transform: "scaleX(-1)"}} xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </div>
            <ul class="mid-content">

            {
                props.data && props.data.length > 0 ? Object.values(props.data).map(function(data) {
                    console.log(data, "new")
                    return (
                        <li class="centered">
                            <p>{data.post_id}</p><span style={{width:"20px", height:"5px"}}></span>
                            {/* <img src={data.media_img} /> */}
                        </li>
                    )
                }) : null
            }

            {/* {props.data.map(function(data) {
                return (
                    <li class="centered">
                        <img src={data.media_img} />
                    </li>
                )
            })}      */}
                
            </ul>
            <div class="r-arrow">
            <svg style={{fill:"var(--blue)"}} xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </div>
            

        </div>
    )
}


export default function Dashboard(props){

    const data = [
        {
            cover:cover,
        },
        {
            cover:cover,
        },
        {
            cover:cover,
        },
        {
            cover:cover,
        }, {
            cover:cover,
        }, {
            cover:cover,
        }, {
            cover:cover,
        }, {
            cover:cover,
        }, {
            cover:cover,
        }, {
            cover:cover,
        },
    ]

    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate()
    

    let id  = searchParams.get("id")

    console.log(id)
    const [username, setUsername] = useState("loading")
    const [bio, setBio] = useState("Loading...")
    const [pfp, setpfp] = useState("")
    const [tracked, setTracked] = useState({})

    useEffect(() => {

        Protect({navigate:navigate})
        // console.log("called",process.env.REACT_APP_BASE_API)

        let url = process.env.REACT_APP_BASE_API+ "/get-user-info.php?id=" +id
        console.log(url)
            
        const headers = {
            // "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            //Authorization: token, Bearer token or whatever applies
        }
    
        axios.get(url, headers)
        .then(function (response) {
            console.log(response.data)
            if (response.status >= 200 && response.status <= 300){
                console.log(response.data)

                let data =response.data
                let username = data.username
                let bio = data.bio
                let pfp = data.profile_picture

                // console.log(bio, pfp, pfp.substring(1))


                setUsername(username)
                setBio(bio?bio:"Hello World :-)")
                // setpfp(data.profile_picture)
                setpfp(pfp.substring(1))


            }
            
        })
        .catch(function (error) {
            console.log(error)
        })

        let url2 = process.env.REACT_APP_BASE_API+ "/get-user-tracked.php?id=" +id
        console.log(url)
            
        const headers2 = {
            // "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            //Authorization: token, Bearer token or whatever applies
        }
    
        axios.get(url2, headers2)
        .then(function (response) {
            console.log(response.data)
            if (response.status >= 200 && response.status <= 300){
                console.log(response.data, "tracked")
                setTracked(response.data)
                //TODO: dashboard logic
            }
            
        })
        .catch(function (error) {
            console.log(error)
        })
    },[])

    // useEffect(() => {
    //     // console.log("called")

        
    // },[])

    return(
        <div display="flex" style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // pointerEvents: "none"
    }}>

            <FeedNavbar/>
            <div class="pg-content">
                <div id="db-upper">
                    <div id="pfp-section">
                    <ProfileSection real={true} username={username} bio={bio} pic={pfp}/>
                    </div>
                    <div id="metrics">
                        <Metrics tracked={tracked}  />
                    </div>
                </div>
                <div id="db-lower">
                    {/* <div className="lineup">
                        <p className="blue co-heading ">Your In-Progress</p>
                        <ScrollList data={[]}/>
                    </div> */}
                    <div className="lineup">
                        <p className="blue co-heading ">Your Completed (under developement)</p>
                        <ScrollList data={[]} heading="Completed"/>
                    </div>
                    <div> 
                        <DeleteAccountButton  />
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}