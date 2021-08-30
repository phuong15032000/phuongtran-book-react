import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import bookService from "../services/book.service";
class Register extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImgThumpUrl = this.onChangeImgThumpUrl.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.state = {
            tempTags: [],
            categories: [],
            book: {
                id: null,
                title: null,
                author: null,
                image: null,
                description: null
            },
            user: AuthService.getCurrentUser(),
            successful: false,
            message: "",
            returnPost: null
        }
    }
    componentDidMount() {
        this.getBookById();
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
    handleCreate(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            bookService.editBook(
                this.state.book,
                this.state.book.id
            ).then(
                
                response => {
                    this.setState({
                        book: response.data,
                        message: "Edit book successful",
                        successful: true
                    });
                    this.props.history.push("/mybooks");
                    console.log(response.data)
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }
    onChangeAuthor(e) {
        this.state.book.author = e.target.value;
    }
    onChangeTitle(e) {
        this.state.book.title = e.target.value

    }
    onChangeDescription(e) {
        this.state.book.description = e.target.value
        console.log(this.state.book)
    }
    onChangeImgThumpUrl(e) {
        this.state.book.image = e.target.value
        console.log(this.state.book.image)
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    deleteBook(id) {
        bookService.deleteBook(id)
            .then(response => {
                console.log(response.data)
                this.props.history.push("/mybooks")
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div>
                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
                <link href="../css/post.css" rel="stylesheet" type="text/css" />
                <link href="../css/image.css" rel="stylesheet" type="text/css" />
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
                                <li><a href="/index"><i className="fa fa-home" />Homepage</a></li>
                                <li><a href="/mybooks" className="active"><i className="fa fa-sticky-note" />My books</a></li>
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
                                    <Form
                                        className="form"
                                        onSubmit={this.handleCreate}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        <fieldset>
                                            <legend className="text-center">Edit book<span className="req" />
                                            </legend>
                                            <div className="form-group">
                                                <label><span className="req" style={{color: "red"}}>* </span> Title: </label>
                                                <input
                                                    defaultValue={this.state.book.title}
                                                    id="id-input-title"
                                                    type="text"
                                                    className="form-control"
                                                    required="required"
                                                    onChange={this.onChangeTitle}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label><span className="req" style={{color: "red"}}>* </span> Author: </label>
                                                <input
                                                    defaultValue={this.state.book.author}
                                                    id="id-input-author"
                                                    type="text"
                                                    className="form-control"
                                                    required="required"
                                                    onChange={this.onChangeAuthor}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phonenumber"><span className="req" style={{color: "red"}}>* </span> Image thumpnail URL: </label>
                                                <input
                                                    defaultValue={this.state.book.image}
                                                    id="id-input-img"
                                                    required="required"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={this.onChangeImgThumpUrl}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phonenumber"> Description: </label>
                                                <textarea
                                                    style={{ minWidth: "100%", maxWidth: "100%" , minHeight: "150px"}}
                                                    defaultValue={this.state.book.description}
                                                    id="id-input-description"
                                                    className="form-control "
                                                    onChange={this.onChangeDescription}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button style={{ float: "right" }} className="btn btn-success" name="submit_reg">Edit</button>
                                            </div>
                                        </fieldset>
                                        {this.state.message && (
                                            <div className="form-group message-box">
                                                <div
                                                    className={
                                                        this.state.successful
                                                            ? "alert alert-success"
                                                            : "alert alert-danger"
                                                    }
                                                    role="alert"
                                                >
                                                    {this.state.message}
                                                </div>
                                            </div>
                                        )}
                                        <CheckButton
                                            style={{ display: "none" }}
                                            ref={c => {
                                                this.checkBtn = c;
                                            }}
                                        />
                                    </Form>
                                    <button onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteBook(this.state.book.id) }}>Delete this book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right section */}
                </div>
                <script lang="JavaScript">

                </script>
            </div>
        );

    }

}
export default withRouter(Register);