import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ReviewIndexItem extends Component {
  render() {
    return (
      <div>ReviewIndexItem</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewIndexItem)