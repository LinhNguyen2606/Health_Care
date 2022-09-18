import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Topbar.scss';
import { Link } from 'react-router-dom';

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div className="topbarContainer">
                    <div className="topbarLeft">
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <span className="logo"></span>
                        </Link>
                    </div>
                    <div className="topbarRight">
                        <div className="topbarIcons">
                            <img className="topbarImg" src={this.props.currentUser?.userInfo?.image} alt="" />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
