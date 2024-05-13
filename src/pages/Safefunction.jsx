import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import './Safefunction.css';


class Safefunction extends Component {
    render() {
        return (
            <div className='footer'>
                <span>개인정보비식별화 대상을 선택하세요</span>
                <div className='icon'>
                <span className='margin'><FontAwesomeIcon icon={faCameraRetro} size="2xl" /></span>
                <span><FontAwesomeIcon icon={faImage} size="2xl" /></span>
                </div>
            </div>
        );
    }
}

export default Safefunction;