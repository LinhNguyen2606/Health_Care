import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin/UserManage';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn, user } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {user?.userInfo?.roleId === 'R1' ? (
                            <Switch>
                                <Route path="/system/user-manage" component={UserManage} />
                                <Route path="/system/manage-doctor" component={ManageDoctor} />
                                <Route
                                    component={() => {
                                        return <Redirect to={systemMenuPath} />;
                                    }}
                                />
                            </Switch>
                        ) : (
                            <Redirect to="/404" />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
