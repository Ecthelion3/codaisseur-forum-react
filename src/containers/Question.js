import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import $ from 'jquery'

import FlatButton from 'material-ui/FlatButton'
import headerStyle from '../styles/headers'

class Question extends Component {
  deleteQuestion() {
    const { questionId } = this.props.params
    console.log('id:', questionId)

    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:4000/questions/' + questionId + '.json',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'matthijs@test.com',
        'X-User-Token': 'qxsnKgehcWu2vekrta-c'
      },
      contentType: "application/json",
      dataType: "JSON",
    })
    .done(function(data) {
      console.log('successfully deleted',data);
      browserHistory.push('/questions')
    })
    .fail(function(error) {
      console.log(error);
    });
  }

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
        <div>
          <FlatButton linkbutton containerElement={<Link to={`/question/${id}/edit`} />} label="Edit" primary={false}/>
        </div>
        <div>
          <FlatButton linkbutton onClick={this.deleteQuestion.bind(this)} label="Delete" primary={false}/>
        </div>
        <div>
        </div>
        <h2 style={headerStyle}>{title}</h2>
        <i>{topic.title}</i>
        <p>{body}</p>
        <h3 style={headerStyle}>Answers</h3>
        {answers.map((answer, index) => {
          return (
            <p key={index}><small>{answer.body}</small></p>
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
