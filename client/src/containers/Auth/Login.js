import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import { toast } from 'react-toastify';
import './Login.scss';
import { handleLoginApi, loginFacebook } from '../../services/userService';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
    }

    handleOnChangeUserName = (e) => {
        this.setState({
            fullname: e.target.value,
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            const data = await handleLoginApi(this.state.fullname, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                console.log(data);
                this.props.userLoginSuccess(data.user);
                toast.success('Log in successfully');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
        console.log(this.state.isShowPassword);
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
        }
    };

    responseFacebook = async (response) => {
        try {
            const { accessToken, userID, email, name } = response;
            const data = await loginFacebook({ email, userID, accessToken, name });
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSocialSuccess(data);
                this.props.history.push('/home');
                toast.success('Log in successfully');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
        }
    };

    render() {
        return (
            <>
                <div className="cont">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="authfy-container col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-offset-1 col-md-offset-2 col-lg-offset-3">
                                <div className="col-sm-5 authfy-panel-left">
                                    <div className="brand-col">
                                        <div className="headline">
                                            <p>Login using social media to get quick access</p>
                                            {/* <!-- social login buttons start --> */}
                                            <div className="row social-buttons">
                                                <div
                                                    className="col-xs-4 col-sm-4 col-md-12"
                                                    style={{ padding: '0.375rem 1.4rem', borderRadius: '4px' }}
                                                >
                                                    <FacebookLogin
                                                        textButton="Login with Facebook"
                                                        appId="744512323509710"
                                                        autoLoad={false}
                                                        fields="name,email,picture"
                                                        icon="fa-facebook"
                                                        callback={this.responseFacebook}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-7 authfy-panel-right">
                                    {/* <!-- authfy-login start --> */}
                                    <div className="authfy-login">
                                        {/* <!-- panel-login start --> */}
                                        <div className="authfy-panel panel-login text-center active">
                                            <div className="authfy-heading">
                                                <h3 className="auth-title">Login to your account</h3>
                                                <p>
                                                    Don’t have an account?{' '}
                                                    <Link to="/register" className="lnk-toggler">
                                                        Sign Up Free!
                                                    </Link>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12">
                                                    <form
                                                        name="loginForm"
                                                        className="loginForm"
                                                        action="#"
                                                        method="POST"
                                                    >
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control email"
                                                                name="username"
                                                                placeholder="Username"
                                                                value={this.state.fullname}
                                                                onChange={(e) => this.handleOnChangeUserName(e)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="pwdMask">
                                                                <input
                                                                    type={
                                                                        this.state.isShowPassword ? 'text' : 'password'
                                                                    }
                                                                    className="form-control password"
                                                                    name="password"
                                                                    autoComplete="off"
                                                                    placeholder="Password"
                                                                    value={this.state.password}
                                                                    onChange={(e) => this.handleOnChangePassword(e)}
                                                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                                                />
                                                                <span onClick={() => this.handleShowHidePassword()}>
                                                                    <i
                                                                        className={
                                                                            this.state.isShowPassword
                                                                                ? 'fas fa-eye show-password'
                                                                                : 'fas fa-eye-slash show-password'
                                                                        }
                                                                    ></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-12"
                                                            style={{
                                                                color: 'red',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            {this.state.errMessage}
                                                        </div>
                                                        {/* <!-- start remember-row --> */}
                                                        <div className="row remember-row">
                                                            <div className="col-xs-6 col-sm-6">
                                                                <p className="forgotPwd">
                                                                    <a
                                                                        className="lnk-toggler"
                                                                        data-panel=".panel-forgot"
                                                                        href="# "
                                                                        style={{ marginLeft: '7rem' }}
                                                                    >
                                                                        Forgot password?
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* <!-- ./remember-row --> */}
                                                        <div className="form-group">
                                                            <button
                                                                className="btn btn-lg btn-primary btn-block"
                                                                type="button"
                                                                onClick={() => this.handleLogin()}
                                                            >
                                                                Login
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="snell">
                        <svg
                            width="100%"
                            height="100"
                            viewBox="0 0 328 265"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="XMLID5">
                                <g id="eye2">
                                    <g id="XMLID67">
                                        <path
                                            id="Vector"
                                            d="M45.7 128.6C40.6 128.2 35.5 127.8 30.4 127.4C33 107.8 31.8 88.1 27.2 69.3C30.8 68.3 34.4 67.2 38 66.1C44.4 85.9 47.1 107.1 45.7 128.6Z"
                                            fill="#AAD543"
                                        />
                                    </g>
                                    <g id="XMLID65" opacity="0.49">
                                        <path
                                            id="Vector_2"
                                            opacity="0.49"
                                            d="M45.7 128.6C40.6 128.2 35.5 127.8 30.4 127.4C33 107.8 31.8 88.1 27.2 69.3C30.8 68.3 34.4 67.2 38 66.1C44.4 85.9 47.1 107.1 45.7 128.6Z"
                                            fill="#AAD543"
                                        />
                                    </g>
                                    <g id="XMLID63">
                                        <path
                                            id="Vector_3"
                                            d="M45.7 128.6C40.6 128.2 35.5 127.8 30.4 127.4C33 107.8 31.8 88.1 27.2 69.3C30.8 68.3 34.4 67.2 38 66.1C44.4 85.9 47.1 107.1 45.7 128.6Z"
                                            stroke="#2A2A2A"
                                            strokeWidth="6"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <g id="XMLID44">
                                        <g id="XMLID 49">
                                            <path
                                                id="XMLID 51"
                                                d="M27.5 77.8C40.9205 77.8 51.8 66.9205 51.8 53.5C51.8 40.0795 40.9205 29.2 27.5 29.2C14.0795 29.2 3.20001 40.0795 3.20001 53.5C3.20001 66.9205 14.0795 77.8 27.5 77.8Z"
                                                fill="#AAD543"
                                            />
                                            <path
                                                id="XMLID 50"
                                                d="M27.5 77.8C40.9205 77.8 51.8 66.9205 51.8 53.5C51.8 40.0795 40.9205 29.2 27.5 29.2C14.0795 29.2 3.20001 40.0795 3.20001 53.5C3.20001 66.9205 14.0795 77.8 27.5 77.8Z"
                                                stroke="#2A2A2A"
                                                strokeWidth="6"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <g id="XMLID45">
                                            <path
                                                id="XMLID 48"
                                                d="M24.9 77.3C35.8905 77.3 44.8 68.3905 44.8 57.4C44.8 46.4095 35.8905 37.5 24.9 37.5C13.9095 37.5 5 46.4095 5 57.4C5 68.3905 13.9095 77.3 24.9 77.3Z"
                                                fill="white"
                                            />
                                            <path
                                                id="XMLID 47"
                                                d="M19.6 67.7C23.6869 67.7 27 64.3869 27 60.3C27 56.2131 23.6869 52.9 19.6 52.9C15.5131 52.9 12.2 56.2131 12.2 60.3C12.2 64.3869 15.5131 67.7 19.6 67.7Z"
                                                fill="#2A2A2A"
                                            />
                                            <path
                                                id="XMLID 46"
                                                d="M24.9 77.3C35.8905 77.3 44.8 68.3905 44.8 57.4C44.8 46.4095 35.8905 37.5 24.9 37.5C13.9095 37.5 5 46.4095 5 57.4C5 68.3905 13.9095 77.3 24.9 77.3Z"
                                                stroke="#2A2A2A"
                                                strokeWidth="6"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                    </g>
                                </g>
                                <path
                                    id="XMLID 62"
                                    d="M281.2 222.7L137.6 207.5C115.1 205.3 98 186.4 98 163.8L95.7 145.4C92.5 118.3 72.3 109.4 52 109.4C23 109.4 18.5 129.1 17.9 166.3C20 167.2 22.2 167.3 25.7 167.5C26.6 178.8 21.9 189 18 195.6C20.5 233.5 44 261.3 77.8 261.3H294.6C300 261.3 308.8 260.5 316.3 259.7C323.8 258.9 327.6 250.2 323 244.2C315.2 234.1 307.2 227.3 281.2 222.7Z"
                                    fill="white"
                                />
                                <path
                                    id="XMLID 61"
                                    d="M281.2 222.7L137.6 207.5C115.1 205.3 98 186.4 98 163.8L95.7 145.4C92.5 118.3 72.3 109.4 52 109.4C23 109.4 18.5 129.1 17.9 166.3C20 167.2 22.2 167.3 25.7 167.5C26.6 178.8 21.9 189 18 195.6C20.5 233.5 44 261.3 77.8 261.3H294.6C300 261.3 308.8 260.5 316.3 259.7C323.8 258.9 327.6 250.2 323 244.2C315.2 234.1 307.2 227.3 281.2 222.7Z"
                                    fill="#AAD543"
                                />
                                <path
                                    id="XMLID 60"
                                    d="M321.5 242.3C321.5 251.6 302.5 252.7 297.4 252.7L82.8 249.1C61.5 249.1 46.8 243.5 32.9 226.5C29.1 221.8 21.3 206.9 19 198.4C22.8 240.7 51.2 261.5 77.7 261.5H294.5C299.9 261.5 306.5 260.7 314 259.9C320.7 259.1 327.9 250.7 321.5 242.3Z"
                                    fill="#8EC42B"
                                />
                                <path
                                    id="XMLID 59"
                                    d="M323.8 241.4C316.1 231.3 307.3 227.3 281.5 222.8C281.4 222.8 281.3 222.8 281.1 222.7L137.7 207.5C115.3 205.4 98.2 186.6 98.1 164.1C98.1 163.9 98.1 163.8 98.1 163.6L95.8 145.4C92.6 118.3 72.4 109.4 52.1 109.4C48.8 109.4 45.8 109.7 43.1 110.2C37.4 111.3 37.7 111.9 32 114.7C25.3 118.1 19.7 140.3 19.7 140.4C20.5 158.8 20.5 123.1 39.4 118.1C61.2 112.3 81.3 119.9 85 145.9C85 145.9 87.5 170.2 88.4 176.3C91.7 198.5 109.9 214.2 132.3 216.4L273.4 233C273.5 233 269.6 229 269.7 229C295.5 233.6 322.2 236.5 323.8 249.1C323.8 249.3 321 253.5 321.1 253.7C322.3 254.9 322.2 255.2 323.8 252.1C325.5 248.9 326.2 244.6 323.8 241.4Z"
                                    fill="#C6E65B"
                                />
                                <path
                                    id="XMLID 58"
                                    d="M281.2 222.7L137.6 207.5C115.1 205.3 98 186.4 98 163.8L95.7 145.4C92.5 118.3 72.3 109.4 52 109.4C23 109.4 18.5 129.1 17.9 166.3C20 167.2 22.2 167.3 25.7 167.5C26.6 178.8 21.9 189 18 195.6C20.5 233.5 44 261.3 77.8 261.3H294.6C300 261.3 312.1 260.2 318.3 256C325.9 250.8 326.1 243.2 320.8 237.9C313.3 230.4 307.2 227.3 281.2 222.7Z"
                                    stroke="#2A2A2A"
                                    strokeWidth="6"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    id="XMLID 57"
                                    d="M17.9 166.4C17.9 166.4 24.8 170.3 48.1 164C48.3 172.6 35.3 193.6 18.1 195.7C19.1 193.9 25.2 182.2 25.7 174C25.7 172.5 26.3 168.6 25.8 167.6C20.6 167.6 17.9 166.4 17.9 166.4Z"
                                    fill="#2A2A2A"
                                />
                                <path
                                    id="XMLID 56"
                                    d="M17.9 166.4C17.9 166.4 24.8 170.3 48.1 164C48.3 172.6 35.3 193.6 18.1 195.7C19.1 193.9 25.2 182.2 25.7 174C25.7 172.5 26.3 168.6 25.8 167.6C20.6 167.6 17.9 166.4 17.9 166.4Z"
                                    stroke="#2A2A2A"
                                    strokeWidth="6"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    id="XMLID 55"
                                    d="M45.3 158.8C45.6 159.1 50.4 163.7 51.7 168.5"
                                    stroke="#2A2A2A"
                                    strokeWidth="6"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <g id="eye1">
                                    <path
                                        id="XMLID54"
                                        d="M77.2 129.2C71.8 128.8 66.5 128.3 61.1 127.9C64.5 100.5 62.6 73 55.9 46.9C59.7 45.8 63.5 44.7 67.3 43.6C75.7 70.7 79.3 99.7 77.2 129.2Z"
                                        fill="#AAD543"
                                    />
                                    <path
                                        id="XMLID53"
                                        d="M67.3 43.6C64.8 44.3 62.4 45 59.9 45.8C63.3 54.9 62.3 78.3 64 78.1C65.7 77.9 69.2 76.8 69.6 78.4C72.7 92.9 74.4 108.5 74.4 126.8C76.8 127 74.8 129.1 77.2 129.3C79.3 99.7 75.7 70.7 67.3 43.6Z"
                                        fill="#8EC42B"
                                    />
                                    <g id="XMLID 36">
                                        <g id="XMLID 41">
                                            <path
                                                id="XMLID 43"
                                                d="M66.5 69.4C84.6149 69.4 99.3 54.7149 99.3 36.6C99.3 18.4851 84.6149 3.79999 66.5 3.79999C48.3851 3.79999 33.7 18.4851 33.7 36.6C33.7 54.7149 48.3851 69.4 66.5 69.4Z"
                                                fill="#AAD543"
                                            />
                                            <path
                                                id="XMLID 42"
                                                d="M66.5 69.4C84.6149 69.4 99.3 54.7149 99.3 36.6C99.3 18.4851 84.6149 3.79999 66.5 3.79999C48.3851 3.79999 33.7 18.4851 33.7 36.6C33.7 54.7149 48.3851 69.4 66.5 69.4Z"
                                                stroke="#2A2A2A"
                                                strokeWidth="6"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <g id="XMLID 37">
                                            <path
                                                id="XMLID 40"
                                                d="M62.9 68.7C77.7565 68.7 89.8 56.6564 89.8 41.8C89.8 26.9435 77.7565 14.9 62.9 14.9C48.0435 14.9 36 26.9435 36 41.8C36 56.6564 48.0435 68.7 62.9 68.7Z"
                                                fill="white"
                                            />
                                            <path
                                                id="XMLID 39"
                                                d="M55.7 55.6C61.1676 55.6 65.6 51.1676 65.6 45.7C65.6 40.2324 61.1676 35.8 55.7 35.8C50.2324 35.8 45.8 40.2324 45.8 45.7C45.8 51.1676 50.2324 55.6 55.7 55.6Z"
                                                fill="#2A2A2A"
                                            />
                                            <path
                                                id="XMLID 38"
                                                d="M62.9 68.7C77.7565 68.7 89.8 56.6564 89.8 41.8C89.8 26.9435 77.7565 14.9 62.9 14.9C48.0435 14.9 36 26.9435 36 41.8C36 56.6564 48.0435 68.7 62.9 68.7Z"
                                                stroke="#2A2A2A"
                                                strokeWidth="6"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                    </g>
                                </g>

                                <path
                                    id="XMLID 34"
                                    d="M148.8 226.4C132.9 224.2 117.4 198.3 117.4 163.9C117.4 109.1 160.1 68.6 212.7 68.6C265.3 68.6 308 111.3 308 164C308 216.7 265.3 259.3 212.7 259.3C186.4 259.3 148.9 247.2 142.7 207.9C136.5 168.6 161 131.3 204 128.8C231.9 127.2 257.2 150 257.2 177.9C257.2 205.8 233.9 226.6 212.7 226.6C191.7 226.6 180.5 213.6 180.5 198C180.5 182.4 191.1 171.8 206.7 171.8C217.1 171.8 222.5 181.7 222.1 189.3"
                                    fill="#EE368C"
                                />
                                <path
                                    id="XMLID 33"
                                    d="M191.7 221.3C191.7 221.3 233.3 233.3 256.9 183.6C250.5 202.6 248.3 212.7 230.4 222.1C209.5 226.5 211.3 228.7 191.7 221.3Z"
                                    fill="#E41B64"
                                />
                                <path
                                    id="XMLID 25"
                                    d="M284.2 101.7C295.9 117.5 303.7 133 305.1 149.5C310.3 212.8 248.7 256.3 198.2 251C176.7 248.8 164.2 240.5 148.9 226.4L132.3 215.1C127.3 214.4 130.5 209.6 126 204.8C132 217.2 140.4 225.2 148.9 226.3C162 251 191.2 259.2 212.8 259.2C265.4 259.2 308.1 216.5 308.1 163.9C308 141.8 300.8 118.3 284.2 101.7Z"
                                    fill="#E41B64"
                                />
                                <path
                                    id="XMLID 24"
                                    opacity="0.39"
                                    d="M122.8 172.6C122.8 117.8 165.5 77.3 218.1 77.3C250.2 77.3 278.7 93.2 295.9 117.6C279.6 88.4 248.4 68.7 212.6 68.7C160 68.7 117.3 109.2 117.3 164C117.3 185.8 123.5 204.1 132.1 215.2C126.5 204.2 122.8 189.4 122.8 172.6Z"
                                    fill="#FFFFFB"
                                />
                                <path
                                    id="XMLID 23"
                                    opacity="0.39"
                                    d="M150.2 229C149.7 228.2 149.2 227.3 148.7 226.4L149.2 226.2C148.3 223.3 147.6 220.3 147.1 217.1C140.9 177.8 165.4 140.5 208.4 138C227.3 136.9 245 147 254.4 162.3C247.2 142 226.4 127.5 203.9 128.8C160.9 131.2 136.4 168.6 142.6 207.9C143.7 214.9 145.8 221.1 148.7 226.5"
                                    fill="#FFFFFB"
                                />
                                <path
                                    id="XMLID 229"
                                    opacity="0.39"
                                    d="M182.6 209.3C181.1 205.8 180.4 202 180.4 198C180.4 182.4 191 171.8 206.6 171.8C213.9 171.8 218.7 174.7 220.8 180.2C218.4 178.2 213.8 176.6 210 176.6C190 176.6 183.6 191.2 183.6 206.9C183.6 207.9 183.8 208.4 183.9 209.3H182.6V209.3Z"
                                    fill="#FFFFFB"
                                />
                                <path
                                    id="XMLID 228"
                                    d="M148.8 226.4C132.9 224.2 117.4 198.3 117.4 163.9C117.4 109.1 160.1 68.6 212.7 68.6C265.3 68.6 308 111.3 308 164C308 216.7 265.3 259.3 212.7 259.3C186.4 259.3 148.9 247.2 142.7 207.9C136.5 168.6 161 131.3 204 128.8C231.9 127.2 257.2 150 257.2 177.9C257.2 205.8 233.9 226.6 212.7 226.6C191.7 226.6 180.5 213.6 180.5 198C180.5 182.4 191.1 170.7 206.7 171.8C220.9 172.8 225.6 185.4 222.1 190.9"
                                    stroke="#2A2A2A"
                                    strokeWidth="6"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <g id="XMLID 18">
                                    <path
                                        id="XMLID 21"
                                        opacity="0.49"
                                        d="M67.8759 140.436C69.4004 139.945 69.9781 137.502 69.1661 134.979C68.3541 132.455 66.46 130.807 64.9354 131.298C63.4108 131.788 62.8331 134.232 63.6451 136.755C64.4571 139.279 66.3513 140.927 67.8759 140.436Z"
                                        fill="#AAD543"
                                    />
                                    <path
                                        id="XMLID 20"
                                        opacity="0.49"
                                        d="M73.7492 158.634C75.2738 158.143 75.8515 155.7 75.0395 153.176C74.2275 150.653 72.3333 149.005 70.8088 149.496C69.2842 149.986 68.7065 152.43 69.5185 154.953C70.3305 157.476 72.2247 159.124 73.7492 158.634Z"
                                        fill="#AAD543"
                                    />
                                    <g id="XMLID 223">
                                        <path
                                            id="XMLID 19"
                                            opacity="0.49"
                                            d="M67.365 150.646C68.8896 150.155 69.4672 147.712 68.6552 145.188C67.8433 142.665 65.9491 141.017 64.4245 141.508C62.8999 141.998 62.3222 144.442 63.1342 146.965C63.9462 149.488 65.8404 151.136 67.365 150.646Z"
                                            fill="#AAD543"
                                        />
                                        <path
                                            id="XMLID 224"
                                            opacity="0.49"
                                            d="M74.2601 148.424C75.7847 147.933 76.3624 145.49 75.5504 142.967C74.7384 140.443 72.8442 138.795 71.3196 139.286C69.795 139.776 69.2174 142.22 70.0294 144.743C70.8414 147.267 72.7355 148.915 74.2601 148.424Z"
                                            fill="#AAD543"
                                        />
                                    </g>
                                </g>
                                <g id="Group">
                                    <path
                                        id="XMLID 32"
                                        opacity="0.29"
                                        d="M247.2 170.2C251.453 170.2 254.9 166.753 254.9 162.5C254.9 158.247 251.453 154.8 247.2 154.8C242.947 154.8 239.5 158.247 239.5 162.5C239.5 166.753 242.947 170.2 247.2 170.2Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 31"
                                        opacity="0.29"
                                        d="M277.9 114.3C282.594 114.3 286.4 110.494 286.4 105.8C286.4 101.106 282.594 97.3 277.9 97.3C273.206 97.3 269.4 101.106 269.4 105.8C269.4 110.494 273.206 114.3 277.9 114.3Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 30"
                                        opacity="0.29"
                                        d="M151.8 225.7C154.23 225.7 156.2 223.73 156.2 221.3C156.2 218.87 154.23 216.9 151.8 216.9C149.37 216.9 147.4 218.87 147.4 221.3C147.4 223.73 149.37 225.7 151.8 225.7Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 29"
                                        opacity="0.29"
                                        d="M172.4 203.9C174.167 203.9 175.6 202.467 175.6 200.7C175.6 198.933 174.167 197.5 172.4 197.5C170.633 197.5 169.2 198.933 169.2 200.7C169.2 202.467 170.633 203.9 172.4 203.9Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 28"
                                        opacity="0.29"
                                        d="M130.5 170.3C131.715 170.3 132.7 169.315 132.7 168.1C132.7 166.885 131.715 165.9 130.5 165.9C129.285 165.9 128.3 166.885 128.3 168.1C128.3 169.315 129.285 170.3 130.5 170.3Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 27"
                                        opacity="0.29"
                                        d="M142.7 146.1C143.252 146.1 143.7 145.652 143.7 145.1C143.7 144.548 143.252 144.1 142.7 144.1C142.148 144.1 141.7 144.548 141.7 145.1C141.7 145.652 142.148 146.1 142.7 146.1Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 26"
                                        opacity="0.29"
                                        d="M188.4 154.1C190.167 154.1 191.6 152.667 191.6 150.9C191.6 149.133 190.167 147.7 188.4 147.7C186.633 147.7 185.2 149.133 185.2 150.9C185.2 152.667 186.633 154.1 188.4 154.1Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 11"
                                        opacity="0.29"
                                        d="M161.7 114C163.964 114 165.8 112.164 165.8 109.9C165.8 107.636 163.964 105.8 161.7 105.8C159.436 105.8 157.6 107.636 157.6 109.9C157.6 112.164 159.436 114 161.7 114Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 10"
                                        opacity="0.29"
                                        d="M237.4 131.2C239.664 131.2 241.5 129.364 241.5 127.1C241.5 124.836 239.664 123 237.4 123C235.136 123 233.3 124.836 233.3 127.1C233.3 129.364 235.136 131.2 237.4 131.2Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 9"
                                        opacity="0.29"
                                        d="M212.7 92.3C215.958 92.3 218.6 89.6585 218.6 86.4C218.6 83.1415 215.958 80.5 212.7 80.5C209.442 80.5 206.8 83.1415 206.8 86.4C206.8 89.6585 209.442 92.3 212.7 92.3Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 8"
                                        opacity="0.29"
                                        d="M269.4 183.6C272.659 183.6 275.3 180.958 275.3 177.7C275.3 174.442 272.659 171.8 269.4 171.8C266.142 171.8 263.5 174.442 263.5 177.7C263.5 180.958 266.142 183.6 269.4 183.6Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 7"
                                        opacity="0.29"
                                        d="M291 148.7C293.651 148.7 295.8 146.551 295.8 143.9C295.8 141.249 293.651 139.1 291 139.1C288.349 139.1 286.2 141.249 286.2 143.9C286.2 146.551 288.349 148.7 291 148.7Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 6"
                                        opacity="0.29"
                                        d="M207.2 242.9C209.188 242.9 210.8 241.288 210.8 239.3C210.8 237.312 209.188 235.7 207.2 235.7C205.212 235.7 203.6 237.312 203.6 239.3C203.6 241.288 205.212 242.9 207.2 242.9Z"
                                        fill="#E41B64"
                                    />
                                    <path
                                        id="XMLID 202"
                                        opacity="0.29"
                                        d="M252.7 228.5C253.694 228.5 254.5 227.694 254.5 226.7C254.5 225.706 253.694 224.9 252.7 224.9C251.706 224.9 250.9 225.706 250.9 226.7C250.9 227.694 251.706 228.5 252.7 228.5Z"
                                        fill="#E41B64"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginSocialSuccess: (userInfo) => dispatch(actions.userLoginSocialSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
