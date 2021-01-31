import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
    const getDataFromServer = async () => {
        const data = await axios.get("/api/hellow");
        console.log(data);
    };
    useEffect(() => {
        getDataFromServer();
    }, []);

    return (
        <ul>
            <h1>Home</h1>
            <li>
                <Link to="/register">sign in</Link>
            </li>
            <li>
                <Link to="/login">login</Link>
            </li>
        </ul>
    );
}
