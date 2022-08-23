import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageForApp(language);
    };

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }

            if (role === USER_ROLE.PATIENT) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu,
        });
    }

    render() {
        const { processLogout, language, userInfo, user } = this.props;
        return (
            <div className="header-container">
                {user?.userInfo?.roleId === 'R3' ? (
                    <>
                        {/* nút logout */}
                        <Link to="/home">
                            <div className="btn btn-logout" onClick={processLogout} title="Log out">
                                <i className="fas fa-sign-out-alt" style={{ marginLeft: '106rem ' }}></i>
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        {user?.userInfo?.roleId === 'R2' ? (
                            <>
                                {/* thanh navigator */}
                                <div className="header-tabs-container">
                                    <Navigator menus={this.state.menuApp} />
                                </div>
                                <div className="languages" style={{ marginLeft: '25rem' }}>
                                    <span className="welcome">
                                        <FormattedMessage id="homeheader.welcome" />
                                        {userInfo && userInfo.fullname ? userInfo.fullname : ''} !
                                    </span>
                                    <span
                                        className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                                    >
                                        VN
                                    </span>
                                    <span
                                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                                    >
                                        EN
                                    </span>
                                </div>

                                {/* nút logout */}
                                <Link to="/login">
                                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* thanh navigator */}
                                <div className="header-tabs-container">
                                    <Navigator menus={this.state.menuApp} />
                                </div>

                                <div className="languages">
                                    <span className="welcome">
                                        <FormattedMessage id="homeheader.welcome" />
                                        {userInfo && userInfo.fullname ? userInfo.fullname : ''} !
                                    </span>
                                    <span
                                        className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                                    >
                                        VN
                                    </span>
                                    <span
                                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                                    >
                                        EN
                                    </span>
                                </div>

                                {/* nút logout */}
                                <Link to="/login">
                                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </Link>
                            </>
                        )}
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageForApp: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
