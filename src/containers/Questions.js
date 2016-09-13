import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Questions extends Component {
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
        <h1>Questions</h1>
        { questions.map(this.renderQuestion.bind(this)) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  }
}

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { })(Questions)
