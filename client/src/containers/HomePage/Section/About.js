import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <section className="sec-for-doctors">
                    <div className="d-flex flex-row mx-auto main-for-doctors">
                        <div className="d-flex flex-column col-5">
                            <h1 className="mt-4">For doctors</h1>
                            <span className="mt-3 mb-1">Build credibility and brand online</span>
                            <span>Increase the number of patients and manage effectively</span>
                            {/* <Link to="/messenger" className="mt-5 pd-3 contact-admin text-decoration-none">
                                CONTACT COOPERATION
                            </Link> */}
                        </div>
                        <div className="col-7 d-flex justify-content-end" style={{ paddingTop: '5px' }}>
                            <iframe
                                width="500"
                                height="310"
                                src="https://www.youtube.com/embed/eecnhzWvK2E"
                                title="❤️Sức Khỏe Là Vàng - Điều Quan Trọng Nhất❤️"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
