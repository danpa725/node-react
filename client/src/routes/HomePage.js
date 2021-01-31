import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
    const [user, setUser] = useState("");

    const getDataFromServer = async () => {
        const { data } = await axios.get("/api/hellow");
        setUser(data);
        console.log(user);
    };

    useEffect(() => {
        getDataFromServer();
    });

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
