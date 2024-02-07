const { defineConfig } = require("@vue/cli-service"); // vue cli3이상부터 webpack.config.js파일을 숨겨놓은 곳
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebPack: 애플리케이션에서 필요한 플러그인 추가가
  configureWebpack: {
    resolve: {
      alias: {
        "@modules": path.resolve(__dirname, "src/store/modules/"),
      },
    },
  },
  // chainWebpack: 체이닝
  // chainWebpack: config => {
  //   if(process.env.NODE_ENV === 'production'){
  //   }else {
  //   }
  // },
  // devServer: npm run serve로 로컬 서버를 웹팩 데브 서버로 실행(이클립스서버포트)
  // serve/build는 package.json에서 serve로 설정되어 있음
  devServer: {
    proxy: "http://localhost:8081",
    // hot: true, // 핫 리로드 설정
    // client: {
    //   overlay: false,
    // },
  },
  outputDir: "../src/main/resources/static",
});
