import React from "react";
import "../../App.css";

const Toggle = ({ toggle, handleToggleChange }) => {
    return (
        <div className="toggle-container" onClick={handleToggleChange}>
            <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
                {toggle ? "Private" : "Public"}
            </div>
        </div>

    );
}; export default Toggle;