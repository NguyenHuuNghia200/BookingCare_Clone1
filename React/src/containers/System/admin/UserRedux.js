import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/UserService'
import { ChangelanguageApp } from '../../../store/actions/appActions';
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewimage: '',
            isOpen: false,

            isUserCreate: false,


            userEditid: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            position: '',
            gender: '',
            role: '',
            avatar: '',

            action: ''

        }
    }


    HandleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        var url = URL.createObjectURL(file)
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('check base64', base64)
            var url = URL.createObjectURL(file)
            this.setState({
                previewimage: url,
                avatar: base64
            })
        }
        console.log('file:', file, url)

    }


    async componentDidMount() {
        this.props.getGenDerStart()
        this.props.getPositionStart()
        this.props.getRoleStart()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.genderRedux != this.props.genderRedux) {
            let GenderArr = this.props.genderRedux

            this.setState({
                arrGender: GenderArr,
                gender: GenderArr && GenderArr.data.length > 0 ? GenderArr.data[0].key : ''
            })
        }

        if (prevProps.PositionRedux != this.props.PositionRedux) {
            let PositionArr = this.props.PositionRedux
            this.setState({
                arrPosition: PositionArr,
                position: PositionArr && PositionArr.data.length > 0 ? PositionArr.data[0].key : ''
            })
        }
        if (prevProps.RoleRedux != this.props.RoleRedux) {

            let roleArr = this.props.RoleRedux

            this.setState({
                arrRole: roleArr,
                role: roleArr && roleArr.data.length > 0 ? roleArr.data[0].key : ''
            })
        }
        if (prevProps.AllUser != this.props.AllUser) {
            let GenderArr = this.props.genderRedux
            let PositionArr = this.props.PositionRedux
            let roleArr = this.props.RoleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                position: '',
                gender: '',
                role: '',
                avatar: '',
                previewimage: '',
                action: CRUD_ACTIONS.ADD
            })
        }




    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()

        if (isValid === false) return
        let { action } = this.state
        if (action === CRUD_ACTIONS.ADD) {

            this.props.createNewUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                address: this.state.address,
                gender: this.state.gender,
                roleid: this.state.role,
                phonenumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {

            this.props.EditUser({
                id: this.state.userEditid,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                address: this.state.address,
                gender: this.state.gender,
                roleid: this.state.role,
                phonenumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        // setTimeout(() => {
        //     this.props.fetchAllUserRedux()
        // }, 1000);

    }

    openPreviewImage = () => {
        this.setState({
            isOpen: true
        })

    }

    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'position', 'role', 'gender', 'avatar']

        let isValid = true
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('missing param11:' + arrCheck[i])
                break;

            }
        }
        return {
            isValid
        }
    }
    onChangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value

        this.setState({
            ...copystate
        })
    }
    handleEditUserfromParent = (user) => {
        let imagebase64 = ''
        console.log('user iamge', user.image)
        if (user.image) {
            imagebase64 = new Buffer(user.image, 'base64').toString('binary');

        }
        console.log('`` ', imagebase64, '+')
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            position: user.positionId,
            gender: user.gender,
            role: user.roleid,
            avatar: '',
            previewimage: imagebase64,
            action: CRUD_ACTIONS.EDIT,
            avatar: imagebase64,
            userEditid: user.id
        })

    }
    render() {

        let isValid = true
        let arrGender = this.state.arrGender.data
        let arrPosition = this.state.arrPosition.data

        let arrRole = this.state.arrRole.data
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber, address, position, role, avatar, gender } = this.state

        console.log(arrGender, arrPosition, arrRole)
        console.log(gender, position, role)
        console.log(this.state)
        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>
                        User Redux
                    </div>

                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 mb-3'> <FormattedMessage id={"manage-user.add"} /></div>

                                <div className='col-12 mb-3'> {isLoadingGender === true ? 'loading gender' : ''}</div>

                                <div className="row">
                                    <div className="form-group col-3">
                                        <label htmlFor="inputEmail4"><FormattedMessage id={"manage-user.email"} /></label>
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                            value={email || ''}
                                            onChange={(event) => this.onChangeInput(event, 'email')} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="inputPassword4"><FormattedMessage id={"manage-user.password"} /></label>
                                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                            value={password || ''}
                                            onChange={(event) => this.onChangeInput(event, 'password')} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="inputPassword4"><FormattedMessage id={"manage-user.first-name"} /></label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="firstName"
                                            value={firstName || ''}
                                            onChange={(event) => this.onChangeInput(event, 'firstName')} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="inputPassword4"><FormattedMessage id={"manage-user.last-name"} /></label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="lastName"
                                            value={lastName || ''}
                                            onChange={(event) => this.onChangeInput(event, 'lastName')} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-3">
                                        <label htmlFor="inputEmail4"><FormattedMessage id={"manage-user.phone-number"} /></label>
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                            value={phoneNumber || ''}
                                            onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                                    </div>
                                    <div className="form-group col-9">
                                        <label htmlFor="inputPassword4"><FormattedMessage id={"manage-user.address"} /></label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="address"
                                            value={address}
                                            onChange={(event) => this.onChangeInput(event, 'address')} />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-3">
                                        <label htmlFor="inputState"><FormattedMessage id={"manage-user.gender"} /></label>
                                        <select id="inputState" className="form-control"
                                            value={gender || ''}
                                            onChange={(event) => this.onChangeInput(event, 'gender')}>

                                            {arrGender && arrGender.length > 0 &&
                                                arrGender.map((item, index) => {
                                                    return (
                                                        <option key={index}
                                                        >{language == LANGUAGES.VI ? item.valueVN : item.valueEn}</option>
                                                    )
                                                })
                                            }


                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="inputState"><FormattedMessage id={"manage-user.position"} /></label>
                                        <select id="inputState" className="form-control"
                                            value={position || ''}
                                            onChange={(event) => this.onChangeInput(event, 'position')}>
                                            {arrPosition && arrPosition.length > 0 &&
                                                arrPosition.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language == LANGUAGES.VI ? item.valueVN : item.valueEn}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="inputState"><FormattedMessage id={"manage-user.role"} /></label>
                                        <select id="inputState" className="form-control"
                                            value={role}
                                            onChange={(event) => this.onChangeInput(event, 'role')}>
                                            {arrRole && arrRole.length > 0 &&
                                                arrRole.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language == LANGUAGES.VI ? item.valueVN : item.valueEn}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="inputState"><FormattedMessage id={"manage-user.image"} /></label>
                                        <div className='preview-image-container'>
                                            <input id='previewImage' type='file' hidden

                                                onChange={(item) => this.HandleOnchangeImage(item)} />
                                            <label className='label-upload' htmlFor='previewImage'>tai anh<i className='fas fa-upload'></i></label>
                                            <div className='preview-image'
                                                style={{ backgroundImage: ` url(${this.state.previewimage})` }}
                                                onClick={() => this.openPreviewImage()}
                                                value={avatar || ''}
                                                onChange={(event) => this.onChangeInput(event, 'avatar')}></div>
                                        </div>

                                    </div>
                                    <div className='col-12 mt-3'>
                                        <button type="submit"
                                            className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-warning" : "btn btn-primary"}
                                            onClick={() => this.handleSaveUser()}>
                                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                                <FormattedMessage id={"manage-user.edit"} /> : <FormattedMessage id={"manage-user.save"} />}</button>
                                    </div>

                                    <div className='col-12'>
                                        <TableManageUser
                                            handleEditUserfromParent={this.handleEditUserfromParent}
                                            action={this.state.action} />
                                    </div>
                                </div>



                            </div>

                        </div>


                    </div>

                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewimage}

                            onCloseRequest={() => this.setState({ isOpen: false })}

                        />
                    }
                </div>

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        genderRedux: state.admin.genders,
        PositionRedux: state.admin.positions,
        RoleRedux: state.admin.role,
        AllUser: state.admin.users,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenDerStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchROLEStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        EditUser: (data) => dispatch(actions.EditUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // ChangelanguageApp: (language) => dispatch(actions.ChangelanguageApp(language))
        // ChangelanguageApp: (language) => dispatch(ChangelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
