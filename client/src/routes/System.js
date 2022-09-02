import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin/UserManage';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import { path } from '../utils';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn, user } = this.props;
        return (
            <>
                <div className="system-container">
                    <div className="system-list">
                        {isLoggedIn && <Header />}
                        {user?.userInfo?.roleId === 'R1' ? (
                            <Switch>
                                <Route path={path.USER_MANAGE} component={UserManage} />
                                <Route path={path.MANAGE_DOCTOR} component={ManageDoctor} />
                                <Route
                                    component={() => {
                                        return <Redirect to={systemMenuPath} />;
                                    }}
                                />
                            </Switch>
                        ) : (
                            <Redirect to="*" />
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
