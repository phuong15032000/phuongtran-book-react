import Button from 'react-bootstrap/Button'
import bookService from "../services/book.service";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from "../services/auth.service"
import Modal from "react-bootstrap/Modal";
class SingleBook extends Component {

  constructor(props) {
    super(props);
    this.getBookById = this.getBookById.bind(this);
    this.toSqlDatetime = this.toSqlDatetime.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      currentComment: {
        message: null,
        user: AuthService.getCurrentUser()
      },
      currenUser: AuthService.getCurrentUser(),
      book: {
        id: null,
        title: null,
        author: null,
        dsecription: null,
        image: null,
        createdAt: null,
        updatedAt: null,
        user: {
          id: null,
          email: null,
          firstName: null,
          lastName: null
        },
        commentList: []
      }
    };
    this.pageSizes = [3, 6, 9];
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  componentDidMount() {
    this.getBookById();
  }
  onChangeComment(e) {
    this.state.currentComment.message = e.target.value
    if (this.state.currentComment.message==="" || this.state.currentComment.message==null){
      document.getElementById("edit-btn").disabled=true
    }
    console.log(this.state.currentComment)
  }
  editComment(id) {
    bookService.editComment(id, this.state.currentComment)
      .then(response => {
        this.state.currentComment = {
          message: null,
          user: AuthService.getCurrentUser()
        };
        this.closeModal();
        this.getBookById();
        document.getElementById("textareacomment").value = null
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteComment(id) {
    bookService.deleteComment(id)
      .then(response => {
        this.state.currentComment = {
          message: null,
          user: AuthService.getCurrentUser()
        };
        this.getBookById();
        document.getElementById("textareacomment").value = null
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addComment() {
    bookService.addComment(this.state.currentComment, this.state.book.id)
      .then(response => {
        this.state.currentComment = {
          message: null,
          user: AuthService.getCurrentUser()
        };
        this.getBookById();
        document.getElementById("textareacomment").value = ""
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  getBookById() {
    bookService.getBookById(this.props.match.params.id)
      .then(response => {
        this.setState({
          book: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
      .toISOString()
      .slice(0, 16)
      .replace('T', ' ')
  }
  logout() {
    if (window.confirm("Do you want to logout?") == true) {
      AuthService.logout();
      this.props.history.push("/login");
    }
  }
  getCommentById(id) {
    bookService.getCommentById(id)
      .then(response => {
        this.setState({
          currentComment: response.data
        });
        console.log("current comment: " + this.state.currentComment.message);
      })
      .catch(e => {
        console.log(e);
      });
  }
  onClickEditComment(event,id) {
    this.state.isOpen = true
    this.getCommentById(id);
  }
  render() {
    return (
      <div>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
        <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
        <script src="https://use.fontawesome.com/967b9063cd.js"></script>
        <link href="../css/subcribe.css" rel="stylesheet" type="text/css" />
        <link href="../css/post.css" rel="stylesheet" type="text/css" />
        <link href="../css/image.css" rel="stylesheet" type="text/css" />
        <link href="../css/article.css" rel="stylesheet" type="text/css" />
        <link href="../css/single-blog.css" rel="stylesheet" type="text/css"></link>
        <div className="templatemo-logo visible-xs-block">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 black-bg logo-left-container">
            <h1 className="logo-left">Novahub</h1>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg logo-right-container">
            <h1 className="logo-right">Book</h1>
          </div>
        </div>
        <div className="templatemo-container">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 black-bg left-container">
            <h1 className="logo-left hidden-xs margin-bottom-60">Novahub</h1>
            <div className="tm-left-inner-container">
              <ul className="nav nav-stacked templatemo-nav">
                <li><a href="/index" className="active"><i className="fa fa-home" />Homepage</a></li>
                <li><a href="/mybooks"><i className="fa fa-sticky-note" />My books</a></li>
                <li><a href="javascript:void(0);" onClick={this.logout}><i className="fa fa-pencil-square-o" aria-hidden="true" />Log out</a></li>
              </ul>
            </div>
          </div>
          {/* left section */}
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
            <h1 className="logo-right hidden-xs margin-bottom-60">Book</h1>
            <div className="tm-right-inner-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="post-blog">
                    <div className="blog-content" style={{ marginBottom: "2%" }}>
                      <h3>{this.state.book.title}</h3>
                      <h5>By: <a href="#blog-author">{this.state.book.author}</a></h5>
                      <span>{this.toSqlDatetime(new Date(this.state.book.createdAt))}</span>
                    </div> {/* /.blog-content */}
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <img style={{ height: "100%", width: "100%", float: "left" }} src={this.state.book.image} alt="" />
                    </div> {/* /.blog-image */}
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                      <p className="col-sm-12 col-xs-12" style={{ fontSize: 22, textAlign: "justify" }}>{this.state.book.description}</p>
                    </div>
                  </div> {/* /.post-blog */}

                </div> {/* /.col-md-12 */}
              </div> {/* /.row */}
              <div className="row">
                <div className="col-md-12">
                  <div id="blog-comments" className="blog-post-comments">
                    <h3>{this.state.book.commentList.length} Comments</h3>
                    <div className="blog-comments-content">
                      {this.state.book.commentList.map((comment, index) => (
                        <div>
                          {comment.user.id !== this.state.currenUser.id
                            ?
                            <div className="media">
                              <div className="pull-left">
                                <img style={{ height: "60px", width: "60px", borderRadius: "50%" }} className="media-object" src="https://static.thenounproject.com/png/2366459-200.png" alt="" />
                              </div>
                              <div className="media-body">
                                <div className="media-heading">
                                  <h4>{comment.user.email}</h4>
                                  <span>{this.toSqlDatetime(new Date(comment.createdAt))}</span>
                                </div>
                                <p style={{ textAlign: "justify" }}>{comment.message}</p>
                              </div>
                            </div>
                            :
                            <div className="media">
                              <div className="pull-left">
                                <img style={{ height: "60px", width: "60px", borderRadius: "50%" }} className="media-object" src="https://static.thenounproject.com/png/2366459-200.png" alt="" />
                              </div>
                              <div className="media-body">
                                <div className="media-heading">
                                  <h4>{comment.user.email} <span> (you)</span></h4>
                                  <span>{this.toSqlDatetime(new Date(comment.createdAt))}</span>
                                  <br />
                                  <span><a href="javascript:void(0);" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteComment(comment.id) }} >Delete&nbsp;</a></span>
                                  <span><a onClick={(event) => { this.getCommentById(comment.id); this.openModal();}} href="javascript:void(0);">Edit</a></span>
                                  <Modal show={this.state.isOpen} onHide={this.closeModal} style={{ opacity: 1, marginLeft: "5%", paddingTop: "10%" }} >
                                    <Modal.Header>
                                      <Modal.Title>Edit comment 
                                      <a  href="javascript:void(0);" style={{float: "right"}} onClick={()=>this.closeModal()}>X</a></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <textarea style={{ minHeight: "120px", minWidth: "100%", maxWidth: "100%" }} name="comment" rows={5} defaultValue={this.state.currentComment.message} onChange={this.onChangeComment} />
                                    </Modal.Body>
                                    <Modal.Footer style={{paddingBottom: "8%", paddingTop: "-10%"}}>
                                      <button onClick={(event) => { this.editComment(comment.id); this.closeModal();}} className="btn btn-success" style={{width: "50px", marginRight: "2%"}} id="edit-btn">Edit</button>
                                    </Modal.Footer>
                                  </Modal>
                                </div>
                                <p style={{ textAlign: "justify" }}>{comment.message}</p>

                              </div>
                            </div>
                          }
                        </div>
                      ))}
                    </div> {/* /.blog-comments-content */}
                  </div> {/* /.blog-post-comments */}
                </div> {/* /.col-md-12 */}
              </div> {/* /.row */}
              <div className="row">
                <div className="col-md-12">
                  <div className="comment-form">
                    <h3>Leave a comment</h3>
                    <div className="widget-inner">
                      <div className="row">
                        <div className="col-md-12">
                          <p>
                            <label htmlFor="comment">Your comment:</label>
                            <textarea id="textareacomment" name="comment" rows={5} defaultValue={""} onChange={this.onChangeComment} />
                          </p>
                          <Button onClick={() => { this.addComment() }} style={{ color: "white" }} className="btn btn-light">Comment</Button>
                        </div>
                      </div>
                    </div> {/* /.widget-inner */}
                  </div> {/* /.widget-main */}

                </div> {/* /.col-md-12 */}
              </div> {/* /.row */}
              <footer>
                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
                  {/* Credit: www.templatemo.com */}
                </p>
                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-social">
                  <a href="#"><i className="fa fa-facebook" /></a>
                  <a href="#"><i className="fa fa-twitter" /></a>
                  <a href="#"><i className="fa fa-google-plus" /></a>
                  <a href="#"><i className="fa fa-youtube" /></a>
                  <a href="#"><i className="fa fa-linkedin" /></a>
                </p>
              </footer>
            </div>
          </div>
          {/* right section */}
        </div>
      </div >
    );
  }
}
export default withRouter(SingleBook);
