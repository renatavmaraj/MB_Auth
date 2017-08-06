import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {

  render() {
    const { pathname } = this.props.location

    return (
      <div className="app">
        <Header pathname={pathname} />
        {this.props.children}
      </div>
    );
  }
}

