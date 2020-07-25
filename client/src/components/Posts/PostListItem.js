import React, { Component } from "react";
import { connect } from "react-redux";

class PostListItem extends Component {
  render() {
    let { post, auth } = this.props;
    return (
      <div className="col-md-4 col-6 col-lg-3 mb-1">
        <h2>{post.user.name}</h2>
        <p>{post.caption}</p>
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
)(PostListItem);
