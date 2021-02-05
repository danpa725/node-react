import { HashRouter as Router, Route } from "react-router-dom";

import Auth from "../higerOrderComponents/Auth";
import AccountPage from "../routes/login_user/AccountPage";
import AdminPage from "../routes/admin/AdminPage";

import Home from "../routes/HomePage";
import Login from "../routes/LoginPage";
import Register from "../routes/RegisterPage";
import SettingPage from "../routes/login_user/SettingPage";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Auth(Home, true)} />
            <Route exact path="/login" component={Auth(Login, true)} />
            <Route exact path="/register" component={Auth(Register, true)} />
            <Route exact path="/account" component={Auth(AccountPage, false)} />
            <Route
                exact
                path="/settings"
                component={Auth(SettingPage, false)}
            />
            <Route
                exact
                path="/admin"
                component={Auth(AdminPage, false, true)}
            />
        </Router>
    );
}

export default App;
