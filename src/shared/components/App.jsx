import React from 'react';
import { Link } from 'react-router';


export default class App extends React.Component {
  render() {

      return (
          <div id="app-view">
            <h1><Link to="/">Todos</Link></h1>
            <Link to="home">Home</Link> | <Link to="about">About</Link>
            <hr/>
            { this.props.children }
          </div>
      );
  }
}
