import React, { Component } from "react";
import { connect } from "react-redux";

class PostListItem extends Component {
  render() {
    let { post, auth } = this.props;
    return (
      <div className="col-md-4 col-6 col-lg-3 mb-1">
        <img src={post.post_pic} alt="" srcset="" className="img-fluid" />
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
