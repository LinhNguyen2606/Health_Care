import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getAllPatientsForDoctor, postSendRemedy } from '../../../services/doctorService';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientsForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] }, async () => {
            await this.getDataPatient();
        });
    };

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.fullname,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success('Send Remedy succeeds');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error('Opp! Something went wrong!');
            console.log('Error send remedy', res);
        }
    };

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            <FormattedMessage id="menu.doctor.manage-patient" />
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>
                                    <FormattedMessage id="menu.doctor.choose-day" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12">
                                <table id="TableManagePatient">
                                    <tbody>
                                        <tr>
                                            <th>
                                                <FormattedMessage id="menu.doctor.numerical-order" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="menu.doctor.time" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="menu.doctor.full-name" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="menu.doctor.address" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="menu.doctor.gender" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="menu.doctor.phone-number" />
                                            </th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item.timeTypeDataPatient.valueVi
                                                        : item.timeTypeDataPatient.valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData.genderData.valueVi
                                                        : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.fullname}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.patientData.phoneNumber}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-success mr-3"
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                <FormattedMessage id="menu.doctor.btn-confirm" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="12">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
