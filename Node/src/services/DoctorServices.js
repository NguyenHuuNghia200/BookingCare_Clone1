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
module.exports = {
    getAllDoctor: getAllDoctor,
}