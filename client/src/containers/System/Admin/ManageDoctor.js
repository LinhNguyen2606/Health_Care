import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.forEach((item, index) => {
                let object = {};
                object.label = item.fullname;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleSaveContentMarkDown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        });
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value,
        });
    };
    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >
                            sdasd
                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button className="btn btn-warning my-4" onClick={() => this.handleSaveContentMarkDown()}>
                    Lưu thông tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
