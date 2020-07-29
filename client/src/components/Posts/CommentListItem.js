import React, { Component } from "react";
import { connect } from "react-redux";

class CommentListItem extends Component {
  render() {
    let { comment } = this.props;
    return (
      <div className="card mb-3">
        <div class="card-body">
          <p>{comment._id}</p>
          <p>{comment.comment}</p>
          <p>{comment.user.name}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListItem);
