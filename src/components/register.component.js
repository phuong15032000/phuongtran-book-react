import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        //this.handleRegister = this.handleRegister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeIntro = this.onChangeIntro.bind(this);
        this.email_validate = this.email_validate.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.checkNull = this.checkNull.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: {
                firstName: null,
                lastName: null,
                email: null,
                password: null
            },
            successful: false,
            message: ""
        }
    }
    checkNull() {
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        var pass2 = document.getElementById('pass2');
        var pass1 = document.getElementById('pass1');
        var message = document.getElementById('confirmMessage');
        if (document.getElementById("ip_email").value==="" || document.getElementById("ip_email").value==null) {
            console.log("email null: " + this.state.email)
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
        this.setState({
            message: "",
            successful: false
        });
        AuthService.register(
            this.state.user
        ).then(
            response => {
                this.setState({
                    message: response.data,
                    successful: true
                });
                console.log(response.data)
                this.props.history.push("/login");
                window.location.reload();
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
        if (document.getElementById('pass1').value === document.getElementById('pass2').value) {
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
    onChangeMobile(e) {
        this.state.user.mobile = e.target.value
    }
    onChangeFirstName(e) {
        this.state.user.firstName = e.target.value
    }
    onChangeLastName(e) {
        this.state.user.lastName = e.target.value
    }
    onChangeEmail(e) {
        this.state.user.email = e.target.value
        console.log(this.state.user.email)
    }

    onChangePassword(e) {
        this.state.user.password = e.target.value
    }
    onChangeIntro(e) {
        this.state.user.intro = e.target.value
    }
    render() {
        return (
            <div>
                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
                <script src="https://use.fontawesome.com/967b9063cd.js"></script>
                <link href="../" />
                <div className="templatemo-logo visible-xs-block">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 black-bg logo-left-container">
                        <h1 className="logo-left">Novahub</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg logo-right-container">
                        <h1 className="logo-right">Blog</h1>
                    </div>
                </div>
                <div className="templatemo-container">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 black-bg left-container">
                        <h1 className="logo-left hidden-xs margin-bottom-60">Novahub</h1>
                        <div className="tm-left-inner-container">
                            <ul className="nav nav-stacked templatemo-nav">
                                <li><a href="/index"><i className="fa fa-home" />Homepage</a></li>
                                <li><a href="/login"><i className="fa fa-sign-in" />Sign in</a></li>
                                <li><a href="/register" className="active"><i className="fa fa-pencil-square-o" />Sign up</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Blog</h1>
                        <div className="tm-right-inner-container">
                            <div className="row">
                                <div className="col-md-12">
                                    {!this.state.successful && (
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
                                                <label htmlFor="email"><span className="req" style={{ color: "red" }}>* </span> Email:</label>
                                                <input
                                                    id="ip_email"
                                                    name="email"
                                                    className="form-control"
                                                    type="text"
                                                    value={this.state.email}
                                                    onKeyUp={this.email_validate}
                                                    onChange={this.onChangeEmail}
                                                />
                                                <div className="status" id="status"/>
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
                                            <div className="form-group">
                                                <input type="checkbox" required name="terms" onChange="this.setCustomValidity(validity.valueMissing ? 'Please indicate that you accept the Terms and Conditions' : '');" id="field_terms" /> &nbsp; <label htmlFor="terms">I agree to the <a href="#" title="You may read our terms and conditions by clicking on this link">company's terms</a></label><span className="req">* </span>
                                            </div>
                                            <div className="form-group">
                                                <button id="btn-submit" style={{ float: "right" }} onClick={this.checkNull} className="btn btn-success" type="submit" name="submit_reg">Sign up</button>
                                            </div>
                                        </fieldset>
                                    )}
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

                                    <script type="text/javascript">
                                        document.getElementById("field_terms").setCustomValidity("Please indicate that you accept the Terms and Conditions");
                                    </script>
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