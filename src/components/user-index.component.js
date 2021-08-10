import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from '../services/auth.service'
import BookDataService from '../services/book.service'
import { Pagination } from '@material-ui/lab';
class Index extends Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.logout = this.logout.bind(this);
        this.onChangeKeyword = this.onChangeKeyword.bind(this);
        this.onChangeOrderBy = this.onChangeOrderBy.bind(this);
        this.state = {
            books: [],
            page: 1,
            count: 0,
            pageSize: 3,
            keyword: "",
            orderBy: ""
        };
        this.pageSizes = [3, 6, 9];
    }
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
        const { page, pageSize, keyword, orderBy } = this.state;
        const params = this.getRequestParams(page, pageSize, keyword, orderBy);
        console.log(params)
        BookDataService.getEnableBooks(params)
            .then(response => {
                const { books, totalPages } = response.data;
                this.setState({
                    books: books,
                    count: totalPages
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
                                <li><a href="/index" className="active"><i className="fa fa-home" />Homepage</a></li>
                                <li><a href="/add-book"><i className="fa fa-pencil" />Add book</a></li>
                                <li><a href="/mybooks"><i className="fa fa-sticky-note" />My books</a></li>
                                <li><a onClick={this.logout}><i className="fa fa-pencil-square-o" aria-hidden="true" />Log out</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Book</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Welcome to Novahub Books</h1>
                            <div>
                                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                                    <table style={{ width: "100%", tableLayout: "fixed" }}>
                                        <tr>
                                            <td><label >Search (title or author): </label></td>
                                            <td><input
                                                style={{ marginBottom: "5px" }}
                                                type="text"
                                                onChange={this.onChangeKeyword}
                                                className="form-control"
                                                placeholder="Search by title or author"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label >Order by: </label></td>
                                            <td>
                                                <select style={{ marginBottom: "5px" }} className="form-control" onChange={this.onChangeOrderBy} value={this.state.orderBy}>
                                                    <option value="">None</option>
                                                    <option value="title">Title</option>
                                                    <option value="author">Author</option>
                                                    <option value="createdAt">Date created</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Books per page: </label></td>
                                            <td>

                                                <select style={{ marginBottom: "5px" }} className="form-control" onChange={this.handlePageSizeChange} value={this.state.pageSize}>
                                                    {this.pageSizes.map((size) => (
                                                        <option key={size} value={size}>
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Page: </label></td>
                                            <td>
                                                <Pagination
                                                    showLastButton
                                                    className="my-3"
                                                    count={this.state.count}
                                                    page={this.state.page}
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                    variant="outlined"
                                                    // shape="rounded"
                                                    onChange={this.handlePageChange}
                                                />
                                                {/* <ReactPaginate
                                                    totalPages={this.state.page}
                                                    previousLabel={'Previous'}
                                                    nextLabel={'next'}
                                                    breakLabel={'...'}
                                                    breakClassName={'break-me'}
                                                    pageCount={this.state.count}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={this.handlePageChange}
                                                    containerClassName={'pagination'}
                                                    activeClassName={'active'}
                                                /> */}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <br /><br /><br /><br /><br /><br /><br /><br /><br />
                            <div>
                                {this.state.books.map((book, index) => (
                                    <div className="row" style={{ minHeight: "100%" }}>
                                        <article className="post" style={{ minHeight: "100%" }}>
                                            <header style={{ minHeight: "100%" }}>
                                                <a style={{ margin: "10px 10px 10px 10px" }} href={"/book/" + book.id}><img style={{ height: "175px", width: "130px", margin: "10% 10% 10% 10%" }} src={book.image} alt="" /></a>
                                                <div className="title" style={{ float: "left", margin: "2% 5% 2% 2%" }}>
                                                    <h2><a className="a-title" href={"/book/" + book.id}>{book.title}</a></h2>
                                                    <h2><small>By: <a className="a-title" href={"/author/" + book.author}>{book.author}</a></small></h2>
                                                    <p className="fifty-chars" style={{ fontSize: "16px", fontFamily: "Georgia" }}>{book.description}</p>
                                                </div>
                                            </header>
                                        </article>
                                    </div>
                                ))}
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
            </div >
        );
    }
}
export default withRouter(Index);