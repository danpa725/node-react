import axios from "axios";
import { TYPE_USER } from "./types";

export function loginUser(dataToSend) {
    const request = axios
        .post("/api/users/login", dataToSend)
        .then((res) => res.data);

    return {
        type: TYPE_USER,
        payload: request,
    };
}
