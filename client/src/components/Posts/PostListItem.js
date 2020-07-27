import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

class PostListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
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
  render() {
    let { post, auth } = this.props;
    return (
      <Fragment>
        <div className="col-md-4 col-6 col-lg-3 mb-1" onClick={this.handleShow}>
          <img src={post.post_pic} className="img-fluid" />
        </div>

        {this.state.show ? (
          <Modal
            className=".modal-90w"
            show={this.state.show}
            onHide={this.handleClose}
          >
            <Modal.Body>
              <div className="row">
                <div className="col-6">
                  <img
                    src={post.post_pic}
                    alt=""
                    srcset=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-6">comment section</div>
              </div>
            </Modal.Body>
          </Modal>
        ) : null}
      </Fragment>
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
