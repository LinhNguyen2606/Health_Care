import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePageManage.scss';
import Header from '../../containers/Header/Header';
class HomePageManage extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="img">
                    <div className="text-1">Welcome to the Health Care Center</div>
                    <div className="text-2">The best choices for you and your family</div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageManage);
