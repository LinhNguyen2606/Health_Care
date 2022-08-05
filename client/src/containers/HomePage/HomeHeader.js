import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {
    render() {
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa-solid fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>Chuyên khoa</b>
                                </div>
                                <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>Cơ sở y tế</b>
                                </div>
                                <div className="sub-title">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>Bác sĩ </b>
                                </div>
                                <div className="sub-title">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>Gói khám</b>
                                </div>
                                <div className="sub-title">Khám sức khoẻ tổng quát</div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fa-solid fa-circle-question"></i>
                            </div>
                            <div className="flag">VN</div>
                            <div className="flag">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="first-title">NỀN TẢNG Y TẾ</div>
                        <div className="second-title">CHĂM SÓC SỨC KHOẺ TOÀN DIỆN</div>
                        <div className="search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
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
                                <div className="text-child">Bệnh viện uy tín</div>
                            </div>
                            <div className="option-child">
                                <div className="border-child">
                                    <div className="icon-child">
                                        <i className="fa fa-thumbs-up" style={{ color: '#004fff' }}></i>
                                    </div>
                                </div>
                                <div className="text-child">Phòng khám tốt</div>
                            </div>
                            <div className="option-child">
                                <div className="border-child">
                                    <div className="icon-child">
                                        <i className="fa fa-user-md" style={{ color: '#40b895' }}></i>
                                    </div>
                                </div>
                                <div className="text-child">Bác sĩ ưu tú</div>
                            </div>
                            <div className="option-child">
                                <div className="border-child">
                                    <div className="icon-child">
                                        <i className="fa-solid fa-clock" style={{ color: 'red' }}></i>
                                    </div>
                                </div>
                                <div className="text-child">Ưu tiên kiểm tra</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
