import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from "../services/auth.service";
import BookDataService from '../services/book.service'
class Admin_browse extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            books: []
        };
    }
    componentDidMount() {
        this.retrievePosts();
    }
    retrievePosts() {
        BookDataService.getAllBook()
            .then(response => {
                this.setState({
                    books: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBook(id) {
        BookDataService.deleteBook(id)
            .then(response => {
                console.log(response.data)
                this.retrievePosts();
            })
            .catch(e => {
                console.log(e);
            });
    }
    toSqlDatetime = (inputDate) => {
        const date = new Date(inputDate)
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return inputDate
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
    enableBook(id) {
        BookDataService.enableBook(id).then(
            response => {
                console.log(response.data)
                this.retrievePosts();
            })
    }
    disableBook(id) {
        BookDataService.disableBook(id).then(
            response => {
                console.log(response.data)
                this.retrievePosts();
            })
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
                                <li><a href="/add-book"><i className="fa fa-pencil" />Add book</a></li>
                                <li><a href="/mybooks"><i className="fa fa-sticky-note" />My books</a></li>
                                <li><a href="/manage-book"  className="active"><i className="fa fa-pen-square"  />Book manager</a></li>
                                <li><a onClick={this.logout}><i className="fa fa-pencil-square-o" aria-hidden="true" />Log out</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Book</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Books management</h1>

                            <table style={{ width: "100%", tableLayout: "fixed" }} class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th>Created at</th>
                                        <th scope="col">Author</th>
                                        <th scope="col">Enabled</th>
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
                                                    ? <button style={{ width: "80px" }} onClick={() => this.disableBook(book.id)} className="btn btn-success">Enabled </button>
                                                    : <button style={{ width: "80px" }} onClick={() => this.enableBook(book.id)} className="btn btn-danger">Disabled</button>
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
                            <footer>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
                                </p>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-social">
                                    <a href="fb.com/trandiepphuong"><i className="fa fa-facebook" /></a>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                    <a href="#"><i className="fa fa-google-plus" /></a>
                                    <a href="#"><i className="fa fa-youtube" /></a>
                                    <a href="#"><i className="fa fa-linkedin" /></a>
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin_browse);