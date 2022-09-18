import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './NotFound.scss';
import Header from '../containers/Header/Header';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <Fragment>
                {isLoggedIn && <Header />}
                <div className="not-found-container">
                    <h1>404 Error Page</h1>
                    <section class="error-container">
                        <span class="four">
                            <span class="screen-reader-text">4</span>
                        </span>
                        <span class="zero">
                            <span class="screen-reader-text">0</span>
                        </span>
                        <span class="four">
                            <span class="screen-reader-text">4</span>
                        </span>
                    </section>
                    <div class="link-container">
                        <Link
                            to="/home"
                            target="_blank"
                            href="https://www.silocreativo.com/en/creative-examples-404-error-css/"
                            class="more-link"
                        >
                            Back to the home page
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
