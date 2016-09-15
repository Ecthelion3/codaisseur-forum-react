import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { push } from 'react-router-redux'
import $ from 'jquery'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import headerStyle from '../styles/headers'

import resetFormErrors from '../actions/reset-form-errors'

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

class NewQuestion extends Component {

  submitForm() {
    return this.saveQuestion()
  }

  saveQuestion() {
    this.props.resetFormErrors()

    const { title, body } = this.formValues()

    $.ajax({
      method: 'POST',
      url: 'http://localhost:4000/questions.json',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'matthijs@test.com',
        'X-User-Token': 'XitDbW6n2TSa2JxhmBQ4'
      },
      data: JSON.stringify({
        question: {
          title: title,
          body: body,
          topic_id: '1',
          user_id: '1'
        }
      })
    })
    .done(function(data) {
      console.log('successfully added',data);
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

  render() {
    const { formErrors } = this.props

    return(
      <Paper style={dialogStyle}>
        <h2 style={headerStyle}>New question</h2>
        <div>
          <TextField
            type="title"
            ref="title"
            hintText="Title"
            errorText={ formErrors.title }/>
        </div>
        <div>
          <TextField
            type="body"
            ref="body"
            hintText="Your question..."
            multiLine={true}/>
        </div>
        <div style={ errorMargin }>
          <FlatButton
            containerElement={<Link to="/questions" />}
            label="Cancel"/>
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this) }
            label='Save'
            primary={true} />
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    formErrors: state.formErrors,
  }
}

NewQuestion.propTypes = {
  currentUser: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { resetFormErrors })(NewQuestion)
