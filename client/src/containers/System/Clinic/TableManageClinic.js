import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';

class TableManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getClinics: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllClinics();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allClinics !== this.props.allClinics) {
            this.setState({
                getClinics: this.props.allClinics,
            });
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinic(clinic.id);
    };

    handleEditClinic = (clinic) => {
        this.props.handleEditClinicFromParentKey(clinic);
    };

    render() {
        let { getClinics } = this.state;
        let { language } = this.props;
        return (
            <>
                <table id="TableManageClinic">
                    <tbody>
                        <tr>
                            <th>Name clinic</th>
                            <th>Address clinic</th>
                            <th>Actions</th>
                        </tr>
                        {getClinics &&
                            getClinics.length > 0 &&
                            getClinics.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-warning mx-3"
                                                onClick={() => this.handleEditClinic(item)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => this.handleDeleteClinic(item)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allClinics: state.admin.allClinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllClinics: () => dispatch(actions.fetchAllClinics()),
        deleteClinic: (id) => dispatch(actions.deleteClinic(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
