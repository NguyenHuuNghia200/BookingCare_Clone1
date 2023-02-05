import db from '../models/index.js'
import DoctorServices from '../services/DoctorServices'

let handlegetAllDoctor = async (req, res) => {

    try {

        let limit = req.query.limit
        console.log(limit)
        if (!limit) limit = 10
        try {
            let data= await DoctorServices.getAllDoctor(+limit)
            return res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode:-1,
                errMessage:'Error from server'
            })
        }
        let data = await UserServices.getAllDoctor()
        return res.status(200).json({
            data
        })


    } catch (e) {
        console.log(e)
    }



}
module.exports = {
    handlegetAllDoctor: handlegetAllDoctor,
}
