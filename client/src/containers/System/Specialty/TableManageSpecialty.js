import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getSpecialties: [],
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

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialty(specialty.id);
    };

    handleEditSpecialty = (specialty) => {
        this.props.handleEditSpecialtyFromParentKey(specialty);
    };

    render() {
        let { getSpecialties } = this.state;
        let { language } = this.props;
        return (
            <>
                <table id="TableManageSpecialty">
                    <tbody>
                        <tr>
                            <th>Specialty</th>
                            <th>Actions</th>
                        </tr>
                        {getSpecialties &&
                            getSpecialties.length > 0 &&
                            getSpecialties.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-warning mx-3"
                                                onClick={() => this.handleEditSpecialty(item)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => this.handleDeleteSpecialty(item)}
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
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);