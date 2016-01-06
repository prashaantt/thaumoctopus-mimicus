import React from 'react';
import { Link } from 'react-router';


export default class About extends React.Component {
    render() {

        return (
            <div>
                <h2>About</h2>
                <Link to="home">Home</Link>
            </div>
        );
    }
}
