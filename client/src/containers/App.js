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
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from '../containers/HomePage/HomePage';

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
                        {this.props.isLoggedIn && <Header />}
                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={Home} />
                                <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                                <Route path={path.ACTIVE_EMAIL} component={ActivationEmail} exact />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.CONFIRM_EMAIL} component={NotificationEmail} exact />
                            </Switch>
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
