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
        this.demo = this.demo.bind(this);
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
    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.user
            ).then(
                response => {
                    this.setState({
                        message: response.data,
                        successful: true
                    });
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
    demo() {
        console.log("First name: " + this.state.user.firstName)
        console.log("Last name: " + this.state.user.lastName)
        console.log("Phone number: " + this.state.user.mobile)
        console.log("Email: " + this.state.user.email)
        console.log("Password: " + this.state.user.password)
        console.log("Intro: " + this.state.user.intro)
    }

    email_validate(e) {
        var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
        if (regMail.test(e.target.value) == false) {
            document.getElementById("status").innerHTML = "<span class='warning'>Email address is not valid yet.</span>";
            console.log(e.target.value + "day khong phai email");
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
            message.innerHTML = "Passwords Match"
        } else {
            pass2.style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "Passwords Do Not Match!"
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
                                    <Form
                                        className="form"
                                        onSubmit={this.handleRegister}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        {!this.state.successful && (
                                            <fieldset>
                                                <legend className="text-center">Fill your information to below form. <span className="req" />
                                                </legend>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> First name: </label>
                                                    <input
                                                        name="firstname"
                                                        type="text"
                                                        className="form-control"
                                                        required="required"
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Last name: </label>
                                                    <input
                                                        name="lastname"
                                                        type="text"
                                                        className="form-control"
                                                        required="required"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}

                                                    />
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="email"><span className="req">* </span> Email: <small>(Also your username)</small></label>
                                                    <input
                                                        name="email"
                                                        required="required"
                                                        className="form-control"
                                                        type="text"
                                                        value={this.state.email}
                                                        onKeyUp={this.email_validate}
                                                        onChange={this.onChangeEmail}
                                                    />
                                                    <div className="status" id="status" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password"><span className="req">* </span> Password: </label>
                                                    <input
                                                        type="password"
                                                        required="required"
                                                        className="form-control inputpass"
                                                        minLength={4}
                                                        maxLength={16}
                                                        placeholder="Password"
                                                        id="pass1"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Confirm password: </label>
                                                    <input
                                                        required
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
                                                    <button style={{float: "right"}} onClick={this.demo} className="btn btn-success" type="submit" name="submit_reg">Sign up</button>
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
                                                    {this.state.message} <a href="/login">Click here to login</a> or <a href="/register">click here to register another account.</a>
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