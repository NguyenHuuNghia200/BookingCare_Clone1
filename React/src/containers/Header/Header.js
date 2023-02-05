import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils'

class Header extends Component {
    changeLanguage = (language) => {
        this.props.ChangelanguageApp(language)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo.user,'----- check user infor header')
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
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
