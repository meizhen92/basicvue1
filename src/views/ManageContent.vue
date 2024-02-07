<template>
    <h1 class="mainLogo">콘텐츠 관리 페이지</h1>
    <MainDesign />
</template>
<script>
// 자식 컴포넌트 import
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "ManageContentVue",
    props: [],
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        MainDesign
    },
    data() {
        return {
        }
    },
    methods: {},
    computed: {},
}
</script>
<style scoped>
.mainLogo {
    font-size: 40pt;
    height: 150px;
    text-align: center;
    line-height: 200px;
}
</style>