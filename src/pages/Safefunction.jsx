import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import './Safefunction.css';


class Safefunction extends Component {
    render() {
        return (
            <div className='center'>
                <span>개인정보비식별화 대상을 선택하세요</span>
                <div className='icon'>
                <FontAwesomeIcon icon={faCameraRetro} size="lg" />
                <FontAwesomeIcon icon={faImage} size="lg" />
                </div>
            </div>
        );
    }
}

export default Safefunction;