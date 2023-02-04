import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";

class MedicalFacility extends Component {

    render() {
        
        return (
            <div className=' section-share section-medicalfacility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Co so y te noi bat</span>
                        <button className='btn-section'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                
                                <div className='bg-image section-medicalfacility' ></div>
                                <div>Hệ thống Y tế Thu Cúc TCI</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medicalfacility' ></div>
                                <div>Hệ thống Y tế Thu Cúc TCI</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medicalfacility' ></div>
                                <div>Hệ thống Y tế Thu Cúc TCI</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medicalfacility' ></div>
                                <div>Hệ thống Y tế Thu Cúc TCI</div>
                            </div >
                            <div className='section-customize'>
                                <div className='bg-image section-medicalfacility' ></div>
                                <div>Hệ thống Y tế Thu Cúc TCI</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medicalfacility' ></div>
                                <div>Hệ thống Y tế Thu Cúc TCI</div>
                            </div>
                        </Slider>
                    </div>


                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
