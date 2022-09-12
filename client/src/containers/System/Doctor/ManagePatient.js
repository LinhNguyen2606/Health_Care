import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
// import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
        }
    }

    // handleOnChangeDatePicker = (date) => {
    //     this.setState({ currentDate: date[0] }, async () => {
    //         await this.getDataPatient();
    //     });
    // };

    render() {
        return (
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
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                                <tr>
                                    <th>asdasd</th>
                                    <th>asdasd</th>
                                    <th>asdasd</th>
                                    <th>asdasd</th>
                                </tr>
                            </tbody>
                        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
