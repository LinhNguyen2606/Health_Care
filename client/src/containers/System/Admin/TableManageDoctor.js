import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageDoctor.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';

class TableManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getDoctors: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                getDoctors: this.props.allDoctors,
            });
        }
    }

    handleDeleteDoctor = (doctor) => {
        this.props.deleteDoctor(doctor.id);
    };

    render() {
        const arrDoctors = this.state.getDoctors;
        return (
            <>
                <table id="TableManageDoctor">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Doctor name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrDoctors &&
                            arrDoctors.length > 0 &&
                            arrDoctors.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => this.handleDeleteDoctor(item)}
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
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        deleteDoctor: (id) => dispatch(actions.deleteDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDoctor);
