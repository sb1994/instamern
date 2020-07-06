import React, { Component } from "react";
import { connect } from "react-redux";

export class SocialPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    let { followers, following } = this.props;

    return (
      <div className="col-12">
        <div className="row">
          <div className="col-md-4 col-4">
            1 <span className="text-muted">Post</span>
          </div>
          <div className="col-md-4 col-4">
            {followers.length}
            <span className="text-muted">Followers</span>
          </div>
          <div className="col-md-4 col-4">
            {following.length}
            <span className="text-muted">Following</span>
          </div>
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
)(SocialPanel);
