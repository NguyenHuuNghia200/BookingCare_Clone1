import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { path } from '../../../utils';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Arrtopdoctor: [],

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor != this.props.topDoctor) {
            this.setState({
                Arrtopdoctor: this.props.topDoctor
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }
    hanhleViewDetailDoctor=(doctorData)=>{
        this.props.history.push(`/detail_doctor/${doctorData.id}`)
    }
    render() {
        let Arrtopdoctor = this.state.Arrtopdoctor.data
        let language = this.props.language
        //console.log(Arrtopdoctor)
        return (
            <div className=' section-share section-outstandingdoctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {Arrtopdoctor && Arrtopdoctor.length > 0 &&
                                Arrtopdoctor.map((item, index) => {
                                    let namevn=item.positionIdData.valueVn+' '+item.firstName+' '+item.lastName
                                    let nameen=item.positionIdData.valueEn+' '+item.firstName+' '+item.lastName
                                    //console.log(Arrtopdoctor.item.genderData,'--')
                                    let imagebase64=''
                                    if(item.image){
                                        imagebase64=new Buffer(item.image,'base64').toString('binary');
                                        
                                    }
        
                                    return (
                                        <div className='section-customize' key={index} onClick={()=>this.hanhleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstandingdoctor' 
                                                    style={{backgroundImage:`url(${imagebase64})`}}></div>
                                                    <div className='position text-center'>
                                                        <div>{language===LANGUAGES.VI? namevn:nameen}</div>
                                                        <div>Hô hấp - Phổi</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
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
        topDoctor: state.admin.topDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
