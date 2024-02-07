<!-- SFC(Single File Component)문법 -->
<!-- 마크업  -->
<!-- 부모 컴포넌트 (PostList.vue) -->
<template>
    <div id="postList">
        <Post :Post="movieInfo" />
    </div>
</template>
<!-- 스크립트 -->
<script>
// 자식 컴포넌트 import
import Post from './Post.vue';

// props, data, methods, lifecycle, computed, watch ...
export default {
    name: 'PostListVue',
    data() {
        return {
        }
    },
    components: {
        // ES6 부터 key,value 같을 때 생략 가능
        Post
    },
    computed: {
    },
}
</script>
<!-- 스타일시트 -->
<style scoped></style>