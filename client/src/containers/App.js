import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
import Doctor from '../routes/Doctor';
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
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.CONFIRM_EMAIL} component={NotificationEmail} exact />
                                    <Route path={path.PAGE_NOT_FOUND} component={NotFound} />
                                    <Route path={path.HOMEPAGEMANAGE} component={HomePageManage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
