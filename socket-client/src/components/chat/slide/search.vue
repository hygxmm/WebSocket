<template>
    <div class="search_bar">
        <i class="web_wechat_search"></i>
        <input class="frm_search" type="text" v-model="keyword" @change="search" placeholder="搜索用户">
    </div>
</template>

<script>
export default {
    data(){
        return {
            keyword: ''
        }
    },
    methods: {
        search(){
            let text = this.keyword;
            if(text){
                this.$axios.post('/search',{
                    name: text
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.error(err)
                })
            }

        }
    }
}
</script>

<style lang="less" scoped>
.search_bar{
    position: relative;
    width: 244px;
    margin: 0 auto 6px;
}
.web_wechat_search{
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    position: absolute;
    top: 1px;
    z-index: 101;
    background: url('../../../assets/icon.png') no-repeat;
    background-position: -60px -432px;
    background-size: 487px 462px;
}
.frm_search{
    width: 214px;
    height: 32px;
    line-height: 32px;
    border: 0;
    border-radius: 2px;
    background-color: rgb(38, 41, 46);
    color: rgb(255, 255, 255);
    padding-left: 30px;
    font-size: 12px;
}
</style>
