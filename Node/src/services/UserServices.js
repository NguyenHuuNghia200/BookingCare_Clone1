import db from '../models/index.js'
import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let handleUserlogin = (email, password) => {
    return new Promise(async (resolve, reject) => {

        try {
            let userData = []

            let isExist = await checkUserEmail(email)

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleid','firstName','lastName'],
                    where: { email: email },

                    raw: true

                })
               
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)

                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = ""
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = "wrong pass"

                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = "user not exist"
                }
            } else {
                userData.errCode = 1
                userData.errMessage = "your email not found"


            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({
                where: { email: email },
                raw: true
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e, 'asd')
        }
    })
}
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = ''
           
            if (userId === 'ALL') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                })
            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    raw: true
                })
            }
           
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let check = await checkUserEmail(data.email)
            // let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'position', 'role', 'gender']
            // for (let i = 0; i < arrCheck.length; i++) {
            //     if (!data[arrCheck[i]]) {
            //         resolve({
            //             errCode: 5,
            //             errMessage: 'missing param',
            //         })
    
            //     }
            // }
           
            let changerole= await changecode(data.roleid,'ROLE')
            let changegender=await changecode(data.gender,'GENDER')
            let changeposition= await changecode(data.positionId,'POSITION')
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'your email is already in used',
                })
            } else {
                let HashPasswordByBcrypt = await HashUserPassword(data.password)
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: HashPasswordByBcrypt,
                    email: data.email,
                    address: data.address,
                    gender: changegender,
                    roleid: changerole,
                    phonenumber: data.phonenumber,
                    positionId:changeposition,
                    image:data.avatar
                })
            }


            resolve({
                errCode: 0,
                errMessage: 'ok',
            })
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
let DeteleUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: id }
        })
        try {
            if (user) {
                await db.User.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    message: 'ok',
                })
            } else {
                resolve({
                    errCode: 2,
                    message: 'id not found',
                })
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

            if(!data.id ){
                resolve({
                    errCode: 2,
                    message: 'misssing param',
                })
            }
          
            let users = await db.User.findOne({
                where: { id: id },
                raw: false
            })
            
            let changerole= await changecode(data.roleid,'ROLE')
            let changegender=await changecode(data.gender,'GENDER')
            let changeposition= await changecode(data.positionId,'POSITION')
            if (users) {
                users.email = data.email
                users.firstName = data.firstName
                users.lastName = data.lastName
                users.address = data.address
                users.roleid=changerole
                users.positionId=changeposition
                users.gender=changegender
                users.phonenumber=data.phonenumber
                if(data.avatar){
                    users.image=data.avatar
                }
              
                await users.save()
                let ListUser = await db.User.findAll({
                    raw: true,
                })
                resolve({
                    errCode: 0,
                    message: 'ok',
                    ListUser
                })
            } else {
                resolve({
                    errCode: 4,
                    message: 'user not found',
                })
            }
        } catch (e) {
            reject(e)
        }
    })

}
let changecode= async(data,type1)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let allcode = await db.Allcodes.findAll({
                where: { type: type1 }
            })
            
            for (let i=0;i< allcode.length;i++){
                if(data===allcode[i].valueEn ||data=== allcode[i].valueVn )
                    data=allcode[i].key
                    
            }
            resolve(data)
        }catch (e) {
            reject(e)

        }     
    })
    
}
let getAllcode = (typeinput) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            if (!typeinput) {
                resolve({
                    errCode:1,
                    errMessage:'Missing required param'
                })
            } else {
                let res={}
                let allcode = await db.Allcodes.findAll({
                    where: { type: typeinput }
                })
                res.data = allcode
                res.errCode=0
                resolve(res)
            } 
        }catch (e) {
            reject(e)

        }
        
            
    })

}
module.exports = {
    handleUserlogin: handleUserlogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    DeteleUserById: DeteleUserById,
    updateUserdata: updateUserdata,
    getAllcode: getAllcode
}