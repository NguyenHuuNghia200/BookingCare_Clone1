import homeController from '../controller/homeController';
import UserController from '../controller/UserController';
import DoctorController from '../controller/DoctorController';
const express = require('express');
let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAbout);
    router.get('/CRUD', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displaygetCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deteleCRUD);

    router.post('/api/login', UserController.handleLogin)
    router.get('/api/get-all-user', UserController.handlegetAlluser)
    router.post('/api/create-user', UserController.HandleCreateUser)
    router.put('/api/edit-user', UserController.HandleEditUser)
    router.delete('/api/delete-user', UserController.HandleDeleteUser)

    router.get('/api/allcode', UserController.handlegetAllcode)

    router.get('/api/allDoctor', DoctorController.handlegetAllDoctor)

    router.get('/api/listDoctor', DoctorController.handleListDoctor)

    router.post('/api/Save-info-doctor', DoctorController.handleSaveinfoDoctor)

    router.get('/api/get-info-doctor', DoctorController.handleGetinfoDoctor)


    router.post('/api/bulk-create-schedule', DoctorController.handleSaveinfoshedule)

    router.get('/api/get-schedule-doctor-by-date', DoctorController.getschedulebydate)


    return app.use("/", router)
}
module.exports = initWebRoutes