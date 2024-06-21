import React, { useEffect, useState } from "react";
import '../App.css';
import '../styles/feed.css';
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react"

import Protect from "./common/Protection.js"
import FeedNavbar from "./common/FeedNavbar.jsx"



import Tabs from './Tabs.jsx';
import Post from './Post.jsx'
import axios from "axios"

export default function Feed(props){
    
    let navigate = useNavigate()
    
    let [posts, setPosts] = useState([])

    useEffect(() => {
        Protect({navigate:navigate})
        const url = process.env.REACT_APP_BASE_API+ "/get-media.php"
            
        const headers = {
            // "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': '*'
            'Authorization': `Bearer ${sessionStorage.getItem('sessionID')}`
        }
    
        axios.get(url, headers)
        .then((response) => {
            console.log(response.data)
            if (response.status >= 200 && response.status <= 300){

                setPosts(response.data.reverse());
                console.log(posts)

                // let data =response.data
                // let username = data.username
                // let media_name = data.media_name
                // let creator = data.creator
                // let media_type = data.media_type
                // let media_review = data.media_review
                // let media_rating = data.media_rating


                // setUsername(username)
                // setMediaName(media_name)
                // setCreator(creator)
                // setMediaType(media_type)
                // setMediaReview(media_review)
                // setMediaRating(media_rating)


            }
            
        })
        .catch(function (error) {
            console.log(error)
        })
    },[])

    
    return(
            <div class="fixed">
                <script src="fb_tab.js"></script>
                <FeedNavbar/>

                <div class="feedpage">
                    <Tabs/>
                    <div class="feed">
                        <div class="feed_container">
                            <div class="feed_contents">
                                {posts.map(post =>
                                    <Post user_id = {post.user_id} username = {post.username} media_name = {post.media_name} creator = {post.creator} media_rating = {post.media_rating} media_review = {post.media_review} media_type = {post.media_type} media_img = {post.media_img} post_id = {post.post_id} review_id = {post.post_id}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}