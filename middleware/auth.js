// 인증 처리를 하는 곳.
const { User } = require("../models/User");

const authUser = (req, res, next) => {
    //1. 클라이언트 쿠키 가져오기
    const token = req.cookies.x_auth;
    //2. jwt토큰 복호화 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true, user });

        //! req 에 token 과 user를 전달.
        req.token = token;
        req.user = user;

        // next() = 미들웨어 탈출
        next();
    });
};

module.exports = { authUser };
