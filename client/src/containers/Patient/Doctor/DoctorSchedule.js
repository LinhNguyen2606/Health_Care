import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/doctorService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        };
    }

    componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = async (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        let res = await getScheduleDoctorByDate(60, 1661446800000);
        console.log('Check res :', res);

        this.setState({
            allDays: allDays,
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromDetailDoctor && this.props.doctorIdFromDetailDoctor !== -1) {
            let doctorId = this.props.doctorIdFromDetailDoctor;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : [],
                });
            }
        }
    };
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(e) => this.handleOnChangeSelect(e)}>
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>Lịch khám</span>
                    </div>
                    <div className="time-content">
                        <div className="time-content-btns">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                allAvailableTime.map((item) => {
                                    let timeDisplay =
                                        language === LANGUAGES.VI
                                            ? item.timeTypeData.valueVi
                                            : item.timeTypeData.valueEn;
                                    return (
                                        <button
                                            key={item.id}
                                            className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                        >
                                            {timeDisplay}
                                        </button>
                                    );
                                })
                            ) : (
                                <div>Bác sĩ không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
