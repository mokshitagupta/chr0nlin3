import '../App.css';

import PreloginNavbar from "./common/PreloginNavbar";
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Protect from "./common/Protection.js"

import sqiggles from "../assets/sqiggles2.png";
import ProfileSection from './common/ProfileSection.jsx';

import axios from 'axios';
import qs from 'qs';


export default function SetupAccount(){

    const [file, setFile] = useState()
    const [pfp, setPic] = useState(null)
    const [remaining, setRemaining] = useState(70)
    const [bio, setBio] = useState("")
    const username = sessionStorage.getItem("username")
    const navigate = useNavigate();


    const BIO_MAX = 70

    let ref = useRef(null)
    let formRef = useRef(null)
    let submitRef = useRef(null)
    let bioRef = useRef(null)

    useEffect(() => {
        setRemaining(BIO_MAX - bio.length)
    }, [bio])

    useEffect(() => {
        Protect({navigate:navigate})
    }, [])

    const clear = () => {

        console.log(ref.current.files)

        ref.current.value = "";
        setFile(null)
        setPic(null)

    }

    const updateBio = () => {

        const text = bioRef.current.value
        

        if (text.length <= BIO_MAX){
            setBio(text)
        }
    }

    const handleUploadChange = (event) => {
        // clear()
        console.log(event.target.files[0])
        setFile(URL.createObjectURL(event.target.files[0]))
        setPic(URL.createObjectURL(event.target.files[0]))
    }

    const sendSet = ()=> {
        const form = new FormData(formRef.current)
        form.append('userId', sessionStorage.getItem("userID"));
        console.log(form, form.get("pic"),form.get("bio") )

        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            //Authorization: token, Bearer token or whatever applies
        }

        const url = process.env.REACT_APP_BASE_API+ "/users.php"
        console.log(url)

        submitRef.current.disabled = true

        axios.post(url, form, headers)
        .then(function (response) {
            console.log(response)
            if (sessionStorage.getItem("userID")){

            }
            navigate("/dashboard?id="+sessionStorage.getItem("userID"))
            // submitRef.current.disabled = false
            
        })
        .catch(function (error) {
            // console.log("error", error.response.data);
            // console.log(error);
            console.log(error)
            submitRef.current.disabled = false
        })
    }



    return(
        <div id="forgot-container">
            <PreloginNavbar links={false}/>
            
            <div class="horz-flex" id="set-up-container">
                <div id="add-info">
                <form ref={formRef} id="upload-form">
                        <span class="blue labels center">Profile Picture:</span> <br></br><br></br>

                        <div class="flex-btn">

                        <label for="file-upload" class="button center">
                            <a>Upload</a>
                        </label>
                        <input name="pic" ref={ref} onChange={handleUploadChange} id="file-upload" type='file'></input>
                            
                        <button onClick={clear} class="button center red-btn" type="button">Clear</button>
                        </div>
                        <br></br>
                        <br></br>

                        <span class="blue labels center">Bio:</span> <br></br>

                        <label for="bio-box"></label>
                        <textarea maxlength={BIO_MAX} onChange={updateBio} ref={bioRef} class="input-field pink" id="bio-box" type="text" name="bio" placeholder='Enter a short bio!'> 
                        </textarea>
                        <p class="small white center">{"You have "+remaining+" chars remaining!"}</p> 

                        
                        <button ref={submitRef} class="button center" id="set-btn" onClick={sendSet} type="button">Set!</button>
                </form>
                </div>
                
                <div id="preview">
                    <span class="blue labels">Preview:</span> <br></br>
                    <ProfileSection clean={true} pic={pfp} bio={bio==""?"Hello World :)":bio} username={username?username:"tester"} />

                </div>
            </div>

            <img id="sqiggles2"  src={sqiggles}></img>
        </div>
    )
}