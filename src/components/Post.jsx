import React, { useState } from "react";
import '../App.css';
import axios from "axios";
import { AiFillBook } from "react-icons/ai"
import { BiSolidDisc } from "react-icons/bi"

import placeholder from "../assets/placeholder.png";
import like from "../assets/heart.png"
import liked from "../assets/heart_clicked.png"
import comment from "../assets/comment.png"

function Post(props) {
    const [toggleState, setToggleState] = useState(1);
    const [expandComment, setExpandComment] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const maxCharLimit = 100; // Set your desired character limit

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const toggleCommentSection = () => {
        setExpandComment(!expandComment);

        // Fetch comments when the comment section is expanded
        if (!expandComment) {
            fetchComments();
        }
    }

    const handleCommentChange = (e) => {
        const text = e.target.value;

        // Check if the number of characters exceeds the limit
        if (text.length <= maxCharLimit) {
          setCommentText(text);
        }
    }

    const submitComment = () => {

        const url = process.env.REACT_APP_BASE_API + "/review-comment.php";

        // Get additional data from props
        const review_id = props.review_id;
        const commenter_id = sessionStorage.getItem("userID")

        // Create a FormData object to send multiple values
        const formData = new FormData();
        formData.append('review_id', review_id);
        formData.append('commenter_id', commenter_id);
        formData.append('comment', commentText);

        // Make an Axios POST request to your PHP endpoint
        fetch(url, {
                method: 'POST',
                body: formData,
            })
        .then(response => {
            // Handle success, if needed
            console.log(review_id);
            console.log(commenter_id);
            console.log(commentText);
            console.log("Comment submitted successfully:", response.data);
        })
        .catch(error => {
            // Handle error, if needed
            console.error("Error submitting comment:", error);
        });

        // Clear the comment input field
        setCommentText("");
    }

    const fetchComments = () => {
        // Fetch comments from the server
        const commentsUrl =
          process.env.REACT_APP_BASE_API + `/get-review-comments.php?review_id=${props.review_id}`;
    
        fetch(commentsUrl)
          .then((response) => response.json())
          .then((data) => {
            setComments(data.reverse());
          })
          .catch((error) => {
            console.error("Error fetching comments:", error);
          });
      };


    let username = props.username
    let media_name = props.media_name
    let creator = props.creator
    let media_rating = props.media_rating
    let media_review = props.media_review
    let media_type = props.media_type
    let media_img = props.media_img
    let dashLink = "/dashboard?id=" + props.user_id
    let icon = <AiFillBook />

    if (media_type === "Movie") {
        icon = <BiSolidDisc />
    }

    const tryRequire = (path) => {
        try {
            return require(`${path}`);
        } catch (err) {
            return null;
        }
    };

    media_img = tryRequire(media_img) ? media_img : placeholder

    return (
        <div className={`posts ${expandComment ? "expanded" : ""}`}>
            {media_img ? <img className="post_img" style={{ background: 'transparent' }} src={media_img} alt="an image of the listed media" align="left" /> :
                <img className="post_img" style={{ background: 'transparent' }} src={placeholder} alt="an image of the listed media" align="left" />}
            <div className="post_content" style={{ fontSize: '2vh' }}>
                <div className="post_creator"><a href={dashLink}>@{username}</a></div>
                <br></br>
                <div className="media_title">{icon}&nbsp;{media_name}</div>
                <br></br>
                <div className="media_author">{creator}</div>
                <br></br>
                <br></br>
                <div className="post_text">Rating: {media_rating}</div>
                <br></br>
                <div className="post_text">Review: {media_review}</div>
                <br></br>
                {expandComment &&
                <div>
                <textarea
                    className="input-field pink"
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Type your comment here..."
                    rows="4"
                    cols="50"
                    style={{backgroundColor: "var(--panel-bg)", height: "70px", width: "490px"}}
                />
                <div style={{ color: commentText.length == maxCharLimit ? "red" : "var(--blue)" }}>
                    {commentText.length}/{maxCharLimit} characters
                </div>
                <button onClick={submitComment} className="modalButtonStyle" style={{backgroundColor: "var(--blue)", color: "white", width:"100px", height:"35px", textAlign:"center", paddingTop: "6px", marginLeft: "420px", marginBottom: "5px"}}>Submit</button>
                {/* Display existing comments */}
                {comments.map((comment) => (
                    <div key={comment.comment_id} style={{marginBottom: "5px", width: "540px"}}>
                        <span style={{ color: 'var(--white)', fontSize: '20px' }}>
                            <strong>{comment.username}</strong>:
                        </span>
                        <span style={{ fontSize: '18px', wordWrap: 'break-word'}}>
                            {comment.comment}
                        </span>
                    </div>
                ))}
                </div>
                }
                <div className="post_info">
                    <img src={like} style={{ background: 'transparent', height: '10vh', width: 'auto', pointerEvents: 'none', cursor: '/src/assets/block.png'}} type={toggleState === 2 ? "hidden" : ""}
                        onClick={() => toggleTab(2)} alt="Like" title="feature under development"></img>
                    <img src={liked} style={{ background: 'transparent', height: '10vh', width: 'auto', pointerEvents: 'none', cursor: '/src/assets/block.png'}} type={toggleState === 1 ? "hidden" : ""}
                        onClick={() => toggleTab(1)} alt="Liked" title="feature under development"></img>
                    <img src={comment} style={{ background: 'transparent', height: '10vh', width: 'auto' }} onClick={toggleCommentSection} alt="Comment"></img>
                </div>
            </div>
        </div>
    )
}

export default Post;