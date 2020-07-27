import React, { Component } from "react";
import { connect } from "react-redux";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-12">
        <p>{this.props.auth.user._id}</p>
        <h1>CommentList</h1>
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
)(CommentList);
