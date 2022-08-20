import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleSaveContentMarkDown = () => {
        console.log('Check state: ', this.state);
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
                        <Select value={this.state.selectedOption} onChange={this.handleChange} options={options} />
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
