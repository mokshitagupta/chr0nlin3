import '../App.css';
import React from 'react';
import {Switch} from 'antd'

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react"

// import Protect from "./common/Protection.js"

import PreloginNavbar from "./common/PreloginNavbar";
//import { useEffect, useRef, useState } from 'react';
import { Form, Link, Navigate } from 'react-router-dom';

import sqiggles from "../assets/sqiggles2.png";
import EditProfileSection from './common/EditProfileSection.jsx';
import FeedbackPreLogin from './common/FeedbackPreLogin';
import Toggle from './common/Toggle';
import LogoutButton from './common/LogoutButton';
import DeleteAccountButton from './common/DeleteAccountButton';
//import axios from 'axios';
//import qs from 'qs';

//const MAX_FILE_SIZE = 8192;
const BIO_MAX = 70;
const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const username_pattern = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/; //3-30 characters, all special chars, no spaces/commas



class EditProfilePage extends React.Component{

    
    constructor(props){
        super(props); 
        this.state = {
            email: "",
            username: "",
            password: "",
            created_at: "",
            bio: "",
            profile_picture: "",
            grass_count: "",
            err: false,
            toggle: true,
            privacy: false
        }
        this.fieldChangeHandler.bind(this);
        
    }

    fieldChangeHandler(field, e) {
        console.log("field change");
        this.setState({
          [field]: e.target.value
        });
      }

    handleToggleChange = () => {
        console.log("handleToggleChange called, and now the privacy is:");
        
        this.setState(prevState => ({
            toggle: !prevState.toggle,
            privacy: !prevState.privacy 
        }));
        console.log(this.state.privacy);
    }


    componentDidMount() { //gets username, pass, pfp, and bio in database and display
        // let navigate = useNavigate()
        // useEffect(() => {Protect({navigate:null})}, [])

        console.log("In edit profile");
        console.log(this.props);
    //get req
        fetch(process.env.REACT_APP_BASE_API+"users.php/"+sessionStorage.getItem("userID"),{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(
            result => {
                if(result){
                    console.log(result);
                    this.setState({
                        email: result.email ||"",
                        username: result.username || "",
                        password: result.password|| "",
                        created_at: "",
                        bio: "",
                        profile_picture: "",
                        grass_count: "",
                        
                    })
                }
            }, 
            error => {
                this.setState({
                    err: true
            })
        }
        )
        
    
    };

    uploadImage = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        this.setState({
            profile_picture : URL.createObjectURL(file),
        })
        console.log("profile picture uploaded");
        alert("Profile picture has been updated!");


        // if(file){
        //     let formData = new FormData();
        //     formData.append('image', file);
        //     fetch(process.env.REACT_APP_BASE_API+"/file-uploads.php", {
        //         method : "post",
        //         headers: {
        //             'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        //           },
        //         body: formData

        //     })
        //     .then(res=>res.json())
        //     .then(res=>{
        //         this.setState({
        //             //profile_picture: URL.createObjectURL(file) 
        //         })
        //     })
        // }
        //patch method
        
        // this.setState({
        //     profile_picture: URL.createObjectURL(e.target.files[0])
        // })

    };

    clearImage = (e) => {
        e.preventDefault();
        //delete method
        this.setState({
            profile_picture: null,
        })
        console.log("profile pic removed");
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("save button clicked!");

        //test username and pass
        if (!username_pattern.test(this.state.username)){
            console.log("invalid username");
            alert("Username must contain 3-30 characters. No commas or spaces are allowed.");
            this.setState({
                username: "", //should clear the field if invalid
                err: true
            })
        } else if (!password_pattern.test(this.state.password)){
            console.log("invalid password");
            alert("Password must contain 8+ characters, including at least one letter and number");
            this.setState({
                password: "", //should clear the field if invalid
                err: true
            })
        } else if (username_pattern.test(this.state.username) && password_pattern.test(this.state.password)){//if it passes then fetch the data
            console.log("valid username, pass, and bio");
            alert("Username and password updated successfully!")
            this.setState({
                username: this.state.username,
                password: "", //suppossed to simulate the "sending"
                bio: this.state.bio
            })
            // fetch(process.env.REACT_APP_BASE_API+"/users.php/"+sessionStorage.getItem("userID"),{
            //     method: "PATCH", //isnt written yet so itll throw error
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer '+sessionStorage.getItem("token")
            //     },
            //     body: JSON.stringify({
            //         username: this.state.username,
            //         password: this.state.password,
            //         bio: this.state.bio
            //     })
            // }) 
            // .then(res=>res.json())
            // .then( 
            //     result => { //if successful, updates states with vals that were updated on server
            //         this.setState({
            //             username: result.username, 
            //             password: result.username, 
            //             bio: result.bio, 
            //         });
            //         return;
            //     }, 
            //     error => {
            //         alert("error!")
            //         console.log("lol it didnt work");
            //     }
            // )
            
        }

        


        

    };
       

    
   
    render(){   
        // if(!sessionStorage.getItem("sessionID")){ //if theres not a token in the session storage
        //     return(
        //         <div>
        //             <Navigate to= "/Login" replace={true} />
        //         </div>
        //     );
        // } else {
            return (
                <div>
                    <PreloginNavbar links={false}/>
                    <div class="flex">
                        
                            <div class="edit-profcontleft"> {/*starts left side */}
            
                                <form >
                                        {/* <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br> */}


                                        <span class="blue labels">Update Username:</span> <br></br><br></br>
                                        <input class="input-username" type="username-editprof" name="username" placeholder='Update username' style={{color: '#CA89FF'}} onChange={(e)=>this.fieldChangeHandler("username", e)} value={this.state.username} maxLength={30}></input> <br></br><br></br>
                                        <span class="blue labels">Update Password:</span> <br></br><br></br>
                                        <input class="input-password" type="password" name="password" placeholder='Update password' style={{color: '#CA89FF'}} onChange={(e)=>this.fieldChangeHandler("password",e)} value={this.state.password} maxLength={30}></input> <br></br><br></br>

                                        <span class="blue labels center">Profile Picture:</span> <br></br><br></br>
                                        
                                        <div class="flex-btn">
                                         <label for="file-upload" class="change-btn">
                                            <a>Change</a>
                                        </label>
                                        <input name="pic" onChange={this.uploadImage} id="file-upload" type='file' accept="image/*"></input> 
                                        
                                        <button onClick={this.clearImage} class="remove-btn" type="button">Remove</button>
                                        </div>

                                        <span class="blue labels center">Bio:</span> <br></br>

                                        <label for="bio-box"></label>
                                        <input maxlength={BIO_MAX} onChange={(e)=>this.fieldChangeHandler("bio", e)} value={this.state.bio} class="input-field pink" id="bio-box" type="text" name="bio" placeholder='Enter a short bio!'> 
                                        </input>

                                        {/* <p class="small white center">{"You have "+remaining+" chars remaining!"}</p>  */}

                                        <button class="save-btn"  onClick={this.handleSubmit} type="button">Save</button>
                                </form>
                    
                            </div>  {/*closes left side */}


                            <div class="edit-profcontright"> {/*opens right side*/}

                                            

                                    <div class="blue labels">Preview:</div> <br></br><br></br>
                                    <div><EditProfileSection clean={true} pic={this.state.profile_picture} bio={this.state.bio} username={this.state.username} /></div> 

                                    {/*https://www.youtube.com/watch?v=ONOg9JSV7iU*/}
                                    {/*https://www.youtube.com/watch?v=YZmax1g6bF4 */}
                                    
                                    <div className='button-wrapper'>
                                        <LogoutButton type="button"/>
                                        <DeleteAccountButton type="button" />
                                    </div>
                                   
                                    <Toggle toggle={this.state.toggle} handleToggleChange={this.handleToggleChange}/>

                                    
                            </div> {/*closes right side */}
        
            
                        {/* <img id="sqiggles2"  src={sqiggles}></img> */}
            
                    </div> 
                </div>
            );
        } 
    
    
     
    
            
    
    }; export default EditProfilePage;

