//! 프록시 서버: 포트 5000번 이용을 위함
//! CORS 정책을 지키기 위함
/* 프록시 서버 사용의 이유: 
    캐쉬를 이용 -> 빠른 인터넷
    아이피를 변경 가능 -> 보안 제공
    인터넷 제어.
*/
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};
