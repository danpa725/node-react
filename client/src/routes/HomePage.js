import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
    // const getDataFromServer = async () => {
    //     const data = await axios.get("/api/users/hellow");
    //     console.log(data);
    // };
    useEffect(() => {
        // getDataFromServer();
        axios.get("/api/hellow").then((data) => console.log(data));
    }, []);
    return (
        <ul>
            <h1>Home</h1>
            <li>
                <Link to="/register" style={{ textDecoration: "none" }}>
                    sign in
                </Link>
            </li>
            <li>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    login
                </Link>
            </li>
        </ul>
    );
}
