import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils'
import _ from 'lodash';
import { USER_ROLE } from '../../utils';
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: [],
            RoleUser: ''
        }
    }
    changeLanguage = (language) => {
        this.props.ChangelanguageApp(language)
    }
    componentDidMount() {
        let { userInfo } = this.props

        let menu = []

        if (userInfo && userInfo.user.roleid) {
            let role = userInfo.user.roleid
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        console.log(menu, '11')
        console.log(doctorMenu, 'doctorMenu')
        console.log(adminMenu, 'adminMenu1')
        this.setState({
            menuApp: menu,
            RoleUser: userInfo.user.roleid
        })
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        let menuApp = this.state.menuApp
        let RoleUser = this.state.RoleUser
        //RoleUser === 'R1' console.log(userInfo.user, '----- check user infor header')
        console.log('menuApp', menuApp)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    {/* <Navigator menus={RoleUser === 'R1' ? adminMenu : doctorMenu} /> */}


                    <Navigator menus={menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'>welcome {userInfo.user && userInfo.user.firstName ? userInfo.user.firstName : ''} !   </span>
                    <span
                        className={language === LANGUAGES.VI ? 'languages-vn  active' : 'languages-vn'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                        VN</span>
                    <span className={language === LANGUAGES.EN ? 'languages-en   active' : 'languages-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        ChangelanguageApp: (language) => dispatch(actions.ChangelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
