import React from "react";
import '../App.css';

import "../styles/pages/error404.css";

import PostLoginNavbar from "./common/PostLoginNavbar";
import error404pic from "../assets/error404pic.png";
import { useNavigate } from "react-router-dom";

export default function Error404() {
    const navigate = useNavigate();

    return (
        <div className="will-fixed">
            <PostLoginNavbar hide="true" />
=
            <div className="will-error404-message-container">
                <img id="error404" src={error404pic} className="will-error404-img"></img>
                <p className="will-error404-message" >Error 404: Page Not Found</p>
                <p className="will-error404-message" >Uh oh, looks like we aren't able to access that!</p>
                <a href="/dashboard"><button className="will-dashboard-btn" type="submit">Dashboard</button></a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQd"><button className="will-dashboard-btn" type="submit">Something Fun</button></a>
            </div>

        </div>
    );
}
