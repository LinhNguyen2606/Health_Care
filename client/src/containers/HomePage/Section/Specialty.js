import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllSpecialties } from '../../../services/specialtyService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialties();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });
        }
    }

    render() {
        let { dataSpecialty } = this.state;
        let { language } = this.props;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.specialty-popular" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                dataSpecialty.map((item) => {
                                    return (
                                        <div className="section-customize" key={item.id}>
                                            <div
                                                className="bg-image section-specialty"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            />
                                            <div className="text-section">
                                                {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
