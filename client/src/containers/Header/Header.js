import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageForApp(language);
    };

    render() {
        const { processLogout, language, userInfo, user } = this.props;
        return (
            <div className="header-container">
                {user?.userInfo?.roleId === 'R3' ? (
                    <>
                        {/* nút logout */}
                        <Link to="/home">
                            <div className="btn btn-logout" onClick={processLogout} title="Log out">
                                <i className="fas fa-sign-out-alt" style={{ marginLeft: '104rem ' }}></i>
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        {/* thanh navigator */}
                        <div className="header-tabs-container">
                            <Navigator menus={adminMenu} />
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
