<template>
    <div class="pop_backG">
        <div class="pop_G">
            <h1>Welcome, Sign In</h1>
            <p><br /></p>
            <div>
                <input type="input" ref="inputFocusC" v-model="inputId" placeholder="아이디를 입력해주세요!" /><br />
                <input type="password" v-model="inputPw" placeholder="비밀번호를 입력해주세요!" />
            </div>
            <p><br /></p>
            <button type="button" @click="logInValid()" class="basicBtn">로그인</button>
            <button type="button" @click="closeModal()" class="basicBtn">닫기</button>
            <p>회원이 아니신가요? 여기를 <router-link to="/register" @click="clickToRegister()" style="color:white;">클릭</router-link>하여
                회원가입을 진행해주세요!</p>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "LoginVue",
    props: [],
    data() {
        return {
            inputId: "",
            inputPw: "",
            isCookie: "",
        }
    },
    methods: {
        logInValid() {
            const inputData = {};
            inputData.userId = this.inputId;
            inputData.userPw = this.inputPw;
            this.$store.dispatch('LogInModule/logInValid', inputData);
            setTimeout(() => {
                this.isCookie = document.cookie;
                if (this.isCookie != "") {
                    this.$emit("sendClose", false);
                    document.location.reload();
                }
                else {
                    this.inputId = "";
                    this.inputPw = "";
                }
            }, 1000);
        },
        closeModal() {
            this.$emit("sendClose", false);
        },
        focus() {
            this.$refs.inputFocusC.focus();
        },
        clickToRegister() {
            document.body.style.removeProperty('overflow');
        },
    }
}
</script>

<style scoped>
.pop_backG {
    background-color: #f1eaf3;
    position: absolute;
    width: 1950px;
    height: 900px;
    left: 0px;
    top: 30px;
    z-index: 9998;
}

.pop_G {
    background-color: rgba(38, 32, 41, 0.918);
    opacity: 1;
    justify-content: center;
    width: 50%;
    height: 400px;
    top: 200px;
    left: 450px;
    position: fixed;
    padding: 20px 20px;
    border: 10px double rgba(0, 0, 0, 0.37);
    border-radius: 2%;
    box-shadow: 40px 20px 10px rgba(0, 0, 0, 0.37);
}

.pop_G>div {
    display: flex;
    justify-content: center;
}

.pop_G>p {
    color: #ffffffa6;
}

h1 {
    font-size: 40pt;
    color: #96158b;
}

input {
    text-align: center;
    margin: 10px 10px;
    width: 300px;
    height: 50px;
    background-color: #dcd3df;
    font-size: 15pt;
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
</style>

