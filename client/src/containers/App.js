import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils';
import ActivationEmail from '../containers/Auth/ActivationEmail';
import NotificationEmail from './Auth/NotificationEmail';
import Home from '../routes/Home';
import Register from './Auth/Register';
import Login from './Auth/Login';
import System from '../routes/System';
import HomePage from '../containers/HomePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import NotFound from '../containers/NotFound';
import HomePageManage from '../containers/System/HomePageManage';
import DetailDoctor from '../containers/Patient/Doctor/DetailDoctor';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import Doctor from '../routes/Doctor';
import VerifyEmail from './Patient/VerifyEmail';
import Messenger from '../containers/messenger/Messenger';
import VideoCall from './VideoCall';
import ChangePassword from './Auth/ChangePassword';
import ResetPassword from './Auth/ResetPassword';

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        const { user } = this.props;
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                                    <Route path={path.ACTIVE_EMAIL} component={ActivationEmail} exact />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.CHANGE_PASSWORD} component={ChangePassword} />
                                    <Route path={path.RESET_PASSWORD} component={ResetPassword} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.CONFIRM_EMAIL} component={NotificationEmail} exact />
                                    <Route path={path.HOMEPAGEMANAGE} component={HomePageManage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_ClINIC} component={DetailClinic} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    <Route path={path.MESSENGER}>
                                        {!user?.userInfo?.roleId === 'R3' ? <Redirect to="/:id" /> : <Messenger />}
                                    </Route>
                                    <Route path={path.VIDEO_CALL} component={VideoCall} />
                                    <Route path={path.PAGE_NOT_FOUND} component={NotFound} />
                                </Switch>
                            </CustomScrollbars>
                        </span>

                        <ToastContainer
                            style={{ fontSize: '14px' }}
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
