<template>
    <button> <router-link to="/postList">전체목록으로 돌아가기</router-link></button>
    <div v-if="num == 'new'">
        <NewPost />
    </div>
    <div v-else>
        <div>
            <h1>수다방 화면 접속</h1>
        </div>
        <div v-for="item in exportMovieInfo" :key="item">
            <div v-if="item.movie_no == num">
                <div>
                    <img :src="require(`../assets/${num}.jpg`)" />
                </div>
                <p>제목: {{ item.movie_title }}<br />
                    개봉일: {{ item.movie_rel_date }}<br />
                    평점: {{ item.movie_rating }}<br />
                    주연: {{ item.movie_main_actor }}<br />
                    감독: {{ item.movie_director }}
                </p>
            </div>
        </div>
        <div>
            <h1 style="border:1px solid #000"> 댓글 기능 추가할 공간</h1>
            <div>

            </div>
            <div>
                <PutRating />
            </div>
        </div>
    </div>
</template>
<script>
// 자식 컴포넌트 import
import PutRating from "../components/PutRating.vue";
import NewPost from "../components/VueNotice.vue";
/* eslint-disable */
export default {
    name: "MovieSudaVue",
    props: {
        num: {
            type: String,
            default: ''
        },
    },
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        PutRating, NewPost
    },
    data() {
        return {
        }
    },
    methods: {},
    computed: {
        exportMovieInfo() {
            return this.$store.state.MovieDataModule.movieInfo;
        },
    },
}
</script>
<style scoped></style>