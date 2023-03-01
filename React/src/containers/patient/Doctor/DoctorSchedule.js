import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select'
import moment, { lang } from 'moment'
import localization from 'moment/locale/vi'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import './DoctorSchedule.scss'
import { ListSchedule } from '../../../services/UserService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allday: [],
            arrTime: [],
            arrTime1: [],
            infoDoctor: ''

        }
    }
    async componentDidMount() {

        this.props.fetchGetTimeStart()



        let language = this.props.language
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hom nay - ${ddMM}`
                    object.label = today
                } else {
                    object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'day').format('dddd-DD/MM'))
                }
                //object.label = moment(new Date()).add(i, 'day').format('dddd-DD/MM')

                //  object.label = moment(new Date()).add(i, 'day').locale('en').format('dddd-DD/MM')
            } else {

                if (i === 0) {

                    let ddMM1 = moment(new Date()).format('DD/MM')
                    let todayEn = `Hom nay - ${ddMM1}`
                    object.label = todayEn
                } else {
                    object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'day').format('dddd-DD/MM'))
                }
                object.label = moment(new Date()).add(i, 'day').locale('en').format('dddd-DD/MM')

            }


            object.value = moment(new Date()).add(i, 'day').startOf('day').valueOf()
            arrDate.push(object)
        }

        this.setState({
            allday: arrDate,
        })


    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.infoDoctor != prevProps.infoDoctor) {
            let date1 = moment(new Date()).startOf('day').valueOf()

            let res = await ListSchedule(this.props.infoDoctor.id, date1)
            if (res && res.errCode === 0) {
                this.setState({
                    arrTime1: res.data
                })
            }
        }
        if (this.props.language != prevProps.language) {


            let language = this.props.language
            let arrDate = []
            for (let i = 0; i < 7; i++) {
                let object = {}
                if (language === LANGUAGES.VI) {
                    if (i === 0) {
                        let ddMM = moment(new Date()).format('DD/MM')
                        let today = `Hom nay - ${ddMM}`
                        object.label = today
                    } else {
                        object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'day').format('dddd-DD/MM'))
                    }
                    //object.label = moment(new Date()).add(i, 'day').format('dddd-DD/MM')

                    //  object.label = moment(new Date()).add(i, 'day').locale('en').format('dddd-DD/MM')
                } else {

                    if (i === 0) {

                        let ddMM1 = moment(new Date()).format('DD/MM')
                        let todayEn = `Today - ${ddMM1}`

                        object.label = todayEn
                    } else {
                        object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'day').format('dddd-DD/MM'))
                    }


                }


                object.value = moment(new Date()).add(i, 'day').startOf('day').valueOf()
                arrDate.push(object)

            }

            this.setState({
                allday: arrDate
            })
        }
        if (prevProps.listTime != this.props.listTime) {
            //let arrDoctor = this.DatainputSelect(this.props.listTime)
            //let arrDoctor = this.props.listDoctor
            let data = this.props.listTime
            let check = false
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelect = check
                    return item
                })
            }

            this.setState({
                arrTime: data,
            })
        }


    }

    handleChangSelect = (data) => {
        let arrTime1 = this.state.arrTime

        if (arrTime1 && arrTime1.length > 0) {
            arrTime1 = arrTime1.map(item => {
                if (item.id === data.id) item.isSelect = !item.isSelect
                return item
            })
        }

        this.setState({
            arrTime: arrTime1,

        })

    }

    handleChangClickdate = async (event) => {
        let date = event.target.value

        let res = await ListSchedule(this.props.infoDoctor.id, date)
        if (res && res.errCode === 0) {
            this.setState({
                arrTime1: res.data
            })
        }

    }
    render() {
        let language = this.props.language
        let arrTime = this.state.arrTime
        let arrTime1 = this.state.arrTime1
        let allday = this.state.allday
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>

                    <select onChange={(event) => this.handleChangClickdate(event)}>
                        {allday && allday.length > 0 &&
                            allday.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                    </select>
                </div>
                <div className='all-availeble-time'>
                    <div className='text-calendar-alt'>
                        <span> <i className='fas fa-calendar-alt'>  lich kham</i></span>
                    </div>
                    <div className='time-content'>
                        {arrTime1 && arrTime1.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {arrTime1.map((item, index) => {

                                        return (
                                            <button key={index} className={item.isSelect === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                                onClick={() => this.handleChangSelect(item)}>
                                                {language === LANGUAGES.VI ? item.timeTypeData.valueVn : item.timeTypeData.valueEn}
                                            </button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span>Chon<i className='far fa-hand-point-up'></i> va dat mien phi</span>
                                </div>

                            </>
                            :
                            <div> khong co lich hen trong thoi gian nay</div>
                        }

                    </div>
                </div>

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listTime: state.admin.listTime,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetTimeStart: () => dispatch(actions.fetchGetTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
