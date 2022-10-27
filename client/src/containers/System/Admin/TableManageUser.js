import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import ReactPaginate from 'react-paginate';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getUsers: [],
            pageNumber: 0,
        };
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                getUsers: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUser(user.id);
    };

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    };

    changePage = ({ selected }) => {
        this.setState({ pageNumber: selected });
    };

    render() {
        let arrUsers = this.state.getUsers;
        let usersPerPage = 10;
        let pagesVisited = this.state?.pageNumber * usersPerPage;
        let pageCount = Math.ceil(arrUsers.length / usersPerPage);
        return (
            <>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers &&
                            arrUsers.length > 0 &&
                            arrUsers.slice(pagesVisited, pagesVisited + usersPerPage).map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-warning mx-3"
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => this.handleDeleteUser(item)}
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
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
