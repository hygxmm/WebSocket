<template>
    <div class="tab">
        <div class="tab_item">
            <a class="chat" title="聊天" href="#" @click="switchContent('socket')">
                <i class="web_wechat_tab_chat" :class="{web_wechat_tab_chat_hl: activeIndex == 1}"></i>
            </a>
        </div>
        <div class="tab_item">
            <a class="chat" title="好友" href="#" @click="switchContent('friend')">
                <i class="web_wechat_tab_friends" :class="{web_wechat_tab_friends_hl: activeIndex == 2}"></i>
            </a>
        </div>
        <div class="tab_item no_extra">
            <a class="chat" title="群组" href="#" @click="switchContent('group')">
                <i class="web_wechat_tab_public" :class="{web_wechat_tab_public_hl: activeIndex == 3}"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            activeIndex: 1
        }
    },
    methods: {
        switchContent(type){
            switch(type){
                case 'chat':
                    this.activeIndex = 1
                break;
                case 'friend':
                    this.activeIndex = 2
                break;
                case 'group':
                    this.activeIndex = 3
                break;
            }
            this.$emit('switchCont',type)
        }
    }
    
}
</script>

<style lang="less" scoped>
.tab{
    overflow: hidden;
    position: relative;
    padding-bottom: 4px;
    .tab_item{
        float: left;
        width: 33.33333333%;
        position: relative;
        &>a{
            display: block;
            text-align: center;
        }
    }
    .tab_item::after{
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 0;
        height: 20px;
        border-right: 1px solid rgb(36, 39, 44);
    }
}

.web_wechat_tab_chat{
    display: inline-block;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    background: url('../../../assets/icon.png') no-repeat;
    background-position: -150px -96px;
    background-size: 487px 462px;
}
.web_wechat_tab_chat_hl{
    background-position: -185px -96px;
    background-size: 487px 462px;
}
.web_wechat_tab_friends{
    display: inline-block;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    background: url('../../../assets/icon.png') no-repeat;
    background-position: -220px -96px;
    background-size: 487px 462px;
}
.web_wechat_tab_friends_hl{
    background-position: -304px -246px;
    background-size: 487px 462px;
}
.web_wechat_tab_public{
    display: inline-block;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    background: url('../../../assets/icon.png') no-repeat;
    background-position: -376px -322px;
    background-size: 487px 462px;

}
.web_wechat_tab_public_hl{
    background-position: -304px -281px;
    background-size: 487px 462px;
}




</style>

