import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import $ from 'jquery'
import Question from '../components/Question'
import getQuestions from '../actions/get-questions'

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
    return(
      <Question key={question.id} question={question}/>
    )
  }

  render () {
    const { questions } = this.props

    return (
      <div>
        <h2>Questions</h2>
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
