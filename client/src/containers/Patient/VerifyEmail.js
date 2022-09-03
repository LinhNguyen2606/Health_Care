import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/patientService';
import HomeHeader from '../HomePage/HomeHeader';
import ConfirmEmail from '../../assets/images/confirm-email.png';
import './VerifyEmail.scss';

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ? (
                        <div>
                            <FormattedMessage id="patient.verify-email.loading-data" />
                        </div>
                    ) : (
                        <div>
                            {+errCode === 0 ? (
                                <div className="verify-email">
                                    <img src={ConfirmEmail} alt="confirm-email" />
                                    <div className="text-success">
                                        <span className="text-verify-success">
                                            <FormattedMessage id="patient.verify-email.verify-success" />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="verify-email">
                                    <img src={ConfirmEmail} alt="confirm-email" />
                                    <div className="text-failed">
                                        <span className="text-verify-failed">
                                            <FormattedMessage id="patient.verify-email.verify-failed" />
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default connect()(DefaultClass);
