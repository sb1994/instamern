import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedFeedPosts } from "../../actions/postActions";
import ReactMapGL from "react-map-gl";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxpZzEyMyIsImEiOiJja2RscGVtcGwxMGs5MzNzOG52bWlwaWJ6In0.aE-scdy4yzBvt17Pm2tTdg"; // Set your mapbox token here

export class PostMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      viewpoint: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
      },
    };
  }

  componentDidMount() {
    this.props.getSelectedFeedPosts(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.post.posts.length !== this.props.post.posts.length) {
      this.setState({
        posts: this.props.post.posts,
      });
    }
    // console.log(this.props.post.posts);
  }
  // show;
  render() {
    console.log(this.state.posts.length);
    if (this.state.posts.length > 0) {
      // let {};
      return (
        <div className="container">
          <h1>PostMap</h1>
          <p>{this.state.posts[0].caption}</p>
          <ReactMapGL
            {...this.state.viewport}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={(viewport) => this.setState({ viewport })}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            Marker Points Her
          </ReactMapGL>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>PostMap No associated posts</h1>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { getSelectedFeedPosts })(PostMap);
