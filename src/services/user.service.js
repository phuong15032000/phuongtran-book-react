import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header"
const API_URL = 'http://localhost:8080/api';
class UserDataService {
    findAll(){
        return axios.get(API_URL + `/admin/users`, { headers: authHeader() })
    }
    enableUser(id){
        return axios.put(API_URL + `/admin/users/`+id+`/enable`,"", { headers: authHeader() })
    }    
    disableUser(id){
        return axios.put(API_URL + `/admin/users/`+id+`/disable`,"", { headers: authHeader() })
    }
}
export default new UserDataService();