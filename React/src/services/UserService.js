import axios from "../axios"
const handleLoginApi = (email, password) => {

    return axios.post('/api/login', { email, password })
    // return axios.post('/api/login', {
    //     email: email,
    //     password: password
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
}
const GetAllUserApi = (userId) => {
    
    return axios.get(`/api/get-all-user?id=${userId}`)
}
const CreateUserApi = (data) => {

    return axios.post('/api/create-user', data)
}
const DeleteUserApi = (userid) => {

    return axios.delete('/api/delete-user', {
        params:{id: userid }
    })
}
const EditUserApi=(inputdata)=>{
  
    return axios.put('/api/edit-user', inputdata
    )
}
const getAllCodeService=(input)=>{
    return axios.get(`/api/allcode?type=${input}`)
}
const getTopDoctorService=(input)=>{
    return axios.get(`/api/allDoctor?limit=${input}`)
}
const getListDoctor=()=>{
    return axios.get(`/api/listDoctor`)
}
const getSaveinFoDoctor=(data)=>{
    return axios.post('/api/Save-info-doctor',data)
}
export {
    handleLoginApi,
    GetAllUserApi,
    CreateUserApi,
    DeleteUserApi,
    EditUserApi,
    getAllCodeService,
    getTopDoctorService,
    getListDoctor,
    getSaveinFoDoctor
}