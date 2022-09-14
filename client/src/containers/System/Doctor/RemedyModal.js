import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };

    render() {
        let { isOpenModal, closeRemedyModal } = this.props;
        return (
            <Modal isOpen={isOpenModal} className="booking-modal-container" size="md" centered>
                <div className="modal-header">
                    <h5 className="modal-title">
                        <FormattedMessage id="menu.doctor.modal-title" />
                    </h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="menu.doctor.email-patient" />
                            </label>
                            <input
                                type="email"
                                value={this.state.email}
                                className="form-control"
                                onChange={(e) => this.handleOnChangeEmail(e)}
                            />
                        </div>
                        <div className="col-6 form-group mt-1">
                            <label>
                                <FormattedMessage id="menu.doctor.medicine-file" />
                            </label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={(e) => this.handleOnChangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        <FormattedMessage id="menu.doctor.btn-send" />
                    </Button>
                    <Button color="danger" onClick={closeRemedyModal}>
                        <FormattedMessage id="menu.doctor.btn-cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
