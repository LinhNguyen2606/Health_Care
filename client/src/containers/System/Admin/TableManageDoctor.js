import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageDoctor.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import ReactPaginate from 'react-paginate';

class TableManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getDoctors: [],
            pageNumber: 0,
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

    changePage = ({ selected }) => {
        this.setState({ pageNumber: selected });
    };

    render() {
        const arrDoctors = this.state.getDoctors;
        let doctorsPerPage = 10;
        let pagesVisited = this.state?.pageNumber * doctorsPerPage;
        let pageCount = Math.ceil(arrDoctors.length / doctorsPerPage);
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
                            arrDoctors.slice(pagesVisited, pagesVisited + doctorsPerPage).map((item) => {
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
