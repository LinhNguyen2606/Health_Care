import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class UserManage extends Component {
    render() {
        return (
            <>
                <div className="title">User Management</div>
                <Link to="/crud">
                    <button className="btn btn-primary mx-4">
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </Link>
            </>
        );
    }
}

export default UserManage;
