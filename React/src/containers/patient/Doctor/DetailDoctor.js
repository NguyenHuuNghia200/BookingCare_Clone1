import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import * as actions from '../../../store/actions'
import { fetchGetDoctor } from '../../../store/actions';
import { getInfoFoDoctor } from '../../../services/UserService';
class DetailDoctor extends Component {


    constructor(props) {
        super(props)
        this.state = {
            infoDoctor: '',
            image: ''

        }
    }
    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctor = await getInfoFoDoctor(this.props.match.params.id)
            console.log(doctor)
            let imagetest = doctor.data.image
            // let image1 = ''
            // if (doctor.data && doctor.data.image) {
            //     image1 = new Buffer(imagetest, 'base64').toString('binary');
            // }

            // console.log(image1)
            this.setState({
                infoDoctor: doctor.data,
                image: imagetest
            })
        }
    }

    render() {
        let infoDoctor1 = this.state.infoDoctor
        console.log(this.state.infoDoctor)
        console.log(infoDoctor1.markdown)
        return (
            <>
                <HomeHeader Isshowbanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${this.state.image})` }}>

                        </div>
                        <div className='content-right'>

                            <div className='up'>
                                {infoDoctor1.positionIdData && infoDoctor1.positionIdData.valueVn &&
                                    <span>
                                        {infoDoctor1.positionIdData.valueVn} {infoDoctor1.firstName} {infoDoctor1.lastName}
                                    </span>
                                }

                            </div>
                            <div className='down'>
                                {infoDoctor1.markdown && infoDoctor1.markdown.description &&
                                    <span>
                                        {infoDoctor1.markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='scheule-doctor'>

                    </div>
                    <div className='detail-infor-doctor'>

                        {infoDoctor1.markdown && infoDoctor1.markdown.contentHtml &&
                            <div dangerouslySetInnerHTML={{ __html: infoDoctor1.markdown.contentHtml }}>

                            </div>
                        }
                    </div>
                    <div className='comment'>

                    </div>

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        infoDoctor: state.admin.infoDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fetchGetDoctor: (data) => dispatch(actions.fetchGetDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
