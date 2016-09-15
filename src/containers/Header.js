import React, { Component } from 'react';
import { Link } from 'react-router'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Codaisseur Forum" style={headerStyle}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton linkbutton containerElement={<Link to="/" />} label="Home" primary={true}/>
          <RaisedButton linkbutton containerElement={<Link to="/questions" />} label="Questions" primary={true}/>
          <RaisedButton linkbutton containerElement={<Link to="/question/new" />} label="New" primary={false}/>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default Header
