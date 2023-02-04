import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            id:''
        }

    }

    componentDidMount() {
        console.log("check didmount", this.props.currentUser)
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                email: user.email,
                password: 'hash pass',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                id:user.id,
            })
        }
    }

    toggle = () => {
        this.props.togglefromParent()
    }
    handleOnChangInput = (event, id) => {
        let copy = { ...this.state }

        copy[id] = event.target.value
        this.setState({
            ...copy
        }, () => {
            //console.log("check goods state",this.state)
        })
        //console.log(event.target.value,id)
    }
    checkvalidateinput = () => {
        let isvalue = true
        let arrinput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrinput.length; i++) {
            if (!this.state[arrinput[i]]) {
                isvalue = false
                break;
            }
        }
        return isvalue
    }
    handleSaveUser = () => {
        let isvalid = this.checkvalidateinput()
        console.log(this.state,'------')
        if (isvalid === true) {
            
            this.props.EditUser(this.state)
        }
    }
    
    render() {
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'model-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }} >
                    Edit
                </ModalHeader>

                <ModalBody  >
                    <div className="container">
                        <div className="">
                            <form action="/post-crud" method="POST" className="caol-md-8">

                                <div className="row">
                                    <div className="form-group col-6">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input
                                            disabled
                                            type="email" className="form-control"
                                            name="email" placeholder="Email"
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangInput(event, "email")} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="inputPassword4">Password</label>
                                        <input type="password" className="form-control" name="password"
                                            disabled
                                            placeholder="Password"
                                            value={this.state.password}
                                            autoComplete="on"
                                            onChange={(event) => this.handleOnChangInput(event, "password")} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label htmlFor="inputEmail4">First Name</label>
                                        <input type="text" className="form-control" name="firstname"
                                            placeholder="first name "
                                            value={this.state.firstName}
                                            onChange={(event) => this.handleOnChangInput(event, "firstName")} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="inputPassword4">Last Name</label>
                                        <input type="text" className="form-control" name="lastname" placeholder="last name "
                                            value={this.state.lastName}
                                            onChange={(event) => this.handleOnChangInput(event, "lastName")} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Address</label>
                                        <input type="text" className="form-control" name="address"
                                            placeholder="1234 Main St"
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnChangInput(event, "address")} />
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary mt-3 px-1' color='primary'
                        onClick={() => this.handleSaveUser()}
                    >Save Changes</button>
                    <button className='btn btn-dark mt-3 px-1' color='secondary' onClick={() => this.toggle()}>Cancel   </button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
