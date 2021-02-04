import { HashRouter as Router, Route } from "react-router-dom";

import Auth from "./higerOrderComponents/Auth";

import Home from "./routes/HomePage";
import Login from "./routes/LoginPage";
import Register from "./routes/RegisterPage";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Auth(Home, true)} />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/register" component={Auth(Register, false)} />
        </Router>
    );
}

export default App;
