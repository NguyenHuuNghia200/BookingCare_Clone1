
import db from '../models/index.js'
import CrudServices from '../services/CrudServices'

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }



}
let getAbout = (req, res) => {
    return res.render('test/about.ejs')


}
let getCRUD = (req, res) => {
    return res.render('Crud.ejs')


}
let postCRUD = async (req, res) => {
    let message = await CrudServices.createNewUser(req.body)
    console.log(message)
    //return res.render('Crud.ejs')
    return res.send("post crud")

}
let displaygetCRUD = async (req, res) => {


    try {
        let data = await CrudServices.ReadUser();

        return res.render('displayCrud.ejs', {
            data: data
        })
    } catch (e) {
        console.log(e)
    }
    return res.send("get data complete")
}
let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userdata = await CrudServices.getUserInfoById(userId)

        return res.render('editCrud.ejs',
            { userdata: userdata }
        )
    } else {
        return res.send("hello from edit")
    }
}
let putCRUD = async (req, res) => {
    let data1 = req.body
    let data = await CrudServices.updateUserdata(data1)

    res.render('displayCrud.ejs', { data: data })

}
let deteleCRUD = async (req, res) => {
    let id = req.query.id
    console.log(id)
    if (id) {
        await CrudServices.DeteleUserById(id)
        return res.send("hello from detele")
    } else {
        return res.send("user not found")
    }
    
}
module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD: displaygetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deteleCRUD: deteleCRUD,
}