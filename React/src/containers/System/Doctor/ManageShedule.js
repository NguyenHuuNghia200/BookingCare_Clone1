import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../Header/Header';
import './ManageShedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import FormattedDate from '../../../components/Formating/FormattedDate'
import moment from 'moment';
import _, { result, size } from 'lodash';
import { SavebulkShedule } from '../../../services/UserService';
import { toast, Toast } from 'react-toastify';
class ManageShedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: '',
            arrListdoctor: [],
            currentDate: '',
            arrTime: [],
            arrTimechoose: '',
            Timechoose: []

        }
    }
    async componentDidMount() {
        this.props.fetchListDoctorRedux()
        this.props.fetchGetTimeStart()

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor != this.props.listDoctor) {
            let arrDoctor = this.DatainputSelect(this.props.listDoctor)
            //let arrDoctor = this.props.listDoctor
            this.setState({
                arrListdoctor: arrDoctor,
            })
        }
        if (prevProps.listTime != this.props.listTime) {
            //let arrDoctor = this.DatainputSelect(this.props.listTime)
            //let arrDoctor = this.props.listDoctor
            let data = this.props.listTime
            console.log('data', data)
            let check = false
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelect = check
                    return item
                })
            }
            this.setState({
                arrTime: this.props.listTime,
            })
        }
    }
    DatainputSelect = (data) => {
        let result = []
        let { language } = this.props.language
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelvn = item.firstName + ' ' + item.lastName
                let labelen = item.lastName + ' ' + item.firstName
                object.label = language === LANGUAGES.VN ? labelvn : labelen
                object.value = item.id
                result.push(object)
            })
        }
        return result

    }
    handleChange = async selectedOption => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    }
    hanleOnChangdatepicker = (value) => {
        console.log('date picker', value)
        this.setState({
            currentDate: value[0]
        })

    }
    handleChangSelect = (data) => {
        let arrTime1 = this.state.arrTime

        if (arrTime1 && arrTime1.length > 0) {
            arrTime1 = arrTime1.map(item => {
                if (item.id === data.id) item.isSelect = !item.isSelect
                return item
            })
        }
        console.log('arrtime1', arrTime1)
        this.setState({
            arrTime: arrTime1,

        })

    }
    handlesaveshedule = async () => {
        let doctor = this.state.selectedOption
        let currentDate = this.state.currentDate
        let arrTime = []
        let result = []
        arrTime = this.state.arrTime
        console.log('Timechoose', doctor.value, size(arrTime))
        if (doctor && _.isEmpty(doctor)) {
            toast.error('missing param doctor')
            return
        }
        if (!currentDate) {
            toast.error('missing param day')
            return
        }
        //let date1 = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        //let date1 = moment(currentDate).unix()
        let date1 = new Date(currentDate).getTime()
        console.log(date1, 'date1')
        if (arrTime && arrTime.length > 0) {
            let selected = arrTime.filter(item => item.isSelect === true)
            console.log(selected)
            if (selected && selected.length > 0) {
                selected.map((item) => {
                    let object = {}
                    object.doctorId = doctor.value
                    object.date = date1
                    object.timeType = item.key
                    result.push(object)
                })


            } else {
                toast.error('invalid select time')
                return
            }
        }
        console.log('check res', result)
        let res = await SavebulkShedule({
            data: result,
            doctorId: doctor.value,
            date: date1
        })
        console.log('res', res)
    }
    render() {

        const { systemMenuPath } = this.props;
        let arrTime = this.state.arrTime
        let language = this.props.language


        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="manage-schedule-container">
                    <div className='m-s-title'>
                        <FormattedMessage id={"schedule.title"} />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>chon bac si</label>
                                <Select
                                    className="form-control"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.arrListdoctor}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>chon ngay</label>
                                <DatePicker
                                    onChange={(value) => this.hanleOnChangdatepicker(value)}
                                    minDate={new Date(new Date().setDate(new Date().getDate() - 1))} />
                            </div>
                            <div className='col-12 day-container mt-3'>
                                {arrTime && arrTime.length > 0 &&
                                    arrTime.map((item, index) => {

                                        return (
                                            <button key={index} className={item.isSelect === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                                onClick={() => this.handleChangSelect(item)}>
                                                {language === LANGUAGES.VI ? item.valueVN : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-12'>

                                <button className='btn btn-primary col-1 ' style={{ width: 'auto' }}
                                    onClick={() => this.handlesaveshedule()}>Luu Thong tin</button>
                            </div>

                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        listDoctor: state.admin.listDoctor,
        language: state.app.language,
        listTime: state.admin.listTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListDoctorRedux: () => dispatch(actions.fetchListDoctor()),
        fetchGetTimeStart: () => dispatch(actions.fetchGetTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShedule);
