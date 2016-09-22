import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import headerStyle from '../styles/headers'

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
        <h2 style={headerStyle}>Questions</h2>
        { questions.map(this.renderQuestion.bind(this)) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    questions: state.questions,
  }
}

Questions.propTypes = {
  currentUser: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { })(Questions)
