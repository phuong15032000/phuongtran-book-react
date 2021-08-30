import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header"
const API_URL = 'http://localhost:8080/api';
class BookDataService {
    findAll(params) {
        return axios.get(API_URL + `/admin/books?page=` + params["page"] + `&size=` + params["size"] + `&keyword=` + params["keyword"] + `&orderBy=` + params["orderBy"], { headers: authHeader() })
    }
    getEnableBooks(params) {
        return axios.get(API_URL + `/books?page=` + params["page"] + `&size=` + params["size"] + `&keyword=` + params["keyword"] + `&orderBy=` + params["orderBy"], { headers: authHeader() })
    }
    getBookById(id) {
        return axios.get(API_URL + `/books/` + id, { headers: authHeader() })
    }
    addComment(comment, id) {
        return axios.post(API_URL + `/comments/` + id, comment, { headers: authHeader() })
    }
    deleteComment(id) {
        return axios.delete(API_URL + `/comments/` + id, { headers: authHeader() })
    }
    getBookByUser(id) {
        return axios.get(API_URL + `/books/user/` + id, { headers: authHeader() })
    }
    addBook(book) {
        return axios.post(API_URL + `/books`, book, { headers: authHeader() })
    }
    addBookAsAdmin(book) {
        return axios.post(API_URL + `/admin/books`, book, { headers: authHeader() })
    }
    editBook(book, id) {
        return axios.put(API_URL + `/books/` + id, book, { headers: authHeader() })
    }
    enableBook(id) {
        return axios.put(API_URL + `/admin/books/` + id + `/enable`, "", { headers: authHeader() })
    }
    disableBook(id) {
        return axios.put(API_URL + `/admin/books/` + id + `/disable`, "", { headers: authHeader() })
    }
    getAllBook() {
        return axios.get(API_URL + `/admin/books`, { headers: authHeader() })
    }
    deleteBook(id) {
        return axios.delete(API_URL + `/books/` + id, { headers: authHeader() })
    }
    getCommentById(id) {
        return axios.get(API_URL + `/comments/` + id, { headers: authHeader() })
    }
    editComment(id, comment) {
        return axios.put(API_URL + `/comments/` + id, comment, { headers: authHeader() })
    }
}

export default new BookDataService();