<template>
    <MainDesign />
    <div>
        <h2>공지사항(Notice List)</h2>
        <ul>
            <li v-for="item in allList" :key="item.notice_no" @click="detailNotice(item)">제목: {{ item.notice_title
            }}<br />
                내용: {{ item.notice_content }}<br />
                조회수: {{ item.cntViews }}<br />
                작성자: {{ item.user_no }}
            </li>
        </ul>
    </div>
    <template v-if="userG == 'M'">
        <button type="button" @click="detailNotice()"> 새공지 작성</button>
    </template>
</template>
<script>
// 자식 컴포넌트 import
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "NoticeVue",
    props: [],
    components: {
        MainDesign
    },
    data() {
        return {
            userG: "",
        }
    },
    methods: {
        detailNotice(item) {
            console.log("여기햠슈");
            if (item == null) {
                this.$router.push({ name: "noticeDetail", params: { noticeNo: "new" } });
            } else {
                let noticeNo = item.notice_no;
                let userNo = this.$store.state.LogInModule.userNo;
                if (userNo != null) {
                    this.$store.dispatch("NoticeModule/upCnt", { noticeNo: noticeNo, userNo: userNo });
                    this.$router.push({ name: "noticeDetail", params: { noticeNo: noticeNo } });
                } else {
                    alert("로그인을 먼저 진행해주세요!");
                    return this.$router.push('/postList');
                }
            }
        },
    },
    computed: {
        allList() {
            return this.$store.state.NoticeModule.allList;
        },
    },
    created() {
        this.$store.dispatch("NoticeModule/allList");
        this.userG = this.$store.state.LogInModule.userGrade;
    }
}
</script>
<style scoped>
li {
    margin: 30px auto;
    border: 1px solid #000;
    list-style: cambodian;
}
</style>