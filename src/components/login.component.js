import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
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
                    this.setState({
                        loading: false,
                        message: "Login succesfully!"
                    });
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
                    if (resMessage === "Request failed with status code 401") {
                        this.setState({
                            loading: false,
                            message: "This account has been disabled!"
                        });
                    }
                    else if (resMessage === "Request failed with status code 403") {
                        this.setState({
                            loading: false,
                            message: "Username or password is incorrect!"
                        });
                    }
                    else if (resMessage === "Request failed with status code 500") {
                        this.setState({
                            loading: false,
                            message: "Username is not available!"
                        });
                    }
                    else if (resMessage === "Network Error") {
                        this.setState({
                            loading: false,
                            message: "Cannot connect to server! Please try again later."
                        });
                    }
                    else {
                        this.setState({
                            loading: false,
                            message: "Cannot connect to server! Please try again later."
                        });
                    }
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }
    signup(res) {
        const googlePojo = {
            email: res.profileObj.email,
            givenName: res.profileObj.givenName,
            familyName: res.profileObj.familyName,
            picture: res.profileObj.imageUrl,
            accessToken: res.Zb.accessToken
        };
        debugger;
        axios.post(`http://localhost:8080/api/auth/login-google`, googlePojo)
            // .then((result) => {
            //     let responseJson = result;
            //     sessionStorage.setItem("user", JSON.stringify(result));
            //     this.props.history.push('/index')
            // });
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    this.props.history.push('/index')
                }});
    };
    render() {
        const responseGoogle = (response) => {
            console.log(response);
            var res = response.profileObj;
            console.log(res);
            this.signup(response);
        }
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

                                    <GoogleLogin
                                        className="form-button button-l margin-b"
                                        clientId="960487106143-tl1iot8cd2lt387tlj9d4pfgg7mpo735.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
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