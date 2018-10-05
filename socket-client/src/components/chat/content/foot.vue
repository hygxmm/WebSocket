<template>
    <div class="box_ft" v-show="true">
        <div class="toolbar">
            <a class="web_wechat_face" @click="" title="表情"></a>
            <a class="web_wechat_pic js_fileupload ng-isolate-scope webuploader-container" @click="" title="图片和文件">
                <div class="webuploader-pick"></div>
                <div v-show="false" style="position: absolute; top: 0px; left: 0px; width: 30px; height: 30px; overflow: hidden; bottom: auto; right: auto;">
                    <input type="file" name="file" class="webuploader-element-invisible" multiple="multiple">
                    <label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                </div>
            </a>
        </div>
        <div class="content">
            <pre class="edit_area" contenteditable="true" ref="textarea"></pre>
        </div>
        <div class="action">
            <span class="desc">按下Ctrl+Enter换行</span>
            <span class="btn_send" @click="sendMessage">发送</span>
        </div>
        <div></div>
    </div>
</template>

<script>
export default {
    methods: {
        sendMessage(){
            const mes = this.$refs.textarea.innerHTML;
            
            console.log(mes,"-----")
        }

    }
}
</script>


<style lang="less" scoped>
.box_ft{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 180px;
    margin-right: 19px;
    border-top: 1px solid rgb(214,214,214);
    box-sizing: content-box;
    .toolbar{
        height: 30px;
        padding: 5px 17px;
        .web_wechat_face{
            width: 30px;
            height: 30px;
            background: url('../../../assets/icon.png') no-repeat;
            background-position: -404px -398px;
            background-size: 487px 462px;
            display: inline-block;
            vertical-align: middle;
        }
        .web_wechat_pic{
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            background: url('../../../assets/icon.png') no-repeat;
            background-position: -120px -432px;
            background-size: 487px 462px;
            position: relative;
        }
    }
    .action{
        text-align: right;
        margin-top: 5px;
        .desc{
            color: rgb(136, 136, 136);
            font-size: 12px;
            margin-left: 10px;
            margin-right: 7px;
        }
        .btn_send{
            background-color: rgb(255, 255, 255);
            color: rgb(34, 34, 34);
            padding-left: 30px;
            padding-right: 30px;
            text-decoration: none;
            display: inline-block;
            border: 1px solid rgb(193, 193, 193);
            border-radius: 4px;
            padding: 3px 20px;
            font-size: 14px;
        }
        .btn_send:hover{
            background-color: rgb(248, 248, 248);
        }
    }
}

.edit_area{
    display: block;
    font-size: 14px;
    height: 6em;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 20px;
    outline: none;
    border: 0;
    margin: 0;
    font-family: inherit;
    // font-size: inherit;
    white-space: pre-wrap;
    word-break: normal;
}

</style>

