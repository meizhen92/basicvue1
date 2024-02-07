<template>
    <div class="container">
        <h1><img src="../assets/picto_movie1.jpg" /> Join Us </h1>
        <MainDesign />
        <div class="flexDiv">
            <p>
                아래 회원가입 양식을 입력해주세요.
            </p>
        </div>
        <br /><br /><br />
        <form id="registerForm">
            <div class="flexDiv">
                <div>
                    <img id="previewImg" :src="previewImgSrc" />
                    <br />
                    <input type="file" ref="imageFile" accept="image/*" class="inputFile" id="customFile"
                        @change="readInputFile" />
                </div>
                <table>
                    <tr>
                        <th>아이디</th>
                        <td><input type="text" placeholder="아이디를입력해주세요" v-model="inputId" />
                            <button type="button" @click="idCheck">중복검사</button>
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td><input type="text" v-model="inputNm" /></td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td><input type="text" v-model="inputEmail" />
                            <button type="button" @click="mailCheck">인증번호발송</button>
                            <input type="text" v-model="mailNum" placeholder="인증번호적기" />
                            <button type="button" @click="mailNumCheck">인증번호확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input type="password" v-model="inputPw" /></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td><input type="password" v-model="inputPwCheck" /></td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td><input type="text" v-model="inputHp" /></td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <input type="button" @click="daumPostCode()" value="우편번호 찾기" />
                            <input type="text" v-model="postCode" readonly />
                            <input type="text" v-model="addr" readonly />
                            <input type="text" v-model="addrDt" />
                        </td>
                    </tr>
                </table>
            </div>
            <br /><br />
            <div>
                <template v-if="reCaptchaRes == 'false'">
                    <div class="reCaptDiv">
                        <div class="g-recaptcha" :data-sitekey="siteKey"></div>
                        <input type="button" value="제출" @click="reCaptchaResponse" />
                    </div>
                </template>
                <template v-else>
                    <button type="button" @click="registerUser"
                        class="custom-btn btn-12"><span>Click!</span><span>회원가입</span></button>
                </template>
                <button type="button" class="custom-btn btn-12"><span>Click!</span><span>취소</span></button>
            </div>
            <br /><br />
        </form>
    </div>
</template>

<script>
// 자식 컴포넌트 import
import { nextTick } from 'vue'
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "RegisterView",
    props: [],
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        MainDesign
    },
    data() {
        return {
            inputId: "",
            inputNm: "",
            inputEmail: "",
            mailNum: "",
            inputPw: "",
            inputPwCheck: "",
            inputHp: "",
            addrDt: "",
            previewImgSrc: require('../assets/img_register2.jpg'),
            imageFile: null,
            siteKey: "",
        }
    },
    methods: {
        idCheck() {
            console.log(this.inputId + "-----okay이거들고가쟈");
            this.$store.dispatch('RegisterModule/idCheckAC', this.inputId);
        },
        mailCheck() {
            console.log(this.inputEmail + "-----okay이거들고가쟈");
            alert("인증번호 발송! 메일에서 인증번호를 확인 후 입력해주세요!");
            this.$store.dispatch('RegisterModule/mailCheckAC', this.inputEmail);
        },
        mailNumCheck() {
            this.$store.dispatch('RegisterModule/mailNumCheckAC', this.mailNum);
        },
        daumPostCode() {
            this.$store.dispatch('DaumPostCodeModule/execDaumPostcode');
        },
        reCaptchaResponse() {
            if (grecaptcha.getResponse() == "") {
                alert("로봇테스트 진행하고 클릭해주세요")
                return false;
            } else {
                this.$store.dispatch("RegisterModule/reCaptchaResAC", grecaptcha.getResponse());
            }
        },
        registerUser() {
            this.imageFile = this.$refs.imageFile.files[0];
            let frm = new FormData();
            frm.append('inputId', this.inputId);
            frm.append('inputNm', this.inputNm);
            frm.append('inputEmail', this.inputEmail);
            frm.append('inputPw', this.inputPw);
            frm.append('inputHp', this.inputHp);
            frm.append('postCode', this.postCode);
            frm.append('addr', this.addr);
            frm.append('addrDetail', this.addrDetail);
            frm.append('imageFile', this.imageFile);
            console.log("this.imageFile+++++++++++++++   :", this.imageFile);
            this.$store.dispatch('RegisterModule/registerUserAC', frm);
        },
        readInputFile(e) {
            const selFileCnt = e.target.files.length;
            if (selFileCnt > 0) {
                let files = e.target.files; // prototype: FileList
                let fileArr = Array.prototype.slice.call(files); // prototype: Array
                // prototype을 Array로 변경해서 forEach 등장
                // fileArr의 f 에서 type: "image/jpeg"
                // 이 아래 로직에서 화살표 함수를 사용하는 이유는, this 바인딩오류를 방지하기 위해!
                fileArr.forEach((f) => {
                    if (!f.type.match("image/*")) {
                        alert("image확장자만 업로드 가능합니다");
                        return;
                    }
                    var reader = new FileReader();
                    // readAsDataURL 로 url읽은동작이 완료되면 위에 onload 실행
                    reader.readAsDataURL(f);
                    // onload의 e 의 result: "data:image~~" 인, 기계어로 나타낸 값
                    reader.onload = (e) => {
                        nextTick().then(() => {
                            this.previewImgSrc = "";
                            return this.previewImgSrc = e.target.result;
                        })
                    };
                })
            } else {
                this.previewImgSrc = "";
                this.previewImgSrc = require('../assets/img_register2.jpg');
            }
        },
    },
    computed: {
        postCode() {
            return this.$store.state.DaumPostCodeModule.postCode;
        },
        addr() {
            return this.$store.state.DaumPostCodeModule.addr;
        },
        addrDetail() {
            return this.addrDt = this.$store.state.DaumPostCodeModule.addrDetail;
        },
        reCaptchaRes() {
            return this.$store.state.RegisterModule.reCaptchaRes;
        }
    },
    watch: {
        reCaptchaRes: {
            immediate: true,
            handler(cur, prev) {
                console.log("watch가 본다", prev, cur);
            }
        },
    },
    mounted() {
        const recaptchaScript = document.createElement("script");
        recaptchaScript.setAttribute(
            "src", "https://www.google.com/recaptcha/api.js", "async", "defer"
        );
        document.head.appendChild(recaptchaScript);
        this.siteKey = "6LeNb2ApAAAAABBSLfTuOctn_s4qDijZGppWYXjH";
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    min-height: 100vh;
    min-width: 100vh;
}

