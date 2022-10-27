import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';
import ReactPaginate from 'react-paginate';

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getSpecialties: [],
            pageNumber: 0,
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

    changePage = ({ selected }) => {
        this.setState({ pageNumber: selected });
    };

    render() {
        let { getSpecialties } = this.state;
        let { language } = this.props;
        let specialtiesPerPage = 10;
        let pagesVisited = this.state?.pageNumber * specialtiesPerPage;
        let pageCount = Math.ceil(getSpecialties.length / specialtiesPerPage);
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
                            getSpecialties.slice(pagesVisited, pagesVisited + specialtiesPerPage).map((item) => {
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
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={this.changePage}
                    containerClassName={'paginationBttns'}
                    previousLinkClassName={'previousBttn'}
                    nextLinkClassName={'nextBttn'}
                    disabledClassName={'paginationDisabled'}
                    activeClassName={'paginationActive'}
                />
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
