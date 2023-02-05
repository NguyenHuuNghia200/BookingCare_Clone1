import db from '../models/index.js'
import UserServices from '../services/UserServices'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "missing inputs param"
        })
    }
    let userData = await UserServices.handleUserlogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}
let handlegetAlluser = async (req, res) => {
    let id = req.query.id
    //all,single
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing param',
            users: []
        })
    }
    let users = await UserServices.getAllUser(id)

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users,
    })
}
let HandleCreateUser = async (req, res) => {
    console.log('HandleCreateUser',req.body)
    let message = await UserServices.createNewUser(req.body)
    console.log(message)
    return res.status(200).json({
        message
    })

}
let HandleDeleteUser = async (req, res) => {
    let id = req.query.id
    if (id) {
        let message = await UserServices.DeteleUserById(id)
        return res.status(200).json({
            message
        })
    }
}
let HandleEditUser = async (req, res) => {
    let data1 = req.body

    let message = await UserServices.updateUserdata(data1)
    return res.status(200).json({
        message
    })

}
let handlegetAllcode = async (req, res) => {

    try {
        setTimeout( async()=>{
            let data = await UserServices.getAllcode(req.query.type)
            return res.status(200).json({
                data
            })
        },0 )
        
    } catch (e){
        console.log(e)
    }



}

module.exports = {
    handleLogin: handleLogin,
    handlegetAlluser: handlegetAlluser,
    HandleCreateUser: HandleCreateUser,
    HandleEditUser: HandleEditUser,
    HandleDeleteUser: HandleDeleteUser,
    handlegetAllcode: handlegetAllcode
}