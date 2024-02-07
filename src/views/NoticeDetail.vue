<template>
    <MainDesign />
    <div v-if="noticeNo != 'new'">
        <div v-for="item in allList" :key="item">
            <div v-if="item.notice_no == noticeNo">
                <table>
                    <tr>
                        <th>제목</th>
                        <td>{{ item.notice_title }}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>{{ item.notice_content }}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{{ item.cntViews }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div v-else>
        <br />
        <h1>새 공지사항 작성</h1>
        <div>
            <SmartNoticevue />
        </div>
    </div>
</template>
<script>
// 자식 컴포넌트 import
import SmartNoticevue from '../components/SmartNotice.vue';
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "NoticeDetailVue",
    props: {
        noticeNo: {
            type: String,
            dafault: ''
        },
    },
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        SmartNoticevue, MainDesign
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        allList() {
            return this.$store.state.NoticeModule.allList;
        }
    },
    mounted() {
        this.$store.dispatch("NoticeModule/allList");
    }
}
</script>
<style scoped>
table,
td {
    border: 1px solid #000;
}

table {
    margin: 100px auto;
}
</style>