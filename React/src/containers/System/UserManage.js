import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../System/UserManage.scss'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { GetAllUserApi, CreateUserApi, DeleteUserApi, EditUserApi } from '../../services/UserService'
import { emitter } from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrayUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            EditUser: []
        }
    }

    async componentDidMount() {

        await this.GetAllUser()

    }
    GetAllUser = async () => {
        try {
            let response = await GetAllUserApi('ALL')

            if (response && response.errCode === 0) {
                this.setState({
                    arrayUsers: response.users
                })
            }
        }catch(e){
            console.log(e)
        }
        
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })

    }
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })
    }
    doEditUser = async (data) => {
        console.log('check edit', data)
        try{
            let respone= await EditUserApi(data)
            if (respone && respone.message.errCode !== 0) {
                alert(respone.message.errMessage)
            } else {
                await this.GetAllUser()
            }
            this.setState({
                isOpenModalEdit: !this.state.isOpenModalEdit
            })
        }catch(e){
            console.log(e)
        }
        
       
    }
    createNewUser = async (data) => {
        try {
            let respone = await CreateUserApi(data)

            if (respone && respone.message.errCode !== 0) {
                alert(respone.message.errMessage)
            } else {
                await this.GetAllUser()
            }
            this.setState({
                isOpenModal: !this.state.isOpenModal
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA')

        } catch (e) {
            console.log(e)
        }

        // this.setState({
        //     arrayUsers: [...this.state.arrayUsers, data]
        // })

    }
    handleDeleteUser = async (user) => {
        console.log('user:', user.id)
        try {
            console.log('----------')
            let res = await DeleteUserApi(user.id)
            if (res && res.message.errCode === 0) {
                this.GetAllUser()
            } else {
                alert(res.message.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) => {
        console.log(user)
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
            EditUser: user

        })
    }
    render() {
        console.log("check render")
        let arrayUsers = this.state.arrayUsers
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    togglefromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}

                />
                {this.state.isOpenModalEdit &&

                    <ModalEditUser
                        isOpen={this.state.isOpenModalEdit}
                        togglefromParent={this.toggleUserModalEdit}
                        currentUser={this.state.EditUser}
                        EditUser={this.doEditUser}
                    />
                }
                <div className="title text-center">Manage users</div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-1'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add New User
                    </button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
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

        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
