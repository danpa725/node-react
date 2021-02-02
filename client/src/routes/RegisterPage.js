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
import { loginUser, registerUser } from "../_action/user_action";
import { useState } from "react";
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

const Err = styled.p`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 700;
    font-size: 0.9em;

    width: 250px;
    text-align: center;
`;

//------------------------------------------------------------------

export default function LoginPage(url) {
    const dispatch = useDispatch();

    const [validation, setValidation] = useState();
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [err, setErr] = useState("");

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (input) => {
        const { email, password, retypePassword, nickName } = input;

        if (password !== retypePassword) {
            setPasswordValidation(false);
        } else {
            setPasswordValidation(true);

            const clientInfo = { email, password, name: nickName };

            dispatch(registerUser(clientInfo)).then((res) => {
                if (res.payload.registerSuccess) {
                    dispatch(loginUser(clientInfo)).then((res) => {
                        if (res.payload.loginSuccess) url.history.push("/");
                    });
                } else if (!res.payload.registerSuccess) {
                    const { message } = res.payload;

                    setErr(message);

                    setValidation(false);
                }
            });
        }
    };

    return (
        <Container isRegisterPage={true}>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className={"shadow-xl"}
                isRegisterPage={true}
            >
                <MainLogo className={"mb-7"}>
                    Welocome to <br /> Note Share 😀
                </MainLogo>

                <Input
                    name="email"
                    type="email"
                    placeholder="email"
                    ref={register({ required: true })}
                    className={`${BTN_STYLE} ${
                        validation === false ? ERR_INPUT_STYLE : INPUT_STYLE
                    }`}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    ref={register({ required: true, maxLength: 15 })}
                    className={`${BTN_STYLE} ${
                        errors.password || passwordValidation === false
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                <Input
                    name="retypePassword"
                    type="password"
                    placeholder="retype your password"
                    ref={register({ required: true, maxLength: 15 })}
                    className={`${BTN_STYLE} ${
                        errors.retypePassword || passwordValidation === false
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                {/* errors.password state에 따른 조건부 렌더링. 비밀번호 미입력시 발동 */}
                {errors.password && (
                    <Err className={ERR_TEXT_STYLE}>password is required</Err>
                )}
                {!passwordValidation && (
                    <Err className={ERR_TEXT_STYLE}>password is not same</Err>
                )}
                <Input
                    name="nickName"
                    type="text"
                    placeholder="nick name"
                    ref={register({ required: true, maxLength: 15 })}
                    className={`${BTN_STYLE} ${
                        errors.nickName || validation === false
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                {/* 이메일 비밀번호 불일치시 메시지 출력 */}
                {!validation && <Err className={ERR_TEXT_STYLE}>{err}</Err>}

                <Input
                    isBtn={true}
                    type="submit"
                    value="Sign In"
                    className={`shadow-md ${BTN_STYLE} hover:bg-gray-800 focus:ring-gray-600`}
                />
            </Form>
        </Container>
    );
}
