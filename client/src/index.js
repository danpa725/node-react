import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

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
    <Provider
        store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
            //!  리덕스 개발자 도구 사용을 위함.
        )}
    >
        <App />
    </Provider>,
    document.getElementById("render")
);
