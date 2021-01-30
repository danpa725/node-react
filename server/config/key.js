if (process.env.NODE_ENV === "production") {
    //! SERVER DEPLOY는 따로 DB연결 설정
    module.exprots = require("./prod");
} else {
    //! LOCAL 개발환경에서는 여기서 따로 처리
    module.exports = require("./dev");
}
