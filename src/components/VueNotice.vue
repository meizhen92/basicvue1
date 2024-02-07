<template>
    <h1>영화제목: <input /></h1>
    개봉일: <input /> <br />
    평점: <input /> <br />
    주연: <input /> <br />
    감독: <input /> <br />
    <quill-editor v-model:value="state.content"></quill-editor>
</template>
<script>
// 자식 컴포넌트 import
import { reactive } from 'vue'
/* eslint-disable */
export default {
    name: "VueNoticeVue",
    setup() {
        const state = reactive({
            content: '',
            _content: '',
            editorOption: {
                placeholder: '',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'rtl' }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ]
                }
                // more options
            },
            disabled: false
        })
        const onEditorBlur = (quill) => {
            console.log('editor blur!', quill)
        }
        const onEditorFocus = (quill) => {
            console.log('editor focus!', quill)
        }
        const onEditorReady = (quill) => {
            console.log('editor ready!', quill)
        }
        const onEditorChange = ({ quill, html, text }) => {
            console.log('editor change!', quill, html, text)
            state._content = html
        }
        setTimeout(() => {
            state.disabled = true
        }, 2000)
        return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
    }
}
</script>
<style scoped></style>