/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg"
class Specialty extends Component {

    SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }

    SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <div className=' section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyen Khoa pho bien</span>
                        <button className='btn-section'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                
                                <div className='bg-image section-specialty' ></div>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' ></div>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' ></div>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' ></div>
                                <div>Co xuong khop 1</div>
                            </div >
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' ></div>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' ></div>
                                <div>Co xuong khop 1</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
