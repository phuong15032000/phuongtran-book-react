import { useRadioGroup } from "@material-ui/core";
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
    findAllRole(){
        return axios.get(API_URL + `/super-admin/users`, { headers: authHeader() })
    }
    setAdmin(id){
        return axios.put(API_URL + `/super-admin/users/`+id+`/set-admin`,"", { headers: authHeader() })
    }
    removeAdmin(id){
        return axios.put(API_URL + `/super-admin/users/`+id+`/remove-admin`,"", { headers: authHeader() })
    }
    addUser(user){
        return axios.post(API_URL + `/admin/users`,user, { headers: authHeader() })
    }
}
export default new UserDataService();