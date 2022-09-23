import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import vnFlag from '../../assets/images/vn-flag.png';
import enFlag from '../../assets/images/en-flag.png';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions';
import Card from 'react-bootstrap/Card';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredData: [],
            wordEntered: '',
            value: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialties();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            this.setState({
                getSpecialties: this.props.allSpecialties,
            });
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageForApp(language);
    };

    handleFilter = (e) => {
        const searchWord = e.target.value;
        this.setState({ wordEntered: searchWord });
        const newFilter = this.props.allSpecialties.filter((value) => {
            return value.nameVi.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === '') {
            this.setState({ filteredData: [] });
        } else {
            this.setState({ filteredData: newFilter });
        }
    };

    render() {
        const language = this.props.language;
        const { wordEntered, filteredData } = this.state;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <Link to="/login">
                                <i className="fa-solid fa-bars"></i>
                            </Link>
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
                            {/* <div className="support">
                                <i className="fa-solid fa-circle-question"></i>
                                <span>
                                    <FormattedMessage id="homeheader.support" />
                                </span>
                            </div> */}
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
                                    value={wordEntered}
                                    onChange={(e) => this.handleFilter(e)}
                                    placeholder={
                                        language === LANGUAGES.VI
                                            ? 'Tìm chuyên khoa khám bệnh'
                                            : 'Find a medical specialty'
                                    }
                                />
                            </div>
                            {filteredData.length !== 0 && (
                                <div>
                                    {filteredData.slice(0, 15).map((value) => {
                                        return (
                                            <div key={value.id} className="border-search-container">
                                                <Link to={`/detail-specialty/${value.id}`}>
                                                    <div className="border-search">
                                                        <Card.Img
                                                            variant="top"
                                                            style={{
                                                                borderRadius: '50%',
                                                                width: '3rem',
                                                                height: '3rem',
                                                                margin: '0 0 -20px 0',
                                                            }}
                                                            src={value.image}
                                                        />
                                                        <div
                                                            style={{
                                                                color: 'black',
                                                                position: 'relative',
                                                                left: 65,
                                                                top: '-10px',
                                                            }}
                                                        >
                                                            {language === LANGUAGES.VI ? value.nameVi : value.nameEn}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
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
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageForApp: (language) => dispatch(changeLanguageApp(language)),
        fetchAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
