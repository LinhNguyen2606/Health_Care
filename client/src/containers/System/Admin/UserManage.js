import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserManage.scss';
import { toast } from 'react-toastify';
import { isEmpty, isEmail, isLength } from '../../../utils/validation/Validation';
import TableManageUser from './TableManageUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            errMessage: '',

            email: '',
            password: '',
            fullname: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gender !== this.props.gender) {
            const arrGenders = this.props.gender;
            this.setState({
                genderArr: this.props.gender,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            });
        }
        if (prevProps.position !== this.props.position) {
            const arrPositions = this.props.position;
            this.setState({
                positionArr: this.props.position,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            });
        }
        if (prevProps.role !== this.props.role) {
            const arrRoles = this.props.role;
            this.setState({
                roleArr: this.props.role,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                fullname: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            });
        }
    }

    handleOnChangeImage = (e) => {
        const data = e.target.files;
        const file = data[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        const isValid = this.checkValidateInput();
        if (isValid === false) return;
        if (isEmpty(this.state.fullname) || isEmpty(this.state.password)) {
            this.setState({
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                image: this.state.avatar,
                errMessage: 'Please fill in all fields.',
            });
            return;
        }

        if (!isEmail(this.state.email)) {
            this.setState({
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                image: this.state.avatar,
                errMessage: 'Invalid emails.',
            });
            return;
        }

        if (isLength(this.state.password)) {
            this.setState({
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                image: this.state.avatar,
                errMessage: 'Password must be at least 6 characters.',
            });
            return;
        }
        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
        });

        this.props.fetchUser();
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'fullname', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error(`This input is required ${arrCheck[i]}`);
                break;
            }
        }
        return isValid;
    };

    onChangeInput = (e, id) => {
        const copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    render() {
        const genders = this.state.genderArr;
        const roles = this.state.roleArr;
        const positions = this.state.positionArr;
        const language = this.props.language;
        const isGetGenders = this.props.isLoadingGender;
        const isGetPositions = this.props.isLoadingPosition;
        const isGetRoles = this.props.isLoadingRole;
        const { email, password, fullname, phoneNumber, address, gender, position, role } = this.state;
        return (
            <>
                <div className="user-container">
                    <div className="title">User Management</div>
                    <div className="user-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 my-3 text-add">
                                    <FormattedMessage id="manage-user.add" />
                                </div>
                                <div className="col-12">{isGetGenders === true ? 'Loading genders' : ''}</div>
                                <div className="col-12">{isGetPositions === true ? 'Loading positions' : ''}</div>
                                <div className="col-12">{isGetRoles === true ? 'Loading roles' : ''}</div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={email}
                                        onChange={(e) => this.onChangeInput(e, 'email')}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        value={password}
                                        onChange={(e) => this.onChangeInput(e, 'password')}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.full-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => this.onChangeInput(e, 'fullname')}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.phone-number" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-9">
                                    <label>
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={address}
                                        onChange={(e) => this.onChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select className="form-control" onChange={(e) => this.onChangeInput(e, 'gender')}>
                                        {genders &&
                                            genders.length > 0 &&
                                            genders.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.position" />
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'position')}
                                    >
                                        {positions &&
                                            positions.length > 0 &&
                                            positions.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.role" />
                                    </label>
                                    <select className="form-control" onChange={(e) => this.onChangeInput(e, 'role')}>
                                        {roles &&
                                            roles.length > 0 &&
                                            roles.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.image" />
                                    </label>
                                    <div className="preview-img-container">
                                        <input
                                            id="previewImg"
                                            type="file"
                                            hidden
                                            onChange={(e) => this.handleOnChangeImage(e)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">
                                            Tải ảnh <i className="fa-solid fa-upload"></i>
                                        </label>
                                        <div
                                            className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    className="col-12"
                                    style={{
                                        color: 'red',
                                        fontSize: '14px',
                                    }}
                                >
                                    {this.state.errMessage}
                                </div>
                                <div className="col-12 my-3">
                                    <button className="btn btn-primary" onClick={() => this.handleSaveUser()}>
                                        <FormattedMessage id="manage-user.save" />
                                    </button>
                                </div>
                                <div className="col-12 mb-5">
                                    <TableManageUser />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
        position: state.admin.positions,
        role: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUser: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
