import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../admin/TableManageUser.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}




class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.AllUser != this.props.AllUser) {
            let AllUserArr = this.props.AllUser

            this.setState({
                userRedux: AllUserArr,
            })
        }
    }
    handleDeleteUser = (dataid) => {

        this.props.deleteUser(dataid.id)
    }
    handleEditUser = (inputuser) => {
        console.log(inputuser.image, '-----')
        this.props.handleEditUserfromParent(inputuser)
    }
    render() {
        let arrayUsers = this.state.userRedux

        return (
            <>
                <div className='users-container'>
                    <div className='users-table mt-4 '>
                        <table id="TableManageUser">
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>sdt</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>

                                {arrayUsers && arrayUsers.length > 0 &&
                                    arrayUsers.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.phonenumber}</td>
                                                <td>{item.address}</td>
                                                <td className="">
                                                    <button className='btn-edit'
                                                        onClick={() => this.handleDeleteUser(item)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                    <button className='btn-delete'
                                                        onClick={() => this.handleEditUser(item)}>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>


                        </table>

                    </div>
                </div>
            
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        AllUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
