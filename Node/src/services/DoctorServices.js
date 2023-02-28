import db from '../models/index.js'
import bcrypt, { hash } from 'bcryptjs';
import _ from 'lodash'

const salt = bcrypt.genSaltSync(10);
require('dotenv').config()
const MAX_LENGTH_SCHEDULE = process.env.MAX_LENGTH_SCHEDULE
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
                if (data.action === 'create') {
                    await db.markdown.create({
                        contentHtml: data.contentHtml,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        DoctorId: data.DoctorId,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'create complete'
                    })
                } else if (data.action === 'update') {
                    let doctor = await db.markdown.findOne({
                        where: { DoctorId: data.DoctorId },
                        raw: false
                    })
                    doctor.contentHtml = data.contentHtml
                    doctor.contentMarkdown = data.contentMarkdown
                    doctor.description = data.description
                    await doctor.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'update complete'
                    })
                }
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
            let doctor = await db.User.findOne({

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
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getsaveinfoShedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.data || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing param'
                })
            } else {

                let schedule = data.data
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_LENGTH_SCHEDULE

                        return item
                    })

                }
                console.log('data', data.date)
                console.log('schedule', schedule)



                let existing = await db.schedules.findAll({
                    where: { doctorId: data.doctorId, date: data.date },

                    raw: false
                })

                // if (existing && existing.length > 0) {
                //     existing = existing.map(item => {
                //         item.date = new Date(item.date).getTime()

                //         return item
                //     })

                // }

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
                })
                // console.log('existing', existing)
                // console.log('toCreate', toCreate)
                if (toCreate && toCreate.length > 0) {
                    console.log('ok')
                    await db.schedules.bulkCreate(toCreate)
                }

                resolve({
                    errCode: 0,
                    errMessage: 'save complete'
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}

let getschedulebydateService = (doctorid, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(doctorid, date, '----------')
            if (!doctorid || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing param'
                })
            } else {
                let doctorschedule = await db.schedules.findAll({
                    where: {
                        doctorId: doctorid,
                        date: date
                    },
                    include: [
                        { model: db.Allcodes, as: 'timeTypeData', attributes: ['valueEn', 'valueVn'] },
                    ],
                    nest: true,
                    raw: false
                })
                console.log(doctorschedule, '---')
                if (!doctorschedule) doctorschedule = []
                resolve({
                    errCode: 0,
                    data: doctorschedule
                })
            }

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
    getsaveinfoShedule: getsaveinfoShedule,
    getschedulebydateService: getschedulebydateService

}