import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from '../services/auth.service'
import BookDataService from '../services/book.service'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import 'react-notifications/lib/notifications.css';
class Mybooks extends Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.logout = this.logout.bind(this);
        this.onChangeKeyword = this.onChangeKeyword.bind(this);
        this.onChangeOrderBy = this.onChangeOrderBy.bind(this);
        this.logout = this.logout.bind(this);
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImgThumpUrl = this.onChangeImgThumpUrl.bind(this);
        this.checkNull = this.checkNull.bind(this);
        this.state = {
            isOpen: false,
            showHide: false,
            currenUser: AuthService.getCurrentUser(),
            books: [],
            page: 1,
            count: 0,
            pageSize: 3,
            keyword: "",
            orderBy: "",
            book: {
                user: AuthService.getCurrentUser(),
                title: null,
                author: null,
                image: null,
                description: null
            },
            returnPost: null
        };
        this.pageSizes = [3, 6, 9];
    }
    checkNull() {
        if (this.state.book.title === "" || this.state.book.title == null) {
            console.log("title null")
            document.getElementById("id-input-title").style.borderColor = "red"
            document.getElementById("status-title").innerHTML = `<span style="color:red;">Title can't be empty.</span>`;
        }
        if (this.state.book.title !== "" && this.state.book.title != null) {
            document.getElementById("id-input-title").style.borderColor = "";
            document.getElementById("status-title").innerHTML = ``;
        }
        if (this.state.book.author === "" || this.state.book.author == null) {
            console.log("author null")
            document.getElementById("id-input-author").style.borderColor = "red"
            document.getElementById("status-author").innerHTML = `<span style="color:red;">Author can't be empty.</span>`;
        }
        if (this.state.book.author !== "" && this.state.book.author != null) {
            document.getElementById("id-input-author").style.borderColor = ""
            document.getElementById("status-author").innerHTML = ``;
        }
        if (this.state.book.image === "" || this.state.book.image == null) {
            document.getElementById("id-input-img").style.borderColor = "red"
            document.getElementById("status-image").innerHTML = `<span style="color:red;">Image URL can't be empty.</span>`;
        }
        if (this.state.book.image !== "" && this.state.book.image != null) {
            document.getElementById("id-input-img").style.borderColor = ""
            document.getElementById("status-image").innerHTML = ``;
        }
        if (this.state.book.description === "" || this.state.book.description == null) {
            document.getElementById("id-input-description").style.borderColor = "red"
            document.getElementById("status-description").innerHTML = `<span style="color:red;">Description can't be empty.</span>`;
        }
        if (this.state.book.description !== "" && this.state.book.description != null) {
            document.getElementById("id-input-description").style.borderColor = ""
            document.getElementById("status-description").innerHTML = ``;
        }
        if (this.state.book.title !== "" && this.state.book.author !== "" && this.state.book.image !== "" && this.state.book.description !== ""
            && this.state.book.title !== null && this.state.book.author !== null && this.state.book.image !== null && this.state.book.description !== null
        ) {
            this.handleCreate();
        }
    }
    isURL(str) {
        var a = document.createElement('a');
        a.href = str;
        return (a.host && a.host != window.location.host);
    }
    handleCreate() {
        BookDataService.addBook(
            this.state.book
        ).then(

            this.createNotification("success"),
            this.retrieveBooks(),
            this.closeModal(),
            response => {
                this.retrieveBooks();
                this.state.book = {
                    user: AuthService.getCurrentUser(),
                    title: null,
                    author: null,
                    image: null,
                    description: null
                };
                console.log(response.data)
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            }
        );
    }
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Add book successfully', 'Success', 1500);
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 1500);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 1500, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
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
        if (this.isURL(e.target.value)) {
            document.getElementById("id-input-img").style.borderColor = ""
            document.getElementById("status-image").innerHTML = ``;
            this.state.book.image = e.target.value
        }
        else {
            document.getElementById("id-input-img").style.borderColor = "red"
            document.getElementById("status-image").innerHTML = `<span style="color:red;">It must be a URL.</span>`;
            this.state.book.image = null
        }
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal= () => this.setState({ isOpen: false });
    onChangeOrderBy(e) {
        this.setState(
            {
                orderBy: e.target.value
            },
            () => {
                this.retrieveBooks();
            }
        );
    }
    onChangeKeyword(e) {
        this.setState(
            {
                keyword: e.target.value
            },
            () => {
                this.retrieveBooks();
            }
        );
    }
    componentDidMount() {
        this.retrieveBooks();
    }
    retrieveBooks() {
        // const { page, pageSize, keyword, orderBy } = this.state;
        // const params = this.getRequestParams(page, pageSize, keyword, orderBy);
        // console.log(params)
        BookDataService.getBookByUser(this.state.currenUser.id)
            .then(response => {
                // const { books, totalPages } = response.data;
                this.setState({
                    books: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    getRequestParams(page, pageSize, keyword, orderBy) {
        let params = {};

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        if (keyword) {
            params["keyword"] = keyword;
        } else {
            params["keyword"] = "";
        }

        if (orderBy) {
            params["orderBy"] = orderBy;
        } else {
            params["orderBy"] = "";
        }

        return params;
    }
    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveBooks();
            }
        );
    }
    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveBooks();
            }
        );
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    toSqlDatetime = (inputDate) => {
        const date = new Date(inputDate)
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return dateWithOffest
            .toISOString()
            .slice(0, 16)
            .replace('T', ' ')
    }
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }
    deleteBook(id) {
        BookDataService.deleteBook(id)
            .then(response => {
                console.log(response.data)
                this.retrieveBooks();
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
                            <div>
                                <h1 className="templatemo-header">My books</h1></div>
                            <Button style={{ marginBottom: "10px" }} variant="primary" onClick={this.openModal}>
                                Add a new book
                            </Button>
                            <Modal show={this.state.isOpen} onHide={this.closeModal} style={{ opacity: 1, marginLeft: "5%", paddingTop: "10%", height: "800px" }} >
                                <Modal.Body>
                                    <fieldset>
                                        <legend className="text-center" >Add book<span className="req" />
                                        </legend>
                                        <div className="form-group">
                                            <label><span className="req" style={{ color: "red" }}>* </span> Title: </label>
                                            <input
                                                id="id-input-title"
                                                type="text"
                                                className="form-control"
                                                onChange={this.onChangeTitle}
                                            />
                                            <div id="status-title" />
                                        </div>
                                        <div className="form-group">
                                            <label><span className="req" style={{ color: "red" }}>* </span> Author: </label>
                                            <input
                                                id="id-input-author"
                                                type="text"
                                                className="form-control"
                                                onChange={this.onChangeAuthor}
                                            />
                                            <div id="status-author" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phonenumber"><span className="req" style={{ color: "red" }}>* </span> Image thumpnail URL: </label>
                                            <input
                                                id="id-input-img"
                                                type="text"
                                                className="form-control"
                                                onChange={this.onChangeImgThumpUrl}
                                            />
                                            <div id="status-image" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phonenumber"><span className="req" style={{ color: "red" }}>* </span> Description: </label>
                                            <textarea
                                                id="id-input-description"
                                                className="form-control "
                                                defaultValue={""}
                                                onChange={this.onChangeDescription}
                                            />
                                            <div id="status-description" />
                                        </div>

                                    </fieldset>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button onClick={this.checkNull} className="btn btn-success" style={{ float: "right" }}>Add book</button>
                                    <Button className="form-group" variant="secondary" onClick={this.closeModal}>
                                        Close
                                    </Button>&nbsp;
                                </Modal.Footer>

                            </Modal>
                            <div>
                                {this.state.books.length == 0
                                    ? <div className="row">
                                        <h2>You don't have any book!</h2>
                                    </div>
                                    :
                                    // <div>{this.state.books.map((book, index) => (
                                    //     <div className="row">
                                    //         <article className="post">
                                    //             <header>
                                    //                 <a style={{ margin: "10px 10px 10px 10px" }} href={"/edit-book/" + book.id}><img style={{ height: "175px", width: "130px", margin: "10% 10% 10% 10%" }} src={book.image} alt="" /></a>
                                    //                 <div className="title" style={{ float: "left", margin: "2% 5% 2% 2%" }}>
                                    //                     <h2><a className="a-title" href={"/edit-book/" + book.id}>{book.title}</a></h2>
                                    //                     <h2><small>By: <a className="a-title" href={"/author/" + book.author}>{book.author}</a></small></h2>
                                    //                     <p className="fifty-chars" style={{ fontSize: "16px", fontFamily: "Georgia" }}>{book.description}</p>
                                    //                 </div>
                                    //             </header>
                                    //         </article>
                                    //     </div>
                                    // ))}
                                    // </div>
                                    <table style={{ width: "100%", tableLayout: "fixed" }} class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th>Created at</th>
                                                <th scope="col">Author</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.books.map((book, index) => (
                                                <tr>
                                                    <th scope="row"><a href={"/edit-book/" + book.id}>{book.title}</a></th>
                                                    <td>{this.toSqlDatetime(new Date(book.createdAt))}</td>
                                                    <td>{book.author}</td>
                                                    <td>
                                                        {book.enabled
                                                            ? <p style={{ color: "green" }}>Enabled</p>
                                                            : <p style={{ color: "red" }}>Disabled</p>
                                                        }
                                                    </td>
                                                    <th>
                                                        <a href={"/edit-book/" + book.id} class="btn btn-primary">Edit</a>
                                                        &nbsp;
                                                        <button class="btn btn-primary" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this book?')) this.deleteBook(book.id) }}>Delete</button>
                                                    </th>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                            <footer>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
                                    {/* Credit: www.templatemo.com */}
                                </p>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-social">
                                    <a href="//facebook.com/trandiepphuong"><i className="fa fa-facebook" /></a>
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

                <NotificationContainer />
            </div >
        );
    }
}
export default withRouter(Mybooks);