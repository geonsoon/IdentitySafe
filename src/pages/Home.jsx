import React, { Component } from 'react';
import ActionAreaCard from './ActionAreaCard';
import FooterAreaCard from './FooterAreaCard';

class Home extends Component {
    render() {
        return (
            <div>
                <ActionAreaCard />
                <FooterAreaCard />
            </div>
        );
    }
}

export default Home;