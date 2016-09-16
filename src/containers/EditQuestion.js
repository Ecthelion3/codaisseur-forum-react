import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { push } from 'react-router-redux'
import $ from 'jquery'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import headerStyle from '../styles/headers'

import resetFormErrors from '../actions/reset-form-errors'
import getTopics from '../actions/get-topics'
import chooseTopic from '../actions/choose-topic'

const errorMargin = {
  marginTop: '2rem'
}

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class EditQuestion extends Component {
  componentDidMount() {
    const { getTopics, chooseTopic, questions } = this.props
    const { questionId } = this.props.params
    function checkId(question){ return question.id == questionId }
    const question = questions.find(checkId)
    const topicId = question.topic.id

    $.get({
      method: 'GET',
      url: 'http://localhost:4000/topics.json',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'matthijs@test.com',
        'X-User-Token': 'XitDbW6n2TSa2JxhmBQ4'
      }
    }, function(data) {
      getTopics({
        topics: data.topics
      })
    })

    chooseTopic(topicId)
  }

  submitForm(id) {
    return this.saveQuestion(id)
  }

  saveQuestion(id) {
    this.props.resetFormErrors()

    const { title, body } = this.formValues()
    const { currentTopic } = this.props
    console.log('id:', id)

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:4000/questions/' + id + '.json',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'matthijs@test.com',
        'X-User-Token': 'XitDbW6n2TSa2JxhmBQ4'
      },
      contentType: "application/json",
      dataType: "JSON",
      data: JSON.stringify({
        question: {
          id: id,
          title: title,
          body: body,
          topic_id: currentTopic,
          user_id: 1
        }
      })
    })
    .done(function(data) {
      console.log('successfully changed',data);
      browserHistory.push('/questions')
    })
    .fail(function(error) {
      console.log(error);
    });
  }

  formValues() {
    const { title, body } = this.refs
    return {
      title: title.getValue(),
      body: body.getValue(),
    }
  }

  handleChange(event, index, value) {
    const { chooseTopic } = this.props
    chooseTopic(value)
  }

  renderTopic(topic) {
    const { id, title } = topic
    return (
      <MenuItem key={id} value={id} primaryText={title} />
    )
  }

  render() {
    const { formErrors, topics, currentTopic, questions } = this.props
    const { questionId } = this.props.params
    function checkId(question){ return question.id == questionId }
    const question = questions.find(checkId)
    const { id, title, body } = question

    return(
      <Paper style={dialogStyle}>
        <h2 style={headerStyle}>Edit question</h2>
        <div>
          <TextField
            type="title"
            ref="title"
            hintText="Title"
            defaultValue={title}
            errorText={ formErrors.title }/>
          <SelectField value={currentTopic} onChange={this.handleChange.bind(this)}>
            { topics.map(this.renderTopic.bind(this)) }
          </SelectField>
        </div>
        <div>
          <TextField
            type="body"
            ref="body"
            hintText="Your question..."
            defaultValue={body}
            multiLine={true}/>
        </div>
        <div style={ errorMargin }>
          <FlatButton
            containerElement={<Link to="/questions" />}
            label="Cancel"/>
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this, id) }
            label='Save'
            primary={true} />
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseTopic: state.chooseTopic,
    currentTopic: state.currentTopic,
    currentUser: state.currentUser,
    formErrors: state.formErrors,
    getTopics: state.getTopics,
    questions: state.questions,
    topics: state.topics,
  }
}

EditQuestion.propTypes = {
  chooseTopic: PropTypes.func.isRequired,
  currentTopic: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  getTopics: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  resetFormErrors: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { chooseTopic, getTopics, resetFormErrors })(EditQuestion)
