import { HashRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

//! 리덕스 & 미들웨어 설정
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducer/combineReducer";

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    ReduxThunk
)(createStore);

ReactDOM.render(
    <Router>
        <Provider store={createStoreWithMiddleware(Reducer)}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("render")
);
