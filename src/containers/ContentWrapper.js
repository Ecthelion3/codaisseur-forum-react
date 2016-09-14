import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class ContentWrapper extends Component {
  const { authenticated } = this.props
  console.log(authenticated)

  render() {
    return(
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  }
}

ContentWrapper.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, { })(ContentWrapper)
