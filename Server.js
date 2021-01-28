const express = require("express");
const { request } = require("express");
const app = express();
const port = 5000;
//mongoose 연결
const mongoose = require("mongoose");
//body-parser 연결
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/User");

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
    res.send("Open Server!!");
});

//user 등록--------------------------------------------------------------------------------------------------

app.post("/user/register", (req, res) => {
    //회원가입 필요 정보 client에서 가져오면 데이터 베이스에 대입
    //req.body에 JSON 형태로 데이터가 들어있음
    const user = new User(req.body);

    //db에 저장 save()메서드
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        // 저장 성공시 200 신호 받음
        return res.status(200).json({
            success: true,
            // userInfo,
        });
    });
});

//user 로그인--------------------------------------------------------------------------------------------------

app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    //1. 요청된 이메일을 데이터 베이스에 있는지 찾는다.

    User.findOne({ email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSucess: false,
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
                        loginSucess: false,
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
                        .json({ loginSucess: true, userId: user._id });
                });
            });
        }
    });
});

//--------------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//--------------------------------------------------------------------------------------------------
