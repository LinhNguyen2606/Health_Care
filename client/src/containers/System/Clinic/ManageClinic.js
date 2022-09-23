import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import TableManageClinic from './TableManageClinic';
import * as actions from '../../../store/actions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,

            nameVi: '',
            nameEn: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            imageBase64: '',

            action: '',
            clinicEditId: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allClinics !== this.props.allClinics) {
            this.setState({
                nameVi: '',
                nameEn: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            });
        }
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    handleSaveNewClinic = () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createClinic({
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                imageBase64: this.state.imageBase64,
            });
        } else if (action === CRUD_ACTIONS.EDIT) {
            this.props.editClinic({
                id: this.state.clinicEditId,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                imageBase64: this.state.imageBase64,
            });
        }
    };

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({ ...stateCopy });
    };

    handleEditClinic = (clinic) => {
        this.setState({
            clinicEditId: clinic.id,
            nameVi: clinic.nameVi,
            nameEn: clinic.nameEn,
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            imageBase64: clinic.image,
            previewImgURL: clinic.image,
            action: CRUD_ACTIONS.EDIT,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    render() {
        return (
            <div className="manage-clinic-container">
                <div className="ms-title">
                    <FormattedMessage id="manage-clinic.title" />
                </div>
                <div className="row">
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.name-vi" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameVi}
                            onChange={(e) => this.handleOnChangeInput(e, 'nameVi')}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.name-en" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameEn}
                            onChange={(e) => this.handleOnChangeInput(e, 'nameEn')}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.address-clinic" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-clinic.clinic-img" />
                        </label>
                        <div className="preview-img-container">
                            <input
                                id="previewImg"
                                style={{ marginTop: '5px' }}
                                type="file"
                                hidden
                                className="form-control-file"
                                onChange={(e) => this.handleOnChangeImage(e)}
                            />
                            <label className="label-upload" htmlFor="previewImg">
                                <FormattedMessage id="manage-clinic.upload-img" />
                                <i className="fa-solid fa-upload"></i>
                            </label>
                            <div
                                className="preview-image"
                                style={{
                                    backgroundImage: `url(${this.state.previewImgURL})`,
                                }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12 my-4">
                        <button
                            className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                            style={{ textTransform: 'capitalize' }}
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage id="manage-clinic.edit" />
                            ) : (
                                <FormattedMessage id="manage-clinic.save" />
                            )}
                        </button>
                    </div>
                    <span className="table-clinic">Table Manage Clinic</span>
                    <div className="col-12 mb-5">
                        <TableManageClinic
                            handleEditClinicFromParentKey={this.handleEditClinic}
                            action={this.state.action}
                        />
                    </div>
                </div>

                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allClinics: state.admin.allClinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createClinic: (data) => dispatch(actions.createClinic(data)),
        editClinic: (data) => dispatch(actions.editClinic(data)),
        fetchAllClinics: () => dispatch(actions.fetchAllClinics()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
