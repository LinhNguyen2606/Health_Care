import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import TableManageSpecialty from './TableManageSpecialty';
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
            descriptionHTML: '',
            descriptionMarkdown: '',
            imageBase64: '',

            action: '',
            specialtyEditId: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            this.setState({
                nameVi: '',
                nameEn: '',
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

    handleSaveNewSpecialty = () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createSpecialty({
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                imageBase64: this.state.imageBase64,
            });
        } else if (action === CRUD_ACTIONS.EDIT) {
            this.props.editSpecialty({
                id: this.state.specialtyEditId,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
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

    handleEditSpecialty = (specialty) => {
        this.setState({
            specialtyEditId: specialty.id,
            nameVi: specialty.nameVi,
            nameEn: specialty.nameEn,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            imageBase64: specialty.image,
            previewImgURL: specialty.image,
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
            <div className="manage-specialty-container">
                <div className="ms-title">
                    <FormattedMessage id="manage-specialty.title" />
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="manage-specialty.specialty-name-vi" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameVi}
                            onChange={(e) => this.handleOnChangeInput(e, 'nameVi')}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="manage-specialty.specialty-name-en" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameEn}
                            onChange={(e) => this.handleOnChangeInput(e, 'nameEn')}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="manage-specialty.specialty-img" />
                        </label>
                        <div className="preview-img-container">
                            <input
                                style={{ marginTop: '5px' }}
                                id="previewImg"
                                type="file"
                                hidden
                                className="form-control-file"
                                onChange={(e) => this.handleOnChangeImage(e)}
                            />
                            <label className="label-upload" htmlFor="previewImg">
                                <FormattedMessage id="manage-specialty.upload-img" />
                                <i className="fa-solid fa-upload"></i>
                            </label>
                            <div
                                className="preview-image"
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
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
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage id="manage-specialty.edit" />
                            ) : (
                                <FormattedMessage id="manage-specialty.save" />
                            )}
                        </button>
                    </div>
                    <span className="table-specialty">Table Manage Specialty</span>
                    <div className="col-12 mb-5">
                        <TableManageSpecialty
                            handleEditSpecialtyFromParentKey={this.handleEditSpecialty}
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
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createSpecialty: (data) => dispatch(actions.createSpecialty(data)),
        editSpecialty: (data) => dispatch(actions.editSpecialty(data)),
        fetchAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
