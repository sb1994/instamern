import React, { Component } from "react";
import { connect } from "react-redux";
import CommentListItem from "./CommentListItem";
class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.comments === undefined || this.props.comments.length <= 0) {
      return (
        <div className="col-12">
          <p>comments Dont exist</p>
        </div>
      );
    } else {
      let renderComments = this.props.comments.map(comment => {
        return <CommentListItem comment={comment} key={comment._id} />;
      });
      return <div className="col-12">{renderComments}</div>;
    }
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
