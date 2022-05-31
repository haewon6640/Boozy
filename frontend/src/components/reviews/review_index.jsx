import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewIndexItem from "../reviews/review_index_item";

export class ReviewIndex extends Component {
  render() {
    return (
      <div>ReviewIndex
        <ReviewIndexItem/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewIndex)