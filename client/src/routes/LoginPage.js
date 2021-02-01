import styled, { css } from "styled-components";

import { BTN_STYLE } from "../utils/ClassName";
import Container from "../utils/Container";
import MainLogo from "../utils/MainLogo";
//------------------------------------------------------------------
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//------------------------------------------------------------------
import { useDispatch } from "react-redux";
import { loginUser } from "../_action/user_action";
//------------------------------------------------------------------

const Form = styled.form`
    height: 25rem;
    width: 20rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    transition: all ease-out 0.1s;

    width: 250px;
    height: 1.5rem;

    margin: 0.5rem;

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

const INPUT_STYLE = "focus:ring-green-600 ";
//------------------------------------------------------------------

export default function LoginPage() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit, errors } = useForm();

    const sendUserInfo = (email, password) => {
        const clientInfo = { email, password };
        console.log(clientInfo);
        dispatch(loginUser(clientInfo));
    };

    const onSubmit = async (input) => {
        const { email, password } = await input;
        setEmail(email);
        setPassword(password);
        sendUserInfo(email, password);
    };

    return (
        <Container isLoginPage={true}>
            <Form onSubmit={handleSubmit(onSubmit)} className={"shadow-md"}>
                <MainLogo className={"mb-7"}>⨀ Note Share</MainLogo>

                <Input
                    name="email"
                    type="email"
                    placeholder="email"
                    ref={register({ required: true })}
                    className={`${BTN_STYLE} ${INPUT_STYLE}`}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    ref={register({ required: true, maxLength: 15 })}
                    className={`${BTN_STYLE} ${
                        errors.password ? "focus:ring-red-700" : INPUT_STYLE
                    }`}
                />
                {/* errors.password state에 따른 조건부 렌더링. */}
                {errors.password && (
                    <p className={"text-opacity-90 text-red-500"}>
                        password is required
                    </p>
                )}

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
