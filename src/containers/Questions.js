import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import $ from 'jquery'

import getQuestions from '../actions/get-questions'

import headerStyle from '../styles/headers'

class Questions extends Component {
  componentDidMount() {
    const { getQuestions } = this.props

    $.get("http://localhost:4000/questions.json", function(data) {
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
        <h2 style={headerStyle}>Questions</h1>
        { questions.map(this.renderQuestion.bind(this)) }
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

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
  getQuestions: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getQuestions })(Questions)
