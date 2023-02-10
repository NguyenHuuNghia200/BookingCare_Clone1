import db from '../models/index.js'
import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let getAllDoctor = (limitinput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                limit: limitinput,
                order: [['createdAt', 'DESC']],
                where: { roleid: 'R2' },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    { model: db.Allcodes, as: 'positionIdData', attributes: ['valueEn', 'valueVn'] },
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVn'] }
                ],
                raw: true,
                nest: true

            })
            console.log(doctor)
            resolve({
                errCode: 0,
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getlistDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                order: [['createdAt', 'DESC']],
                where: { roleid: 'R2' },
                attributes: {
                    exclude: ["password", "image"],
                },
                include: [
                    { model: db.Allcodes, as: 'positionIdData', attributes: ['valueEn', 'valueVn'] },
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVn'] }
                ],
                raw: true,
                nest: true

            })
            console.log(doctor)
            resolve({
                errCode: 0,
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getsaveinfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('getsaveinfoDoctor', data)
            console.log(data.DoctorId)
            if (!data.DoctorId || !data.contentHtml || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param'
                })
            } else {
                await db.markdown.create({
                    contentHtml: data.contentHtml,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    DoctorId: data.DoctorId,
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'save complete'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getinfoDoctor = (inputid) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('id1', inputid)
            let doctor = await db.User.findAll({

                order: [['createdAt', 'DESC']],
                where: { id: inputid },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.markdown,
                        attributes: ['contentHtml', 'contentMarkdown', 'description', 'DoctorId']
                    },
                    { model: db.Allcodes, as: 'positionIdData', attributes: ['valueEn', 'valueVn'] },
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVn'] }
                    // { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVn'] }
                ],
                raw: true,
                nest: true
            })

            if (doctor && doctor.image) {
                doctor.image = new Buffer(doctor.image, 'base64').toString('binary');
            }

            resolve({
                errCode: 0,
                data:doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllDoctor: getAllDoctor,
    getlistDoctor: getlistDoctor,
    getsaveinfoDoctor: getsaveinfoDoctor,
    getinfoDoctor: getinfoDoctor,

}