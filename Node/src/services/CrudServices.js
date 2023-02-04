import bcrypt from 'bcryptjs';
import db from '../models/index.js'
//var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let HashPasswordByBcrypt = await HashUserPassword(data.password)
            await db.User.create({
                firstName: data.firstname,
                lastName: data.lastname,
                password: HashPasswordByBcrypt,
                email: data.email,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleId,
                phonenumber: data.phonenumber,
            })

            resolve("ok create new user")
        } catch (e) {

        }


    })
}
let HashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {

        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e, 'asd')
        }
    })
}
let ReadUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true,
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })

}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }

        } catch (e) {
            reject(e)
        }
    })
}
let updateUserdata = (data) => {


    return new Promise(async (resolve, reject) => {
        try {
            let id = data.id
            let users = await db.User.findOne({
                where: { id: id },
                raw: false
            })
            if (users) {
                users.firstName = data.firstname
                users.lastName = data.lastname
                users.address = data.address

                await users.save()
                let ListUser = await db.User.findAll({
                    raw: true,
                })
                resolve(ListUser)
            } else {
                resolve()
            }

        } catch (e) {
            reject(e)
        }
    })

}

let DeteleUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id, '-----------')
            let users = await db.User.findOne({
                where: { id: id },

            })
            if (users) {
                await db.User.destroy({
                    where: { id: id }
                })
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })

}
module.exports = {
    createNewUser: createNewUser,
    ReadUser: ReadUser,
    getUserInfoById: getUserInfoById,
    updateUserdata: updateUserdata,
    DeteleUserById: DeteleUserById

}