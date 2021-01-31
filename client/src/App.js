import { Route } from "react-router-dom";

import Home from "./routes/HomePage";
import Login from "./routes/LoginPage";
import Register from "./routes/RegisterPage";

function App() {
    return (
        <>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />
        </>
    );
}

export default App;
