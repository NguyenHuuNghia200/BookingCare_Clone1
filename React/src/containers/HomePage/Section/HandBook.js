import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";

class HandBook extends Component {

    render() {

        return (
            <div className=' section-share section-hand-book'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-hand-book' ></div>
                                    <div className='position text-center'>
                                        <div>Hệ thống Y tế Thu Cúc TCI</div>
                                        <div>Hô hấp - Phổi</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-hand-book' ></div>
                                    <div className='position text-center'>
                                        <div>Hệ thống Y tế Thu Cúc TCI</div>
                                        <div>Hô hấp - Phổi</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-hand-book' ></div>
                                    <div className='position text-center'>
                                        <div>Hệ thống Y tế Thu Cúc TCI</div>
                                        <div>Hô hấp - Phổi</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-hand-book' ></div>
                                    <div className='position text-center'>
                                        <div>Hệ thống Y tế Thu Cúc TCI</div>
                                        <div>Hô hấp - Phổi</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-hand-book' ></div>
                                    <div className='position text-center'>
                                        <div>Hệ thống Y tế Thu Cúc TCI</div>
                                        <div>Hô hấp - Phổi</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-hand-book' ></div>
                                    <div className='position text-center'>
                                        <div>Hệ thống Y tế Thu Cúc TCI</div>
                                        <div>Hô hấp - Phổi</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
