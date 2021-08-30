import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import BookDataService from '../services/book.service'
class Register extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImgThumpUrl = this.onChangeImgThumpUrl.bind(this);
        this.state = {
            tempTags: [],
            categories: [],
            book: {
                user: AuthService.getCurrentUser(),
                title: null,
                author: null,
                img_thump_url: null,
                description: null
            },
            successful: false,
            message: "",
            returnPost: null
        }
    }
    handleCreate(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            BookDataService.addBookAsAdmin(
                this.state.book
            ).then(
                response => {
                    this.setState({
                        message: "Add book successful",
                        successful: true
                    });
                    document.getElementById("id-input-title").value = "";
                    document.getElementById("id-input-author").value = "";
                    document.getElementById("id-input-img").value = "";
                    document.getElementById("id-input-description").value = "";
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
    }
    onChangeImgThumpUrl(e) {
        this.state.book.img_thump_url = e.target.value
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
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
                                <li><a href="/add-book"  className="active"><i className="fa fa-pencil" />Add book</a></li>
                                <li><a href="/mybooks"><i className="fa fa-sticky-note" />My books</a></li>
                                <li><a href="/books-management"><i className="fa fa-sticky-note" />Books</a></li>
                                <li><a href="/users-management"><i className="fa fa-sticky-note" />Users</a></li>
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
                                            <legend className="text-center">Add book<span className="req" />
                                            </legend>
                                            <div className="form-group">
                                                <label><span className="req">* </span> Title: </label>
                                                <input
                                                    id="id-input-title"
                                                    type="text"
                                                    className="form-control"
                                                    required="required"
                                                    onChange={this.onChangeTitle}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label><span className="req">* </span> Author: </label>
                                                <input
                                                    id="id-input-author"
                                                    type="text"
                                                    className="form-control"
                                                    required="required"
                                                    onChange={this.onChangeAuthor}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phonenumber"><span className="req">* </span> Image thumpnail URL: </label>
                                                <input
                                                    id="id-input-img"
                                                    required="required"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={this.onChangeImgThumpUrl}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phonenumber"><span className="req">* </span> Description: </label>
                                                <textarea
                                                    id="id-input-description"
                                                    className="form-control "
                                                    defaultValue={""}
                                                    required="required"
                                                    onChange={this.onChangeDescription}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button style={{ float: "right" }} className="btn btn-success" name="submit_reg">Submit</button>
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