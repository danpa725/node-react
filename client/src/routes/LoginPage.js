import styled, { css } from "styled-components";
//------------------------------------------------------------------
import {
    BTN_STYLE,
    ERR_TEXT_STYLE,
    INPUT_STYLE,
    ERR_INPUT_STYLE,
} from "../utils/ClassName";
//------------------------------------------------------------------
import Container from "../utils/Container";
import MainLogo from "../utils/MainLogo";
import Form from "../utils/Form";
//------------------------------------------------------------------
import { useForm } from "react-hook-form";
//------------------------------------------------------------------
import { useDispatch } from "react-redux";
import { loginUser } from "../_action/user_action";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import Err from "../utils/Err";
//------------------------------------------------------------------

const Input = styled.input`
    transition: all ease-out 0.1s;

    width: 250px;
    height: 1.5rem;

    margin: 0.75rem;

    background: transparent;

    border-bottom: 1.5px solid black;

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
        border: none;
        border-radius: 2.5px;
    }

    ${(props) =>
        props.isBtn &&
        css`
            margin-top: 1rem;
            height: 2rem;

            background: black;

            color: white;

            border: none;
            border-radius: 2.5px;
        `}
`;

const EMAIL_ERR = "입력하신 이메일에 해당되는 계정이 존재하지 않습니다.";
const PASSWORD_ERR = "비밀번호가 옳지 않습니다.";

//------------------------------------------------------------------

function LoginPage(url) {
    const dispatch = useDispatch();

    const [validation, setValidation] = useState();
    const [err, setErr] = useState("");
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (input) => {
        const { email, password } = input;

        const clientInfo = { email, password };

        dispatchUserLogin(clientInfo);
    };

    const dispatchUserLogin = async (clientInfo) => {
        const response = await dispatch(loginUser(clientInfo));
        if (response.payload.loginSuccess) {
            url.history.push("/");
        } else {
            const { message } = response.payload;
            setErr(message);
            setValidation(false);
        }
    };

    return (
        <Container isLoginPage={true}>
            <Form onSubmit={handleSubmit(onSubmit)} className={"shadow-xl"}>
                <MainLogo className={"mb-7"}>⨀ Note Share</MainLogo>

                <Input
                    name="email"
                    type="email"
                    placeholder="email"
                    ref={register({ required: true })}
                    className={`${BTN_STYLE} ${
                        err === EMAIL_ERR ? ERR_INPUT_STYLE : INPUT_STYLE
                    }`}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    ref={register({ required: true, maxLength: 15 })}
                    className={`${BTN_STYLE} ${
                        errors.password || err === PASSWORD_ERR
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />

                {/* errors.password state에 따른 조건부 렌더링. 비밀번호 미입력시 발동 */}
                {errors.password && (
                    <Err className={ERR_TEXT_STYLE}>password is required</Err>
                )}

                {/* 이메일 비밀번호 불일치시 메시지 출력 */}
                {!validation && <Err className={ERR_TEXT_STYLE}>{err}</Err>}

                <Input
                    isBtn={true}
                    type="submit"
                    value="Log In"
                    className={`shadow-md ${BTN_STYLE} hover:bg-gray-800 focus:ring-gray-600`}
                />
            </Form>
        </Container>
    );
}
export default withRouter(LoginPage);
