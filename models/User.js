const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;
//10자리로 비밀번호 암호화
const jwt = require("jsonwebtoken");
//인증 라이브러리

//! SCHEMA: 데이터를 DB에 넣기 전에 먼저 검사

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
    Image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
    //토큰 발행과 토큰 유효기간
});

//! 유저 비밀번호 암호화 with bycrypt
//저장 전 pre
userSchema.pre("save", function (next) {
    const user = this;
    const myPlaintextPassword = user.password;

    if (user.isModified("password")) {
        //salt를 이용하여 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) next(err);

            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 1234 | 암호화 비밀번호 매칭
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err), cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    //JSON WEBTOKEN을 이용하여 토큰 생성
    let user = this;

    let token = jwt.sign(user._id, "TOKEN_GENERATE");

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
    // user._id + 'TOKEN_GENERATE' = token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
