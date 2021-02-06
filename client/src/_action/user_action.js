import axios from "axios";
import { AUTH_USER, MODIFYING_USER, REGISTER_USER, TYPE_USER } from "./types";

const LOGIN_URL = "/api/users/login";
const REGISTER_URL = "/api/users/register";
const LOGOUT_URL = "/api/users/logout";
const AUTH_URL = "/api/users/auth";
const MODIFYING_URL = "/api/users/update";

export async function loginUser(dataToSend) {
    const request = await axios.post(LOGIN_URL, dataToSend);

    return {
        type: TYPE_USER,
        payload: request.data,
    };
}

export async function registerUser(dataToSend) {
    const request = await axios.post(REGISTER_URL, dataToSend);

    return {
        type: REGISTER_USER,
        payload: request.data,
    };
}

export async function logoutUser() {
    const request = await axios.get(LOGOUT_URL);

    return {
        type: REGISTER_USER,
        payload: request.data,
    };
}

export async function authUser() {
    const request = await axios.get(AUTH_URL);

    return {
        type: AUTH_USER,
        payload: request.data,
    };
}

export async function modifyingUser(dataToSend) {
    const request = await axios.patch(MODIFYING_URL, dataToSend);

    return {
        type: MODIFYING_USER,
        payload: request.data,
    };
}
