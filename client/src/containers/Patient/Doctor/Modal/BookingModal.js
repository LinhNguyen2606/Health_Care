import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { LANGUAGES } from '../../../../utils';
import { isEmail, validatePhoneNumber } from '../../../../utils/validation/Validation';
import { postPatientBookAppointment } from '../../../../services/patientService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            errMessage: '',
        };
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            // eslint-disable-next-line
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let doctorId = this.props.dataTime && !_.isEmpty(this.props.dataTime) ? this.props.dataTime.doctorId : '';
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorId: doctorId,
                timeType: timeType,
            });
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({ ...stateCopy });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`;
        }
        return ``;
    };

    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.doctorData.fullname}`;
            return name;
        }
        return ``;
    };

    handleConfirmBooking = async () => {
        this.setState({
            errMessage: '',
        });
        if (!isEmail(this.state.email)) {
            this.setState({
                fullname: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                birthday: this.state.birthday,
                selectedGender: this.state.selectedGender,
                errMessage: 'Invalid email.',
            });
        }

        if (!validatePhoneNumber(this.state.phoneNumber)) {
            this.setState({
                fullname: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                birthday: this.state.birthday,
                selectedGender: this.state.selectedGender,
                errMessage: 'Invalid phone number.',
            });
        }

        //convert string to timestamp unix
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully!');
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
            });
            this.props.closeModalBooking();
        } else {
            toast.error('Booking a new appointment error !');
        }
    };

    render() {
        let { isOpenModal, closeModalBooking, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right" onClick={closeModalBooking}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input
                                    className="form-control"
                                    type="tel"
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={this.state.addreemailss}
                                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
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
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn btn-info" onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button className="btn btn-danger" onClick={closeModalBooking}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
