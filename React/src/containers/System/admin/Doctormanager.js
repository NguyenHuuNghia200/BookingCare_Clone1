import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../admin/Doctormanager.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getInfoFoDoctor } from '../../../services/UserService';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class Doctormanager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentmarkdown: '',
            contenthtml: '',
            selectedOption: '',
            description: '',
            arrListdoctor: [],
            CreateMarkdown: true
        }
    }

    async componentDidMount() {
        this.props.fetchListDoctorRedux()
        this.props.fetchAllUserRedux()

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor != this.props.listDoctor) {
            let arrDoctor = this.DatainputSelect(this.props.listDoctor)
            //let arrDoctor = this.props.listDoctor

            this.setState({
                arrListdoctor: arrDoctor,
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



    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentmarkdown: text,
            contenthtml: html,
        })
        console.log('handleEditorChange', html, text);
    }
    handleSavecontentMarkdown = () => {
        this.props.fetchSaveDoctor({
            contentHtml: this.state.contenthtml,
            contentMarkdown: this.state.contentmarkdown,
            description: this.state.description,
            DoctorId: this.state.selectedOption.value,
            action: this.state.CreateMarkdown === true ? 'create' : 'update'
        })
        this.setState({
            contenthtml: '',
            contentmarkdown: '',
            description: '',
            selectedOption: ''
        })
        console.log(this.state)
    }

    handleChange = async selectedOption => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );


        let res = await getInfoFoDoctor(selectedOption.value)
        console.log('res1', res, res.data.markdown.contentHtml)
        if (res && res.data && res.data.markdown) {
            this.setState({
                contenthtml: res.data.markdown.contentHtml,
                contentmarkdown: res.data.markdown.contentMarkdown,
                description: res.data.markdown.description,
                CreateMarkdown: false
            })
        } else {
            this.setState({
                contenthtml: '',
                contentmarkdown: '',
                description: ''
            })
        }

    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        return (
            <>

                <div className='manager-doctor-container'>

                    <div className='manager-doctor-title'>
                        hello Doctormanager
                    </div>
                    <div className='more-info'>
                        <div className='content-left'>
                            <label>chon bac si</label>
                            <Select
                                className="form-control"
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.arrListdoctor}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label>thong tin gioi thieu</label>
                            <textarea className='form-control' rows={4}
                                value={this.state.description || ''}
                                onChange={(event) => this.handleOnChangeDesc(event)}>

                            </textarea>
                        </div>

                    </div>
                    <div className='manager-doctor-editer'>

                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange}
                            value={this.state.contentmarkdown || ''} />
                    </div>
                    <button className={this.state.CreateMarkdown === true ? 'btn btn-primary m-3' : 'btn btn-warning m-3'}
                        onClick={() => this.handleSavecontentMarkdown()}>

                        {this.state.CreateMarkdown === true ? <span>tao thong tin</span> : <span>luu thong tin</span>}
                    </button>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctor: state.admin.listDoctor,
        AllUser: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListDoctorRedux: () => dispatch(actions.fetchListDoctor()),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetchSaveDoctor: (data) => dispatch(actions.fetchSaveDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctormanager);
