<template>
    <form>
        제목:<input type="text" v-model="no_title" id="editorTitle" />
        <div id="textDiv">
            <textarea cols="30" rows="10" class="form-control" name="editorTxt" id="editorTxt"
                placeholder=" 내용을 입력해주세요"></textarea>
        </div>
        <button type="button" @click="insertNotice(this)">등록</button>
        <button type="button">취소</button>
    </form>
</template>
<script>
// 자식 컴포넌트 import
/* eslint-disable */
export default {
    name: "SmartNoticeVue",
    props: [],
    components: {
    },
    data() {
        return {
            // 네이버스마트에디터 바인딩
            oEditors: [],
            elPlaceHolder: "editorTxt",
            sSkinURI: "../../smartEditor/package/dist/SmartEditor2Skin.html", // public빼기
            htParams: {
                bUseToolbar: true,   // 글꼴 등 툴바
                bUseVerticalResizer: true, // 입력창 마우스로 height조절
                bUseModeChanger: true,  // editor, html, text 모드 변경
            },
            // data
            no_title: "",
            no_content: "",
        }
    },
    methods: {
        // 네이버스마트에디터 초기화
        editorTxtHusky() {
            nhn.husky.EZCreator.createInIFrame({
                oAppRef: this.oEditors,
                elPlaceHolder: this.elPlaceHolder, // textarea id값
                sSkinURI: this.sSkinURI, // 디자인
                htParams: this.htParams,
            });
        },
        insertNotice(data) {
            let frm = new FormData();
            console.log(this.oEditors.getById["editorTxt"].exec("UPDATE_CONTENTS_FIELD", []));
            this.oEditors.getById["editorTxt"].exec("UPDATE_CONTENTS_FIELD", []);
            this.no_content = document.getElementById("editorTxt").value;
            console.log(this.no_content);
            frm.append('noTitle', this.no_title);
            frm.append('noContent', this.no_content);
            frm.append('userNo', this.$store.state.LogInModule.userNo);
            this.$store.dispatch("NoticeModule/insertNoticeAC", frm);
        },
    },
    watch: {

    },
    mounted() {
        this.editorTxtHusky();
    },
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

#editorTitle {
    width: 50%;
    border: 1px solid gray;
}

#textDiv {
    margin-top: 2px;
    margin-left: 400px;
    margin-bottom: 10px;
}

#editorTxt {
    width: 70%;
}
</style>