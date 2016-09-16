import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import FlatButton from 'material-ui/FlatButton'

import headerStyle from '../styles/headers'

class Question extends Component {
  render () {
    const { questions } = this.props
    function checkId(question){
      return question.id == questionId
    }
    const { questionId } = this.props.params
    const question = questions.find(checkId)
    const { id, title, topic, body, answers } = question

    return (
      <div>
        <FlatButton linkbutton containerElement={<Link to={`/question/${id}/edit`} />} label="Edit" primary={false}/>
        <h2 style={headerStyle}>{title}</h2>
        <i>{topic.title}</i>
        <p>{body}</p>
        <h3 style={headerStyle}>Answers</h3>
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
