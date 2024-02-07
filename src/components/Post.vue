<template>
    <input type="text" placeholder="검색어를 입력해주세요" @keyup.enter="clickEvent()" v-model="searchText" />
    <button type="button" @click="searchMovie()" class="normalBtn">검색</button>
    <button type="button" @click="renderPageSuda()" class="normalBtn">새 영화 추가</button>
    <!-- 펼쳐보기/닫기 버튼 클릭 -->
    <div class="postTopDiv" v-show="togAllMovie">
        <!-- src에 require는 String으로 불러와지는걸 경로로 import한다는 명령어 -->
        <div class="postDiv" v-for="item in exportMovieInfo" :key="item">
            <div>
                <img :src="require(`../assets/${item.movie_no}.jpg`)" />
            </div>
            <p>제목: {{ item.movie_title }}<br />
                개봉일: {{ item.movie_rel_date }}<br />
                평점: {{ item.movie_rating }}<br />
                주연: {{ item.movie_main_actor }}<br />
                감독: {{ item.movie_director }}
            </p>
            <button @click="renderPageNamu(item.movie_title)">나무위키로🛫</button>
            <button @click="renderPageSuda(item.movie_no)">리뷰수다방💬</button>
        </div>
    </div>
    <!-- 검색 버튼 클릭 -->
    <div class="postTopDiv" v-show="togSearchMovie">
        <template v-if="selMovie.length !== 0">
            <div class="postDiv" v-for="item in selMovie" :key="item">
                <div>
                    <img :src="require(`../assets/${item.movie_no}.jpg`)" />
                </div>
                <p>제목: {{ item.movie_title }}<br />
                    개봉일: {{ item.movie_rel_date }}<br />
                    평점: {{ item.movie_rating }}<br />
                    주연: {{ item.movie_main_actor }}<br />
                    감독: {{ item.movie_director }}
                </p>
                <button @click="renderPageNamu(item.movie_title)">나무위키로🛫</button>
                <button @click="renderPageSuda(item.movie_title)">리뷰수다방💬</button>
            </div>
        </template>
        <template v-else>
            <h3>검색어에 해당되는 영화가 없습니다.</h3>
        </template>
    </div>
    <div>
        <button type="button" @click="movieData()" class="basicBtn"> 전체목록 펼쳐보기 </button>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'PostVue',
    data() {
        return {
            togAllMovie: false,
            searchText: "",
            togSearchMovie: false,
        }
    },
    methods: {
        movieData() {
            this.$store.dispatch('MovieDataModule/movieData');
            this.togAllMovie = true;
            this.togSearchMovie = false;
            this.searchText = "";
        },
        searchMovie() {
            this.$store.dispatch('SearchMovieModule/searchMovie', this.searchText);
            this.togAllMovie = false;
            this.togSearchMovie = true;
        },
        renderPageNamu(itemNm) {
            window.open("https://namu.wiki/w/" + itemNm, "_blank", "width=1000, height=800");
        },
        renderPageSuda(itemNo) {
            if (itemNo == null) {
                this.$router.push({ name: "movieSuda", params: { num: "new" } })
            } else {
                this.$router.push({ name: "movieSuda", params: { num: itemNo } })
            }
        },
        clickEvent() {
            this.searchMovie();
        },
    },
    computed: {
        exportMovieInfo() {
            return this.$store.state.MovieDataModule.movieInfo;
        },
        selMovie() {
            return this.$store.state.SearchMovieModule.selMovieInfo;
        }
    }
}
</script>
<style scoped>
.postTopDiv {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.postDiv {
    border: 1px dotted #bbbaba;
    width: 17%;
    margin: 5px;
    padding: 10px;
}

.postDiv>div {
    width: 150px;
    height: 150px;
    background-color: #000;
    margin: 0 auto;
}

.postDiv img {
    /* line-height: 120px; */
    width: 140px;
    height: 140px;
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

.normalBtn {
    margin: 10px 10px;
    background-color: #fff;
    border: 1px solid purple;
}
</style>