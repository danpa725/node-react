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
import { withRouter } from "react-router-dom";
import Input from "../utils/Input";
import Err from "../utils/Err";
//------------------------------------------------------------------

function RegisterPage(url) {
    const dispatch = useDispatch();

    const [emailValidation, setEmailValidation] = useState();
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [err, setErr] = useState("");

    const { register, handleSubmit, errors, watch } = useForm();
    // 인풋 상태를 조회하기 위해 react-hook-form 이용

    let passwordLength = watch("password", "").length;
    let retypePasswordLength = watch("retypePassword", "").length;
    let nickNameLength = watch("nickName", "").length;
    // hook-form의 watch메서드로 인풋의 특정 부분의 값을 가져옴.

    const onSubmit = async (input) => {
        const { email, password, retypePassword, nickName } = input;
        if (password !== retypePassword) setPasswordValidation(false);
        //처음 입력 비밀번호와 재 입력 비밀번호 매칭.
        else {
            setPasswordValidation(true);

            const clientInfo = { email, password, name: nickName };

            const registerResponse = await dispatch(registerUser(clientInfo));

            if (registerResponse.payload.registerSuccess) {
                const registerSuccessRespones = await dispatch(
                    loginUser(clientInfo)
                );

                registerSuccessRespones.payload.loginSuccess &&
                    url.history.push("/");
            } else {
                const { message } = registerResponse.payload;
                setErr(message);
                setEmailValidation(false);
            }
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
                        emailValidation === false
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    ref={register({
                        required: true,
                        minLength: 5,
                        maxLength: 15,
                    })}
                    className={`${BTN_STYLE} ${
                        passwordLength < 5 ||
                        errors.password ||
                        passwordValidation === false
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                <Input
                    name="retypePassword"
                    type="password"
                    placeholder="retype your password"
                    ref={register({
                        required: true,
                        minLength: 5,
                        maxLength: 15,
                    })}
                    className={`${BTN_STYLE} ${
                        retypePasswordLength < 5 ||
                        errors.retypePassword ||
                        passwordValidation === false
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                {/* errors.password state에 따른 조건부 렌더링. 비밀번호 미입력시 발동 */}
                {passwordLength < 5 && retypePasswordLength < 5 && (
                    <Err className={ERR_TEXT_STYLE}>
                        password minimum length is 5
                    </Err>
                )}
                {!passwordValidation && (
                    <Err className={ERR_TEXT_STYLE}>password is not same</Err>
                )}
                <Input
                    name="nickName"
                    type="text"
                    placeholder="nick name"
                    ref={register({ required: true, maxLength: 10 })}
                    className={`${BTN_STYLE} ${
                        nickNameLength >= 10 || errors.nickName === true
                            ? ERR_INPUT_STYLE
                            : INPUT_STYLE
                    }`}
                />
                {errors.nickName?.type === "required" && (
                    <Err className={ERR_TEXT_STYLE}>nick name is required</Err>
                )}
                {nickNameLength >= 10 && (
                    <Err className={ERR_TEXT_STYLE}>
                        max nick name length is 10
                    </Err>
                )}

                {/* 이메일 비밀번호 불일치시 메시지 출력 */}
                {!emailValidation && (
                    <Err className={ERR_TEXT_STYLE}>{err}</Err>
                )}

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

export default withRouter(RegisterPage);
