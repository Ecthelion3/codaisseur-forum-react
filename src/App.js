import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import $ from 'jquery'
import getQuestions from './actions/get-questions'

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
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/questions">Questions</Link></li>
        </ul>
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    getQuestions: state.getQuestions,
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
  getQuestions: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getQuestions })(App)
