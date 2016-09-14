import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import $ from 'jquery'
import RaisedButton from 'material-ui/RaisedButton'
import headerStyle from './styles/headers'

import Header from './containers/Header'
import SignInOrUp from './containers/SignInOrUp'

import getQuestions from './actions/get-questions'

const styles = {
  message: {
    textAlign: 'center',
    marginTop: '3rem',
  }
}

class App extends Component {
  componentDidMount() {
    const { getQuestions } = this.props

    $.get("http://localhost:4000/questions.json", function(data) {
      getQuestions({
        questions: data.questions
      })
    })
  }

  render() {
    const { authenticated } = this.props
    
    return (
      <div>
        <Header/>
        { authenticated ? this.props.children : <SignInOrUp/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    questions: state.questions,
    getQuestions: state.getQuestions,
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  questions: PropTypes.array.isRequired,
  getQuestions: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getQuestions })(App)
