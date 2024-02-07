<template>
    <div>
        <div class="mainLogo_css" id="mainLogo_css1"></div>
        <div class="mainLogo_css" id="mainLogo_css2"></div>
        <div class="mainLogo_css" id="mainLogo_css3"></div>
        <div class="mainLogo_css" id="mainLogo_css4"></div>
        <div id="mainLogo_css9"></div>
        <div class="mainLogo_css" id="mainLogo_css5"></div>
        <div class="mainLogo_css" id="mainLogo_css6"></div>
        <div class="mainLogo_css" id="mainLogo_css7"></div>
        <div class="mainLogo_css" id="mainLogo_css8"></div>
    </div>
    <p v-if="isNm">
        <img :src="require(`../assets/temp/${file_rel}`)" class="userProfile" />
        {{ isNm }}님, 환영합니다!
        <button type="button" @click="LogOut()">로그아웃</button><br />
        <button><router-link to="/myPage">마이페이지로 이동</router-link></button>
    </p>
    <p v-else>
        -
    </p>
</template>
<script>
/* eslint-disable */
export default {
    name: "MainDesingVue",
    data() {
        return {
            file_rel: "",
            isNm: "",
        }
    },
    methods: {
        LogOut() {
            this.$store.commit('LogInModule/logout');
            document.location.href = "/postList";
        },
        getCookieFileRel() {
            let pro = "userProfile";
            let match = document.cookie.match(new RegExp(pro + '=([^;]+)'));
            if (match) {
                console.log(match);
                return match[1];
            } else {
                console.log("getCookieFileRel null");
            }
        },
    },
    created() {
        this.file_rel = this.getCookieFileRel();
        this.isNm = this.$store.state.LogInModule.userNm;
    },
}
</script>
<style scoped>
.mainLogo_css {
    width: 100px;
    height: 100px;
    background-color: purple;
    border-radius: 50%;
    position: absolute;
}

#mainLogo_css1 {
    opacity: 0.9;
    left: 10px;
    top: 30px;
}

#mainLogo_css2 {
    opacity: 0.8;
    left: 100px;
    top: 30px;

    z-index: 999;
}

#mainLogo_css3 {
    opacity: 0.7;
    left: 190px;
    top: 30px;
}

#mainLogo_css4 {
    opacity: 0.6;
    left: 280px;
    top: 30px;
}

#mainLogo_css5 {
    opacity: 0.6;
    right: 280px;
    top: 30px;
}

#mainLogo_css6 {
    opacity: 0.7;
    right: 190px;
    top: 30px;
}

#mainLogo_css7 {
    opacity: 0.8;
    right: 100px;
    top: 30px;
}

#mainLogo_css8 {
    opacity: 0.9;
    right: 10px;
    top: 30px;
}

.userProfile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>