h1 {
    font-size: 40pt;
    padding: 20px;
}

img {
    width: 60px;
    height: 60px;
}

.flexDiv {
    display: flex;
    justify-content: space-around;
}

p {
    border: 2px dotted #d3d2d2;
    border-left: 0;
    border-right: 0;
    width: 70%;
    font-size: 15pt;
    font-weight: bold;
    padding: 10px 0px;
}

.reCaptDiv {
    display: inline-block;
}

.flexDiv>table {
    width: 60%;
    height: 50%;
    border-radius: 2%;
    background-color: rgba(38, 32, 41, 0.925);
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.5) inset;
    color: #dcd3df;
}

.flexDiv>table th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.37);
    border-bottom-left-radius: 10%;
    font-size: 13pt;
    font-weight: bold;
}

.flexDiv>table td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.37);
    border-bottom-right-radius: 10%;
    width: 70%
}

.flexDiv>table td>input {
    height: 30px;
    /* background-color: rgba(231, 221, 221, 0.9); */
    background-color: rgba(124, 37, 124, 0.767);
    width: 80%;
    margin: 10px;
    padding: 0px 10px;
    font-size: 12pt;
    color: #d3d2d2;
}

#registerForm {
    overflow: auto;
    width: 80%;
    margin: auto;
}

#registerForm img {
    float: left;
    width: 500px;
    height: 500px;
}

.inputFile {
    margin: 20px 0 0 0;
}

.basicBtn {
    width: 200px;
    height: 50px;
    margin: 10px 10px;
    border: 5px solid #a81b9d;
    background-color: #96158b;
    color: #fff;
}

.basicBtn:hover {
    background-color: rgb(3, 2, 29);
    border: 5px solid #96158b;
    transition: 0.5s;
}

.custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    outline: none;
}

/* 12 */
.btn-12 {
    position: relative;
    right: 20px;
    bottom: 20px;
    border: none;
    box-shadow: none;
    width: 130px;
    height: 40px;
    line-height: 42px;
    -webkit-perspective: 230px;
    perspective: 230px;
}

.btn-12 span {
    background: rgb(190, 30, 223);
    background: linear-gradient(0deg, rgba(190, 30, 223, 1) 0%, rgba(190, 30, 223, 1) 100%);
    display: block;
    position: absolute;
    width: 130px;
    height: 40px;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    border-radius: 5px;
    margin: 0;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.btn-12 span:nth-child(1) {
    box-shadow:
        -7px -7px 20px 0px #fff9,
        -4px -4px 5px 0px #fff9,
        7px 7px 20px 0px #0002,
        4px 4px 5px 0px #0001;
    -webkit-transform: rotateX(90deg);
    -moz-transform: rotateX(90deg);
    transform: rotateX(90deg);
    -webkit-transform-origin: 50% 50% -20px;
    -moz-transform-origin: 50% 50% -20px;
    transform-origin: 50% 50% -20px;
}

.btn-12 span:nth-child(2) {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: 50% 50% -20px;
    -moz-transform-origin: 50% 50% -20px;
    transform-origin: 50% 50% -20px;
}

.btn-12:hover span:nth-child(1) {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
}

.btn-12:hover span:nth-child(2) {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    color: transparent;
    -webkit-transform: rotateX(-90deg);
    -moz-transform: rotateX(-90deg);
    transform: rotateX(-90deg);
}
</style>