import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import moment from 'moment';
// eslint-disable-next-line
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

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            //startOf day giúp lấy đầu ngày, valueOf giúp convert miliseconds sang Unix Timestamp
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    };

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorIdFromDetailDoctor !== prevProps.doctorIdFromDetailDoctor) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromDetailDoctor, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : [],
            });
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
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item) => {
                                    return (
                                        <option key={item.id} value={item.value}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fa-solid fa-calendar-days"></i>
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                <>
                                    <div className="time-content-btns">
                                        {allAvailableTime.map((item) => {
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
                                        })}
                                    </div>

                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
