import React, { Component } from "react";
import { connect } from "react-redux";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      post_img: null,
      postImgURL: "",
      longitude: "",
      latitude: "",
      feed_id: ""
    };
  }

  handlePostCreate = () => {
    console.log(this.props.auth.searchedUser);
    console.log(this.state);

    let { text, post_img } = this.state;
    let { searchedUser, user } = this.props.auth;
    let { feed_id } = this.props;
    navigator.geolocation.getCurrentPosition(
      position => {
        let { latitude, longitude } = position.coords;
        this.setState({
          latitude: latitude,
          longitude: longitude,
          feed_id: feed_id,
          text
        });
      },
      error => {
        this.props.displayError("Error dectecting your location");
        console.error(JSON.stringify(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // let createPostData = {
    //   text: this.state.text,
    //   location: {}
    // };
    // console.log(this.state);
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    // console.log(this.state)

    return (
      <div>
        <h1>POst Form</h1>
        <input
          type="text"
          name="text"
          value={this.state.text}
          placeholder="Post text"
          onChange={this.handleInputChange}
        />
        <button className="btn btn-primary" onClick={this.handlePostCreate}>
          Handle Post Create
        </button>
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
)(PostForm);