    // return(
     
    //     <div class="two-columns">
    //         <PreloginNavbar links={false}/>
    //         <div>col1</div>
    //             <div id="preview">
    //                 <span class="blue labels">Preview:</span> <br></br><br></br>
    //                 <ProfileSection clean={true} pic={pfp} bio={bio==""?"Hello World :)":bio} username={username?username:"nooooo"} /> <br></br>
    //                 <br></br><br></br>
    //                 <Link to='/Logout'>
    //                     <button onClick={clear} class="button center red-btn" type="button">Logout</button>
    //                 </Link>
    //                 <Link to='/DeleteAccount'>
    //                     <button onClick={clear} class="button center" type="button">Delete</button>
    //                 </Link>
                    
    //             </div>
    //         <div>col2</div>
    //             <form ref={formRef}>
    //                     <span class="blue labels">Update Username:</span> <br></br><br></br>
    //                     <input class="input-field pink" type="text" name="name"></input> <br></br><br></br>
    //                     <span class="blue labels">Update Password:</span> <br></br><br></br>
    //                     <input class="input-field pink big" type="password" name="name"></input> <br></br><br></br>

    //                     <span class="blue labels center">Profile Picture:</span> <br></br><br></br>

    //                     <div class="flex-btn">

    //                     <label for="file-upload" class="button center">
    //                         <a>Change</a>
    //                     </label>
    //                     <input name="pic" ref={ref} onChange={handleUploadChange} id="file-upload" type='file'></input>
                            
    //                     <button onClick={clear} class="button center red-btn" type="button">Remove</button>
    //                     </div>
    //                     <br></br>
    //                     <br></br>

    //                     <span class="blue labels center">Bio:</span> <br></br>

    //                     <label for="bio-box"></label>
    //                     <textarea maxlength={BIO_MAX} onChange={updateBio} ref={bioRef} class="input-field pink" id="bio-box" type="text" name="bio" placeholder='Enter a short bio!'> 
    //                     </textarea>
    //                     <p class="small white center">{"You have "+remaining+" chars remaining!"}</p> 

                        
    //                     <button ref={submitRef} class="button center" id="set-btn" onClick={sendSet} type="button">Save</button>
    //             </form>
    //             </div>
            
        
    // )
