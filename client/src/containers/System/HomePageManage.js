import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePageManage.scss';
import Header from '../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
class HomePageManage extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="img">
                    <div className="text-1">
                        <FormattedMessage id="homepage-manage.text1" />
                    </div>
                    <div className="text-2">
                        <FormattedMessage id="homepage-manage.text2" />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageManage);
