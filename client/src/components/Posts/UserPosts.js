import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "../Users/UserProfile";
import PostList from "../Posts/PostList";
import { getSelectedFeedPosts, createPost } from "../../actions/postActions";
import { Modal } from "react-bootstrap";
import { storage } from "../../firebase";
import "./style.css";

class UserPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      caption: "",
      post_pic: null,
      postImgURL: "",
      longitude: "",
      latitude: "",
      feed_id: ""
    };
  }

  componentDidMount() {
    this.props.getSelectedFeedPosts(this.props.match.params.id);
  }
  handleShow = () => {
    this.setState({
      show: !this.state.show
    });
  };
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  handleFileChange = e => {
    let { caption, post_pic } = this.state;
    let { searchedUser, user } = this.props.auth;
    let { feed_id } = this.props;
    if (e.target.files[0]) {
      const post_pic = e.target.files[0];
      navigator.geolocation.getCurrentPosition(
        position => {
          let { latitude, longitude } = position.coords;
          this.setState({
            latitude: latitude,
            longitude: longitude,
            feed_id: this.props.match.params.id,
            caption,
            post_pic,
            postImgURL: URL.createObjectURL(post_pic)
          });
        },
        error => {
          this.props.displayError("Error dectecting your location");
          console.error(JSON.stringify(error));
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      this.setState({
        post_pic: null,
        postImgURL: ""
      });
    }
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlePostCreate = () => {
    // console.log(this.state);
    let { caption, post_pic, longitude, latitude } = this.state;
    let { searchedUser, user } = this.props.auth;
    let { feed_id } = this.props;
    const newPost = {
      caption,
      post_pic,
      feed_id: this.props.match.params.id,
      longitude,
      latitude
    };

    if (newPost.post_pic === null) {
      console.log("please use at least one input");
    } else if (newPost.caption !== "" && newPost.post_pic !== null) {
      const uploadTask = storage
        .ref(`post_imgs/${newPost.post_pic.name}`)
        .put(newPost.post_pic);
      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("IMAGE UPLOADED");
          //what happens whent the postIm has finished uploading
          storage
            .ref("post_imgs")
            .child(newPost.post_pic.name)
            .getDownloadURL()
            .then(url => {
              let postImgURL = url;
              // console.log(postImgUrl);

              // console.log(postImgUrl);
              newPost.post_pic = postImgURL;
              // console.log(newPost);
              console.log(newPost);
              this.props.createPost(newPost);
              console.log(this.state);

              this.setState({
                caption: "",
                post_pic: null,
                postImgUrl: "",
                postImgURL: "",
                show: false,
                longitude: "",
                latitude: ""
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      );
      // this.props.createPost(newPost)
      // this.setState({
      //   show: false,
      // })
    }
  };
  render() {
    let { posts } = this.props.post;
    // let {}
    let { show, postImgURL, caption } = this.state;

    // console.log(this.state.show);
    // let
    return (
      <div className="container">
        <UserProfile id={this.props.match.params.id} />
        <hr />
        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary" onClick={this.handleShow}>
              CreatePost
            </button>
          </div>
          {this.state.show ? (
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={this.state.postImgURL}
                  className="img-responsive card-img"
                  alt=""
                />
                <input
                  type="text"
                  name="caption"
                  value={this.state.caption}
                  placeholder="Post caption"
                  onChange={this.handleInputChange}
                />
                <input
                  type="file"
                  name="post_pic"
                  id="post_pic"
                  onChange={this.handleFileChange}
                />
                <button
                  className="btn btn-primary"
                  onClick={this.handlePostCreate}
                >
                  Handle Post Create
                </button>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          ) : null}
        </div>
        <PostList posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { getSelectedFeedPosts, createPost }
)(UserPosts);
