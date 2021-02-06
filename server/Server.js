const express = require("express");
const app = express();
//mongoose 연결
const mongoose = require("mongoose");
//body-parser 연결
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/User");
const { authUser } = require("./middleware/auth");
//application/x-www-form-urlencoded 형태 데이터 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
//json 형태 데이터 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

//--------------------------------------------------------------------------------------------------

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
        //mongoose 연결
    })
    .then(() => console.log("Mongo_DB Connected..."))
    .catch((err) => console.log(err));
//1. Mongo DB연결
//2. err ,connect 매세지 출력
//--------------------------------------------------------------------------------------------------

app.get("/", (req, res) => {
    res.send("Open Server!");
});

//!user 등록--------------------------------------------------------------------------------------------------

app.post("/api/users/register", (req, res) => {
    //회원가입 필요 정보 client에서 가져오면 데이터 베이스에 대입
    //req.body에 JSON 형태로 데이터가 들어있음
    const user = new User(req.body);
    const { email } = user;

    User.findOne({ email }, (err, isEmailExists) => {
        if (isEmailExists)
            return res.json({
                registerSuccess: false,
                message:
                    "입력하신 이메일은 이미 사용중입니다. 다른 이메일을 이용해주세요.",
                err,
            });
        else {
            //db에 저장 save()메서드

            user.save((err, userInfo) => {
                if (err)
                    return res.json({
                        registerSuccess: false,
                        message: "이메일과 비밀번호를 다시 확인해주세요.",
                        err,
                    });
                // 저장 성공시 200 신호 받음
                return res.status(200).json({
                    registerSuccess: true,
                    // userInfo,
                });
            });
        }
    });
});

//!user 로그인--------------------------------------------------------------------------------------------------

app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    //1. 요청된 이메일을 데이터 베이스에 있는지 찾는다.

    User.findOne({ email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "입력하신 이메일에 해당되는 계정이 존재하지 않습니다.",
                err,
            });
        }

        //2. 유저 존재 => 요청된 이메일이 데이터 베이스에 있다면 비밀번호 체크.
        else {
            user.comparePassword(password, (err, isMatch) => {
                //틀림.
                if (!isMatch)
                    return res.json({
                        loginSuccess: false,
                        message: "비밀번호가 옳지 않습니다.",
                        err,
                    });

                //3. 로그인 성공 => 비밀번호 확인 후 유저 JWT 토큰 생성.

                user.generateValidUserToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    //토큰 저장. 보관 장소 : 쿠기 / 로컬 스토리지 / 등
                    //cookie-parser 라이브러리 이용

                    res.cookie("x_auth", user.token)
                        .status(200)
                        .json({ loginSuccess: true, userId: user._id, user });
                });
            });
        }
    });
});

//!Auth 이용하기 로그인 사용자의 쿠키 속 jwt를 통해 user.id를 구함 -> 서버와 비교하여 특정 페이지를 진입 가능한지 설정-------

app.get("/api/users/auth", authUser, (req, res) => {
    //! authuser 는 콜백을 실행하기전에 시행하는 미들웨어...
    // authUser가 문제없이 통과 -> 인증이 정상적으로 진행됨.
    const { id, email, name, lastname, role, image } = req.user;

    res.status(200).json({
        _id: id,
        isAdmin: role === 0 ? false : true,
        //! 1이면 관리자.
        isAuth: true,
        email,
        name,
        lastname,
        role,
        image,
    });
});

//!user 로그아웃 쿠키 속 토큰을 통해 인증을 진행 => DB user 토큰만 지우면 로그아웃 상태로 복귀.--------------

app.get("/api/users/logout", authUser, (req, res) => {
    User.findOneAndUpdate(
        {
            _id: req.user._id,
        },
        {
            token: "",
        },

        (err, user) => {
            if (err) return res.json({ logoutSuccess: false, err });

            return res.status(200).send({
                logoutSuccess: true,
            });
        }
    );
});

app.patch("/api/users/update", authUser, (req, res) => {
    const { name, email } = req.body;
    User.findOneAndUpdate(
        {
            email,
        },
        {
            $set: {
                name: name,
            },
        },
        {
            new: true,
        },

        (err, user) => {
            if (err) return res.json({ updateSuccess: false, err });

            return res.status(200).send({
                updateSuccess: true,
            });
        }
    );
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//--------------------------------------------------------------------------------------------------
