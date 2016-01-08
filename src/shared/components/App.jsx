import React from 'react';
import { Link } from 'react-router';


export default class App extends React.Component {
  render() {

      return (
          <div id="app-view">
            <h1><Link to="/">Isomorphic examples</Link></h1>
            <Link to="todos">Todos</Link> | <Link to="counter">Counter</Link>
            <hr/>
            { this.props.children }
          </div>
      );
  }
}
