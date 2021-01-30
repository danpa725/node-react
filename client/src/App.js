import { Route } from "react-router-dom";

import LandingPage from "./routes/LandingPage";
import LoginPage from "./routes/LoginPage";
import Register from "./routes/Register";

function App() {
    return (
        <>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route exact={true} path="/register" component={Register} />
        </>
    );
}

export default App;
