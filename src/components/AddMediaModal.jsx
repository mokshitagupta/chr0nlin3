import React, { useState } from "react";
import { ColorPicker, ConfigProvider, Modal } from 'antd';
import '../App.css';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

import Protect from "./common/Protection.js"

import RatingStars from "../assets/RatingStars.png";
import SearchNavbar from "./SearchNavbar";

export default function AddMedia(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    let navigate = useNavigate()
    useEffect(() => {Protect({navigate:navigate})}, [])
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <div class="fixed">
            <SearchNavbar hide="true"/>
            <div>
                <button class="button" onClick={showModal} style={{marginTop: '100px'}}>
                    Add Content
                </button>
                <ConfigProvider theme={{components: {Modal: {contentBg:"#290024", headerBg:"#290024", titleColor:"white", titleFontSize:"large"}}}}>
                    <Modal title="Add Content..." open={isModalOpen} okButtonProps={{style:{class:"primary", backgroundColor:"transparent", color:"white"}}} cancelButtonProps={{style:{class:"primary", backgroundColor:"transparent", color:"white"}}} onOk={handleOk} onCancel={handleCancel} width={800} bodyStyle={{backgroundColor:"#290024"}}>
                        <span class="blue labels">Content Type:</span>
                        <input class="input-field pink" type="text" name="name" style={{width:"710px"}}></input> <br></br><br></br>
                        <span class="blue labels">Content Title:</span>
                        <input class="input-field pink" type="text" name="name" style={{width:"710px"}}></input> <br></br><br></br>
                        <span class="blue labels">Review:</span>
                        <input class="input-field pink" type="text" name="name" style={{width:"710px", height:"120px"}}></input> <br></br><br></br>
                        <span class="blue labels" style={{paddingRight:"20px"}}>Rating 0-5:</span>
                        <input class="input-field pink" type="number" name="name" style={{paddingLeft:"20px", width:"100px"}}></input> <br></br><br></br>
                    </Modal>
                </ConfigProvider>
            </div>
        </div>
    )
}
