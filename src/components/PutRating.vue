<template>
    <div id="voteFace">
        <i class="far fa-laugh fa-5x" @click="faceChange"></i>
        <i class="far fa-smile fa-5x" @click="faceChange"></i>
        <i class="far fa-meh fa-5x" @click="faceChange"></i>
        <i class="far fa-frown fa-5x" @click="faceChange"></i>
        <i class="far fa-dizzy fa-5x" @click="faceChange"></i>
    </div>
</template>
<script>
// 자식 컴포넌트 import
/* eslint-disable */
export default {
    name: "PutRatingVue",
    props: [],
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
    },
    data() {
        return {
        }
    },
    methods: {
        faceChange() {
            // 클릭 시 , 색 반전
        }
    },
    computed: {},
    created() { }
}
</script>
<style scoped>
#voteFace {
    width: 460px;
    margin: 0 auto;
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    --black-color: #121212;
    --blue-color: #3f1fcf;
    --green-color: #37b007;
    --lightGreen-color: #a6e300;
    --yellow-color: #e8dc00;
    --orange-color: #e07f00;
    --red-color: #de2904;
}

/*
i {
  color: $blue;
}
*/

.fa-laugh {
    color: var(--green-color);

}

.fa-smile {
    color: var(--lightGreen-color);

}

.fa-meh {
    color: var(--yellow-color);

}

.fa-frown {
    color: var(--orange-color);

}

.fa-dizzy {
    color: var(--red-color);
}
</style>