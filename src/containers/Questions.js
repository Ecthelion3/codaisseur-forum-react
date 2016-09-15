import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import $ from 'jquery'

import getQuestions from '../actions/get-questions'

import headerStyle from '../styles/headers'

class Questions extends Component {
  componentDidMount() {
    const { getQuestions } = this.props

    $.get({
      method: 'GET',
      url: 'http://localhost:4000/questions.json',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'matthijs@test.com',
        'X-User-Token': 'XitDbW6n2TSa2JxhmBQ4'
      }
    }, function(data) {
      getQuestions({
        questions: data.questions
      })
    })
  }

  renderQuestion(question) {
    const { id, title } = question
    return(
      <p key={id}>
        <Link to={`/question/${question.id}`}>{title}</Link>
      </p>
    )
  }

  render () {
    const { questions } = this.props

    return (
      <div>
        <h2 style={headerStyle}>Questions</h2>
        { questions.map(this.renderQuestion.bind(this)) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    getQuestions: state.getQuestions,
    questions: state.questions,
  }
}

Questions.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { getQuestions })(Questions)
