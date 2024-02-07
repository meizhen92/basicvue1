<template>
    <div class="container">
        <h1 class="mainLogo">
            MJ's favorite Movies Collection
        </h1>
        <MainDesign :isNm="isCookieNm" />
        <LogIn v-if="this.openModal == true" ref="inputFocus" @sendClose="closeModalView" />
        <div id="userInfoDiv">
            <div v-if='isCookieNm'>
                <template v-if="`${this.grade}` == 'U'">
                    <PostList />
                </template>
                <template v-else-if="`${this.grade}` == 'M'">
                    <div class="M">
                        <div class="mainP_top">
                            <router-link to="/manageEmployee"><button
                                    class="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick"
                                    data-text="Manage!"><span>직원 관리 페이지로</span></button></router-link>
                        </div>
                        <div class="mainP_middle">
                            <router-link to="/manageContent"><button
                                    class="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick"
                                    data-text="list Up!"><span>콘텐츠 등록 페이지로</span></button></router-link>
                        </div>
                        <div class="mainP_bottom">
                            <button
                                class="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick"
                                data-text="develope!"><span>개발 중</span></button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div>빠른시일 내에 유저 등급 심사를 시작하겠습니다. 유저 등급부터 서비스 이용이 가능합니다.</div>
                </template>
            </div>
            <p v-else>로그인이 필요한 서비스입니다!
                <button type="button" @click="LogInPop()" class="normalBtn">로그인</button>
            </p>
        </div>
    </div>
</template>

<script>
// 자식 컴포넌트 import
import PostList from "../components/PostList.vue";
import LogIn from "../components/LogIn.vue";
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "MovieViewVue",
    data() {
        return {
            openModal: false,
            isCookieNm: "",
            grade: "",
        }
    },
    components: {
        PostList, LogIn, MainDesign
    },
    methods: {
        LogInPop() {
            this.openModal = true;
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                console.log("ref확인:", this.$refs.inputFocus);
                this.$refs.inputFocus.focus();
            }, 200);
        },
        closeModalView(data) {
            this.openModal = data;
            document.body.style.removeProperty('overflow');
        },
    },
    created() {
        this.isCookieNm = this.$store.state.LogInModule.userNm;
        this.grade = this.$store.state.LogInModule.userGrade;
    },
};
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

.mainLogo {
    font-size: 40pt;
    height: 150px;
    text-align: center;
    line-height: 200px;
}

#userInfoDiv p {
    float: right;
}

/* 관리자 대시보드 */
.M {
    width: 100%;
    display: flex;
    justify-content: center;
}

.mainP_top {
    height: 30%;
    width: 30%;
}

.mainP_middle {
    height: 30%;
    width: 30%;
}

.mainP_bottom {
    height: 30%;
    width: 30%;
}

.button {
    float: left;
    min-width: 150px;
    max-width: 250px;
    display: block;
    margin: 1em;
    padding: 1em 2em;
    border: none;
    background: none;
    color: inherit;
    vertical-align: middle;
    position: relative;
    z-index: 1;
    -webkit-backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
}

.button:focus {
    outline: none;
}

.button>span {
    vertical-align: middle;
}

/* Winona */
.button--winona {
    overflow: hidden;
    padding: 0;
    -webkit-transition: border-color 0.3s, background-color 0.3s;
    transition: border-color 0.3s, background-color 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}

.button--winona::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    color: #3f51b5;
    -webkit-transform: translate3d(0, 25%, 0);
    transform: translate3d(0, 25%, 0);
}

.button--winona>span {
    display: block;
}

.button--winona.button--inverted {
    color: #7986cb;
}

.button--winona.button--inverted:after {
    color: #fff;
}

.button--winona::after,
.button--winona>span {
    padding: 1em 2em;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}

.button--winona:hover {
    border-color: #3f51b5;
    background-color: rgba(63, 81, 181, 0.1);
}

.button--winona.button--inverted:hover {
    border-color: #21333C;
    background-color: #21333C;
}

.button--winona:hover::after {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.button--winona:hover>span {
    opacity: 0;
    -webkit-transform: translate3d(0, -25%, 0);
    transform: translate3d(0, -25%, 0);
}

.button--border-thick {
    border: 3px solid;
}

.button--round-l {
    border-radius: 40px;
}

.button--text-upper {
    letter-spacing: 2px;
    text-transform: uppercase;
}

.button--size-s {
    font-size: 14px;
}

.button--text-thick {
    font-weight: 600;
}
</style>