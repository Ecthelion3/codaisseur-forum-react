import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import headerStyle from '../styles/headers'

class Question extends Component {
  render () {
    const { questions } = this.props

    function checkId(question){
      return question.id == questionId
    }
    const { questionId } = this.props.params
    const question = questions.find(checkId)
    const { title, body, answers } = question

    return (
      <div>
        <h2 style={headerStyle}>{title}</h2>
        <p>{body}</p>
        <h3>Answers</h3>
        {answers.map((answer, index) => {
          return (
            <p><small>{answer.body}</small></p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  }
}

Question.propTypes = {
  questions: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, {})(Question)
