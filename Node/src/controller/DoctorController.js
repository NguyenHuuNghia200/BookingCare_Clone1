
import DoctorServices from '../services/DoctorServices'

let handlegetAllDoctor = async (req, res) => {

    try {

        let limit = req.query.limit
        console.log(limit)
        if (!limit) limit = 10
        try {
            let data = await DoctorServices.getAllDoctor(+limit)
            return res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }



    } catch (e) {
        console.log(e)
    }



}
let handleListDoctor = async (req, res) => {
    try {
        try {
            let data = await DoctorServices.getlistDoctor()
            return res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    } catch (e) {
        console.log(e)
    }
}
let handleSaveinfoDoctor = async (req, res) => {
    try {
        try {

            let data = await DoctorServices.getsaveinfoDoctor(req.body)
            return res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleGetinfoDoctor = async (req, res) => {
    try {
        try {
            console.log('req.body', req.query.id)

            let data = await DoctorServices.getinfoDoctor(req.query.id)
            return res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    } catch (e) {
        console.log(e)
    }
}
let handleSaveinfoshedule = async (req, res) => {
    try {
        try {
            console.log(req.body)
            let data = await DoctorServices.getsaveinfoShedule(req.body)
            return res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    handlegetAllDoctor: handlegetAllDoctor,
    handleListDoctor: handleListDoctor,
    handleSaveinfoDoctor: handleSaveinfoDoctor,
    handleGetinfoDoctor: handleGetinfoDoctor,
    handleSaveinfoshedule: handleSaveinfoshedule,
}
