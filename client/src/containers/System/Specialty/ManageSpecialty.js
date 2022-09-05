import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { saveSpecialtyService } from '../../../services/specialtyService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameVi: '',
            nameEn: '',
            selectedOption: '',
            listSpecialties: [],
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
            isOpen: false,
            hasOldData: false,
        };
    }

    // componentDidMount() {
    //     this.props.fetchAllSpecialties();
    // }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            // eslint-disable-next-line
            inputData.map((item) => {
                let object = {};
                let labelVi = `${item.nameVi}`;
                let labelEn = `${item.nameEn}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            let dataSelect = this.buildDataInputSelect(this.props.allSpecialties);
            this.setState({
                listSpecialties: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allSpecialties);
            this.setState({
                listSpecialties: dataSelect,
            });
        }
    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({ ...stateCopy });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

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

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    handleSaveNewSpecialty = async () => {
        // let { hasOldData } = this.state;
        // this.props.saveSpecialty({
        //     nameVi: this.state.nameVi,
        //     nameEn: this.state.nameEn,
        //     imageBase64: this.state.imageBase64,
        //     descriptionHTML: this.state.descriptionHTML,
        //     descriptionMarkdown: this.state.descriptionMarkdown,
        //     // specialtyId: this.state.
        // });
        let res = await saveSpecialtyService(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed');
            this.setState({
                nameVi: '',
                nameEn: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
            });
        } else {
            toast.error('Something wrong...');
            console.log('Check res: ', res);
        }
    };

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">
                    <FormattedMessage id="manage-specialty.title" />
                </div>
                <div className="row">
                    {/* <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="manage-specialty.select-specialty" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listSpecialties}
                            placeholder={<FormattedMessage id="manage-specialty.select-specialty" />}
                        />
                    </div> */}
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
                                id="previewImg"
                                style={{ marginTop: '5px' }}
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
                            className="btn btn-warning"
                            style={{ textTransform: 'capitalize' }}
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            <FormattedMessage id="manage-specialty.save" />
                        </button>
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
        saveSpecialty: (data) => dispatch(actions.saveSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
