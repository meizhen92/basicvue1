<template>
    <h1 class="mainLogo">유저 관리 페이지</h1>
    <MainDesign />
    <div class="container">
        <div id="chart"></div>
        <div id="userGradeManege">
            <button @click="updateWaitList">대기 중인 게스트 등급 유저 목록 확인하기</button>
            <template v-if="guestList.length > 0">
                <ul v-for="item in guestList" :key="item.user_no">
                    <li>게스트명: {{ item.user_no }}, 현재 등급: {{ item.user_grade }}
                        <button type="button" @click="updateGradeU(item.user_no)">유저등급으로</button>
                    </li>
                </ul>
            </template>
            <template v-else-if="guestList.length < 1">
                <h5>유저등급으로 수정을 기다리는 게스트등급이 없습니다</h5>
            </template>
            <template v-else>
                <h5>위에 확인하기 버튼을 눌러주세요</h5>
            </template>
        </div>
    </div>
</template>
<script>
// 라이브러리
import ApexCharts from 'apexcharts';
// 자식 컴포넌트 import
import MainDesign from "../components/MainDesign.vue";
/* eslint-disable */
export default {
    name: "ManageEmployeeVue",
    props: [],
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        MainDesign
    },
    data() {
        return {
        }
    },
    methods: {
        updateWaitList() {
            this.$store.dispatch("UpdateGradeModule/updateWaitList");
        },
        updateGradeU(val) {
            this.$store.dispatch("UpdateGradeModule/updateGradeU", val);
        },
    },
    computed: {
        guestList() {
            return this.guestList = this.$store.state.UpdateGradeModule.guestList;
        },
    },
    mounted() {
        // 이용자 수 통계 그래프( apexchart )
        var options = {
            chart: {
                type: 'line',
                title: {
                    text: '총 유저 추이',
                    align: 'center',
                    style: {
                        fontSize: '15px',
                        color: 'gray',
                    }
                }
            },
            series: [{
                name: 'sales',
                data: [1, 41, 90, 120, 150]
            }],
            xaxis: {
                categories: [2020, 2021, 2022, 2023, 2024]
            }
        }
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        // 이용자 수 통계 그래프( apexchart ) -- End
    },
}
</script>
<style scoped>
.mainLogo {
    font-size: 40pt;
    height: 150px;
    text-align: center;
    line-height: 200px;
}

.container {
    display: flex;
}

#chart {
    width: 500px;
    height: 500px;
}

#userGradeManege {}
</style>