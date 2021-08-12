import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from '../services/auth.service'
import UserDataService from '../services/user.service'
class BookManagement extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            users: [],
            isAdmin: null
        };
    }
    componentDidMount() {
        this.retrieveUsers();
    }
    retrieveUsers() {
        UserDataService.findAll()
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    enableUser(id){
        UserDataService.enableUser(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }    
    disableUser(id){
        UserDataService.disableUser(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
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
                                <li><a href="/add-book"><i className="fa fa-pencil" />Add book</a></li>
                                <li><a href="/mybooks"><i className="fa fa-sticky-note" />My books</a></li>
                                <li><a href="/books-management"><i className="fa fa-sticky-note" />Books</a></li>
                                <li><a href="/users-management" className="active"><i className="fa fa-sticky-note" />Users</a></li>
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
                                <table style={{ width: "100%"}} class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Active</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.users.map((user, index) => (
                                        <tr>
                                            <th scope="row"><a href={"/admin-user/"+user.id}>{user.id}</a></th>
                                            <td>{user.enabled
                                                ? <i className="fa fa-check"></i>
                                                : <i className="fa fa-times"></i>
                                            }</td>
                                            <td><a href={"/admin-user/"+user.id}>{user.email}</a></td>
                                            <td><a href={"/admin-user/"+user.id}>{user.firstName} {user.lastName}</a></td>
                                            <th>
                                                {!user.enabled
                                                    ? <button style={{width: "80px"}} onClick={() => this.enableUser(user.id)} className="btn btn-danger">Disabled</button>
                                                    : <button style={{width: "80px"}} onClick={() => this.disableUser(user.id)} className="btn btn-success">Enabled</button>
                                                }
                                            </th>
                                        </tr>

                                    ))}
                                </tbody>
                                </table>
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
export default withRouter(BookManagement);
