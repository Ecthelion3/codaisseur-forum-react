import React, { Component } from 'react';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import headerStyle from '../styles/headers'

const styles = {
  header: {
    textAlign: 'center',
  }
}

class Header extends Component {
  render() {
    return (
      <div style={styles.header}>
        <h1 style={headerStyle}>Codaisseur Forum</h1>
        <RaisedButton linkbutton containerElement={<Link to="/" />} label="Home" primary={true}/>
        <RaisedButton linkbutton containerElement={<Link to="/questions" />} label="Questions" primary={true}/>
      </div>
    )
  }
}

export default Header
