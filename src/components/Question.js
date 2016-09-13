import React, { Component, PropTypes } from 'react';

class Question extends Component {
  render () {
    const { question } = this.props

    return (
      <div>
        <h3>{question.title}</h3>
        <p>{question.body}</p>
      </div>
    )
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
}

export default Question
