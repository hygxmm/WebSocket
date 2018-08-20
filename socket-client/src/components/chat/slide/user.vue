<template>
    <div class="header">
        <div class="avatar">
            <img class="img" :src="userData.avatar">
        </div>
        <div class="info">
            <h3 class="nickname">
                <span class="display_name" v-text="userData.name"></span>
                <a class="opt" href="javascript:;" @click="toggleSystemMenu">
                    <i class="web_wechat_add"></i>
                </a>
            </h3>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed: {
        userData(){
            return this.$store.state.user
        },
    },
    methods: {
        toggleSystemMenu(){

        }
    }
}
</script>

<style lang="less" scoped>
.header{
    padding: 18px;
    position: relative;
    .avatar{
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        white-space: nowrap;
        padding-right: 10.625px;
        .img{
            width: 40px;
            height: 40px;
            border-radius: 2px;
            display: block;
            cursor: pointer;
        }
    }
    .info{
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        width: 2000px;
        .nickname{
            .display_name{
                display: inline-block;
                font-weight: 400;
                width: 156px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                color: rgb(255, 255, 255);
                font-size: 18px;
                vertical-align: top;
                line-height: 31px;
                text-decoration: none;
            }
            .opt{
                display: inline-block;
                vertical-align: top;
                .web_wechat_add{
                    display: inline-block;
                    vertical-align: middle;
                    width: 30px;
                    height: 30px;
                    background: url('../../../assets/icon.png') no-repeat;
                    background-position: -434px -398px;
                    background-size: 487px 462px;
                }
            }
        }

    }
}

</style>
