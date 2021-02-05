const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//10자리로 비밀번호 암호화
const jwt = require("jsonwebtoken");
//인증 라이브러리

//! SCHEMA: 데이터를 DB에 넣기 전에 먼저 검사
const USER_TOKEN = "USER_TOKEN";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        //띄어스기 제거
        unique: 1,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    //관리자 혹은 유저인지 확인
    image: String,

    //토큰 발행과 토큰 유효기간
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

//! 유저 비밀번호 암호화 with bycrypt -> 유저를 DB에 저장하기 전에 암호화 하기.

userSchema.pre("save", function (next) {
    const user = this;
    //this = userSchema;
    const userPassword = user.password;

    //password가 변화를 요청 할 때만 암호화 진행.
    if (user.isModified("password")) {
        //salt를 이용하여 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) next(err);

            bcrypt.hash(userPassword, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) return next(err);
                user.password = hash;
                //hash된 비밀번호를 DB에 등록.
                next();
            });
        });
    } else {
        next();
    }
});

// Server.js 의 메서드 전달
// 비밀번호 매칭 메서드
userSchema.methods.comparePassword = function (inputPassword, cb) {
    const dbPassword = this.password;
    // inputPassword <=> 암호화 비밀번호 매칭
    // bycrypt의 compare메서드 이용.

    bcrypt.compare(inputPassword, dbPassword, function (err, isMatch) {
        if (err) return cb(err);
        return cb(null, isMatch);
        //isMatch = true, err는 발생 하지 않음.
    });
};

// 로그인 유저를 위한 jwt 토큰 발행
userSchema.methods.generateValidUserToken = function (cb) {
    //JWT를 이용하여 토큰 생성
    let user = this;
    //function 과 화살표 함수의 this차이가 있음!

    const token = jwt.sign(user._id.toHexString(), USER_TOKEN);

    user.token = token;
    //token db에 저장. => token을 통해 user을 알아낼 수 있음.

    //몽고 db메서드 save()
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    const user = this;
    //토큰을 decode 한다.
    jwt.verify(token, USER_TOKEN, function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
