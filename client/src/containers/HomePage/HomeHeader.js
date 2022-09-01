import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import vnFlag from '../../assets/images/vn-flag.png';
import enFlag from '../../assets/images/en-flag.png';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { Link } from 'react-router-dom';
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageForApp(language);
    };

    render() {
        const language = this.props.language;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa-solid fa-bars"></i>
                            <Link to="/home">
                                <div className="header-logo"></div>
                            </Link>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeheader.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fa-solid fa-circle-question"></i>
                                <span>
                                    <FormattedMessage id="homeheader.support" />
                                </span>
                            </div>
                            <div className="flag">
                                <img src={vnFlag} alt="vn-flag" />
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                </div>
                            </div>
                            <div className="flag">
                                <img src={enFlag} alt="en-flag" />
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="first-title">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="second-title">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input
                                    type="text"
                                    placeholder={
                                        language === LANGUAGES.VI
                                            ? 'Tìm chuyên khoa khám bệnh'
                                            : 'Find a medical specialty'
                                    }
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="border-child">
                                        <div className="icon-child">
                                            <i className="fa fa-check" style={{ color: 'green' }}></i>
                                        </div>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="border-child">
                                        <div className="icon-child">
                                            <i className="fa fa-thumbs-up" style={{ color: '#004fff' }}></i>
                                        </div>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="border-child">
                                        <div className="icon-child">
                                            <i className="fa fa-user-md" style={{ color: '#40b895' }}></i>
                                        </div>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="border-child">
                                        <div className="icon-child">
                                            <i className="fa-solid fa-clock" style={{ color: 'red' }}></i>
                                        </div>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
        changeLanguageForApp: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
