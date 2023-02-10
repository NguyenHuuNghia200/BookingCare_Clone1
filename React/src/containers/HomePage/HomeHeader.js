import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { ChangelanguageApp } from '../../store/actions/appActions';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.ChangelanguageApp(language)
    }
    render() {
        let languages = this.props.language
        let userInfo = this.props.userInfo
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>

                            <i className="fas fa-bars p-3"></i>
                            <div className='logo'>

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='sub-title'>
                                    <FormattedMessage id={"home-header.speciality"} />
                                </div>
                                <div className='end-title'><FormattedMessage id={"home-header.searchdocter"} /></div>
                            </div>
                            <div className='child-content'>
                                <div className='sub-title'>
                                    <FormattedMessage id={"home-header.Health-facilities"} />
                                </div>
                                <div className='end-title' ><FormattedMessage id={"home-header.Choose-hospital-clinic"} /></div>
                            </div>
                            <div className='child-content'>
                                <div className='sub-title'>
                                    <FormattedMessage id={"home-header.Doctor"} />
                                </div>
                                <div className='end-title'><FormattedMessage id={"home-header.Choose-doctor"} /></div>
                            </div>
                            <div className='child-content'>
                                <div className='sub-title'><FormattedMessage id={"home-header.fee"} /></div>
                                <div className='end-title'><FormattedMessage id={"home-header.General-health-check"} /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support p-3'>
                                <i className="fas fa-question-circle p-1">
                                </i>
                                <FormattedMessage id={"home-header.support"} />
                            </div>
                            <div
                                className={languages === LANGUAGES.VI ? 'language-VN p-3 active' : 'language-VN'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div
                                className={languages === LANGUAGES.EN ? 'language-EN p-3  active' : 'language-EN'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.Isshowbanner === true &&
                    < div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>NỀN TẢNG Y TẾ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>

                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='tim` .....' />
                            </div>
                        </div>

                        <div className='content-dowm'>
                            <div className='options'>
                                <div className='options-child '>
                                    <div className='icon-child'>
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className='text-child'>Khám chuyên Khoa</div>
                                </div>
                                <div className='options-child '>
                                    <div className='icon-child'>
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className='text-child'>Khám từ xa</div>
                                </div>
                                <div className='options-child '>
                                    <div className='icon-child'>
                                        <i className="fas fa-hospital-alt"></i>
                                    </div>
                                    <div className='text-child'>khám tổng quát</div>
                                </div>
                                <div className='options-child '>
                                    <div className='icon-child'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='text-child'>Xét nghiệm y học</div>
                                </div>
                                <div className='options-child '>
                                    <div className='icon-child'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='text-child'>Sức Khỏe tinh thần</div>
                                </div>
                                <div className='options-child '>
                                    <div className='icon-child'>
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className='text-child'>Khám nha khoa</div>
                                </div>

                            </div>
                        </div>

                    </div>
                }
            </>
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
        ChangelanguageApp: (language) => dispatch(ChangelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
