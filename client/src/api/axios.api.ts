import axios from "axios";
import {getTokenFromLocalStorage} from "../helper/localstorsge.helper.ts";

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
    },
})
