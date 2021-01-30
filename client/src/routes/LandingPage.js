import { Link } from "react-router-dom";

export default function LandingPage() {
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
