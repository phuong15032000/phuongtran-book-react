import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from '../services/auth.service'
import UserDataService from '../services/user.service'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import 'react-notifications/lib/notifications.css';
class BookManagement extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.checkNull = this.checkNull.bind(this);
        this.email_validate = this.email_validate.bind(this);
        this.password_validate = this.password_validate.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            isOpen: false,
            users: [],
            isAdmin: null,
            user: {
                email: null,
                password: null,
                firstName: null,
                lastName: null,
                role: {
                    name: "ROLE_USER"
                }
            }
        };
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    onChangeEmail(e) {
        this.state.user.email = e.target.value
    }
    onChangePassword(e) {
        this.state.user.password = e.target.value
    }
    onChangeFirstName(e) {
        this.state.user.firstName = e.target.value
    }
    onChangeLastName(e) {
        this.state.user.lastName = e.target.value
    }
    onChangeRole(e) {
        this.state.user.role.name = e.target.value
    }
    email_validate(e) {
        var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
        if (regMail.test(e.target.value) == false) {
            document.getElementById("status").innerHTML = "<span class='warning'>Email address is not valid yet.</span>";
            document.getElementById("btn-submit").disabled = true
        } else {
            document.getElementById("status").innerHTML = "<span class='valid'>Thanks, you have entered a valid Email address!</span>";
        }
    }
    password_validate(e) {
        var pass2 = document.getElementById('pass2');
        var message = document.getElementById('confirmMessage');
        //Set the colors we will be using ...
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        if ((document.getElementById('pass1').value === document.getElementById('pass2').value) && document.getElementById('pass1').value!="" && document.getElementById('pass1').value!=null) {
            pass2.style.backgroundColor = goodColor;
            message.style.color = goodColor;
            message.innerHTML = "Passwords Match";
            document.getElementById("btn-submit").disabled = false
        } else {
            pass2.style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "Passwords Do Not Match!"
            document.getElementById("btn-submit").disabled = true
        }
    }
    checkNull() {
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        var pass2 = document.getElementById('pass2');
        var pass1 = document.getElementById('pass1');
        var message = document.getElementById('confirmMessage');
        if (document.getElementById("ip_email").value === "" || document.getElementById("ip_email").value == null) {
            console.log("email null: " + this.state.user.email)
            //document.getElementById("ip_email").style.backgroundColor = badColor;
            document.getElementById("ip_email").style.borderColor = badColor;
            document.getElementById("ip_email").style.borderStyle = "1";
            document.getElementById("status").innerHTML = `<span style="color:red;">Email address can't be empty.</span>`;
        }
        if (this.state.user.password === "" || this.state.user.password == null) {
            pass1.style.borderColor = badColor;
            pass2.style.borderColor = badColor;
            message.style.color = "red";
            message.innerHTML = "Password can't be empty";
        }
        else {
            console.log("hello")
            this.handleRegister();
        }
    }
    handleRegister() {
        UserDataService.addUser(
            this.state.user
        ).then(
            response => {
                this.setState({
                    message: response.data,
                    successful: true
                });
                console.log(response.data)
                this.retrieveUsers()
                this.closeModal()
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (resMessage === "Request failed with status code 404") {
                    this.setState({
                        loading: false,
                        message: "Email has been registered!"
                    });
                }
                else this.setState({
                    successful: false,
                    message: `Register successfully! <a href="/login">Click here to login</a>`
                });
            }
        );
    }
    componentDidMount() {
        this.retrieveUsers();
    }
    retrieveUsers() {
        UserDataService.findAllRole()
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
    enableUser(id) {
        UserDataService.enableUser(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    disableUser(id) {
        UserDataService.disableUser(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    setAdmin(id) {
        UserDataService.setAdmin(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    removeAdmin(id) {
        UserDataService.removeAdmin(id)
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
                                <li><a href="/mybooks"><i className="fa fa-sticky-note" />My books</a></li>
                                <li><a href="/books-management"><i className="fa fa-sticky-note" />Books</a></li>
                                <li><a href="/users-management" className="active"><i className="fa fa-sticky-note" />Users</a></li>
                                <li><a href="javascript:void(0);" onClick={this.logout}><i className="fa fa-pencil-square-o" aria-hidden="true" />Log out</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Book</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Users management page for SUPERADMIN</h1>
                            <div>
                                <Button style={{ marginBottom: "10px" }} variant="primary" onClick={this.openModal}>
                                    Add a new user
                                </Button>
                                <Modal show={this.state.isOpen} onHide={this.closeModal} style={{ opacity: 1, marginLeft: "5%", paddingTop: "14%", height: "800px" }} >
                                    <Modal.Body>
                                        <fieldset>
                                            <legend className="text-center">Fill your information to below form. <span className="req" />
                                            </legend>
                                            <div className="form-group">
                                                <label>First name: </label>
                                                <input
                                                    name="firstname"
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.firstName}
                                                    onChange={this.onChangeFirstName}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Last name: </label>
                                                <input
                                                    name="lastname"
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.lastName}
                                                    onChange={this.onChangeLastName}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label><span className="req" style={{ color: "red" }}>* </span> Email:</label>
                                                <input
                                                defaultValue={this.state.user.email}
                                                    id="ip_email"
                                                    className="form-control"
                                                    type="text"
                                                    onKeyUp={this.email_validate}
                                                    onChange={this.onChangeEmail}
                                                    autocomplete="false"
                                                />
                                                <div className="status" id="status" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email"><span className="req" style={{ color: "red" }}>* </span> Role:</label>
                                                <select onChange={this.onChangeRole} className="form-control">
                                                    <option value="ROLE_USER">User</option>
                                                    <option value="ROLE_ADMIN">Admin</option>
                                                </select>
                                                <div className="status" id="status" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password"><span className="req" style={{ color: "red" }}>* </span> Password: </label>
                                                <input
                                                    type="password"
                                                    className="form-control inputpass"
                                                    minLength={4}
                                                    maxLength={16}
                                                    placeholder="Password"
                                                    id="pass1"
                                                    onKeyUp={this.password_validate}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label><span className="req" style={{ color: "red" }}>* </span> Confirm password: </label>
                                                <input
                                                    type="password"
                                                    className="form-control inputpass"
                                                    minLength={4}
                                                    maxLength={16}
                                                    id="pass2"
                                                    placeholder="Input your password again to confirm"
                                                    onKeyUp={this.password_validate}

                                                    onChange={this.onChangePassword}
                                                /> <p />
                                                <span id="confirmMessage" className="confirmMessage" />
                                            </div>
                                        </fieldset>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button id="btn-submit" style={{ float: "right" }} onClick={this.handleRegister} className="btn btn-success" type="submit" name="submit_reg">Sign up</button>
                                        <Button className="form-group" variant="secondary" onClick={this.closeModal}>
                                            Close
                                        </Button>&nbsp;
                                    </Modal.Footer>

                                </Modal>
                                <table style={{ width: "100%" }} class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Active</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.users.map((user, index) => (
                                            <tr>
                                                <th scope="row"><a href={"/admin-user/" + user.id}>{user.id}</a></th>
                                                <td>{user.enabled
                                                    ? <i className="fa fa-check"></i>
                                                    : <i className="fa fa-times"></i>
                                                }</td>
                                                <td><a href={"/admin-user/" + user.id}>{user.email}</a></td>
                                                <td>{user.role.name}</td>
                                                <th>
                                                    {!user.enabled
                                                        ? <button style={{ width: "80px" }} onClick={() => this.enableUser(user.id)} className="btn btn-danger">Disabled</button>
                                                        : <button style={{ width: "80px" }} onClick={() => this.disableUser(user.id)} className="btn btn-success">Enabled</button>
                                                    }
                                                    &nbsp;
                                                    {user.role.id == 1
                                                        ? <button style={{ width: "125px" }} onClick={() => this.removeAdmin(user.id)} className="btn btn-success">Remove admin</button>
                                                        : <button style={{ width: "125px" }} onClick={() => this.setAdmin(user.id)} className="btn btn-success">Set admin</button>
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
