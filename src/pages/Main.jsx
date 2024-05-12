import React, { Component } from 'react';
import Logo from '../image/identitysafe.jpeg';

class Main extends Component {
    render() {
        return (
            <div>
                <img src={Logo} alt="Logo" width={100} height={100}/>
            </div>
        );
    }
}

export default Main;