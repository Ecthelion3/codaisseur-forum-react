import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import $ from 'jquery'

import getQuestions from '../actions/get-questions'

class QuestionsWrapper extends Component {
  componentDidMount() {
    console.log(this.props)
    const { getQuestions } = this.props

    $.get({
      method: 'GET',
      url: 'http://localhost:4000/questions.json',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'matthijs@test.com',
        'X-User-Token': 'qxsnKgehcWu2vekrta-c'
      }
    }, function(data) {
      getQuestions({
        questions: data.questions
      })
    })
  }

  render() {
    return(
      this.props.children
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getQuestions: state.getQuestions,
  }
}

export default connect(mapStateToProps, { getQuestions })(QuestionsWrapper)
