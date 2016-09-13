import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Questions from './containers/Questions'

class App extends Component {
  render() {
    return (
      <div>
        <Questions/>
      </div>
    )
  }
}

export default App
