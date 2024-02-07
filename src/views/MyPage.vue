<template>
    <div class="container">
        <div>
            <h1>My Page</h1>
        </div>
        <MainDesign />
        <form>
            <table>
                <tr>
                    <th>아이디</th>
                    <td><input type="text" v-model="inputId" readonly />
                    </td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td><input type="text" v-model="inputNm" /></td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td><input type="text" v-model="inputEmail" /></td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td><button>비밀번호 수정하기</button></td>
                </tr>
                <tr>
                    <th>휴대전화</th>
                    <td><input type="text" v-model="inputHp" /></td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td>
                        <input type="button" @click="daumPostCode()" value="우편번호 찾기" />
                        <input type="text" v-model="postCode" />
                        <input type="text" v-model="addr" />
                        <input type="text" v-model="addrDetail" />
                    </td>
                </tr>
            </table>
            <br /><br />
            <div>
                <button type="button" @click="updateUserInfo" class="normalBtn">정보수정</button>
                <button type="button" class="normalBtn">취소</button>
            </div>
            <br /><br />
        </form>
    </div>
</template>
<script>
// 자식 컴포넌트 import
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "MyPageVue",
    props: [],
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        MainDesign
    },
    data() {
        return {
            openModal: false,
            isCookie: null,
            inputId: "",
            inputNm: "",
            inputEmail: "",
            inputHp: "",
            postCode: "",
            addr: "",
            addrDetail: "",
        }
    },
    methods: {
        daumPostCode() {
            this.$store.dispatch("DaumPostCodeModule/execDaumPostcode");
        },
        updateUserInfo() {
            let frm = new FormData();
            frm.append('inputNm', this.inputNm);
            frm.append('inputEmail', this.inputEmail);
            frm.append('inputHp', this.inputHp);
            frm.append('postCode', this.postCode);
            frm.append('addr', this.addr);
            frm.append('addrDetail', this.addrDetail);
            this.$store.dispatch("UpdateUserInfoModule/updateUserInfo", frm);
        }
    },
    computed: {},
    created() {
        this.isCookie = document.cookie;
        this.inputId = this.$store.state.LogInModule.userInfo.user_id;
        this.inputNm = this.$store.state.LogInModule.userInfo.user_name;
        this.inputEmail = this.$store.state.LogInModule.userInfo.user_email;
        this.inputHp = this.$store.state.LogInModule.userInfo.user_phone;
        this.postCode = this.$store.state.LogInModule.userInfo.user_add1;
        this.addr = this.$store.state.LogInModule.userInfo.user_add2;
        this.addrDetail = this.$store.state.LogInModule.userInfo.user_add3;
    }
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
    background-color: #f1eaf3;
}

h1 {
    font-size: 40pt;
    padding: 20px;
}

table {
    width: 60%;
    height: 50%;
    border-radius: 2%;
    background-color: rgba(38, 32, 41, 0.925);
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.5) inset;
    color: #dcd3df;
}

table th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.37);
    border-bottom-left-radius: 10%;
    font-size: 13pt;
    font-weight: bold;
}

table td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.37);
    border-bottom-right-radius: 10%;
    width: 70%
}

table td>input {
    height: 30px;
    /* background-color: rgba(231, 221, 221, 0.9); */
    background-color: rgba(124, 37, 124, 0.767);
    width: 80%;
    margin: 10px;
    padding: 0px 10px;
    font-size: 12pt;
    color: #d3d2d2;
}

.normalBtn {
    margin: 10px 10px;
    background-color: #fff;
    border: 1px solid purple;
}
</style>
