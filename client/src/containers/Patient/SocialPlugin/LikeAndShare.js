import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { language } = this.props;
        let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.5', // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    componentDidMount() {
        this.initFacebookSDK();
    }

    render() {
        let { dataHref } = this.props;
        const share = `https://www.facebook.com/profile.php?id=${process.env.REACT_APP_FACEBOOK_PAGE_ID}`;
        const appId = process.env.REACT_APP_FACEBOOK_APP_ID;
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <div
                        className="fb-like"
                        data-href={dataHref}
                        data-width=""
                        data-layout="button_count"
                        data-action="like"
                        data-size="large"
                    ></div>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?app_id=${appId}&sdk=joey&u=${share}&display=popup&ref=plugin&src=share_button`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="btn btn-primary" style={{ color: '#fff', padding: '3px 20px' }}>
                            Chia sẻ
                        </button>
                    </a>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
