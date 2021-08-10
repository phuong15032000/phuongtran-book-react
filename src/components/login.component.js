import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            login: {
                username: null,
                password: null
            },
            loading: false,
            message: "",
            userReturn: {
                roleList: []
            },
        }
    }
    onChangeEmail(e) {
        this.state.login.username = e.target.value;
    }
    onChangePassword(e) {
        this.state.login.password = e.target.value;
    }
    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.login.username, this.state.login.password).then(
                () => {
                    this.props.history.push("/index");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div>
                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
                <script src="https://use.fontawesome.com/967b9063cd.js"></script>
                <link href="../css/login.css" rel="stylesheet" type="text/css" />
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
                                <li><a href="/login" className="active"><i className="fa fa-sign-in" />Sign in</a></li>
                                <li><a href="/register"><i className="fa fa-pencil-square-o" />Sign up</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Blog</h1>
                        <div className="tm-right-inner-container">
                            <div className="main-bg">
                                <div className="login-container text-c animated flipInX">
                                    <div>
                                        <h1 className="text-center"><span className="fa fa-user-circle" /></h1>
                                    </div>
                                    <h3 className="text-center">Sign in</h3>
                                    <div className="container-content">
                                        <Form className="margin-t"
                                            onSubmit={this.handleLogin}
                                            ref={c => {
                                                this.form = c;
                                            }}
                                        >
                                            <div className="form-group">
                                                <Input
                                                    name="email"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    onChange={this.onChangeEmail}
                                                    required />
                                            </div>
                                            <div className="form-group">
                                                <Input type="password"
                                                    className="form-control"
                                                    placeholder="*****"
                                                    required
                                                    onChange={this.onChangePassword}
                                                />
                                            </div>
                                            <button type="submit"
                                                className="form-button button-l margin-b"
                                                disabled={this.state.loading}
                                            >
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <span>Sign in</span></button>
                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
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
                                            <a className href=""><small>Forget the password?</small></a>
                                            <p className="text-center"><small>Don't have a account?</small></p>
                                            <a className href="/register"><small>Sign up now!</small></a>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right section */}
                </div>
            </div>
        );

    }

}

export default withRouter(Login);