<template>
    <div class="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style="position: absolute;">
        <div class="box_bd chat_bd scrollbar-dynamic scroll-content" style="margin-bottom: 0px; margin-right: 0px; height: 510px;">
            <div mm-repeat="message in chatContent" data-height-calc="heightCalc" data-buffer-height="300" data-pre-calc="true" class="ng-scope">
                <div class="top-placeholder" style="height: 0px;"></div>
                <div class="bottom-placeholder" style="height: 0px;"></div>
            </div>
            <div id="prerender" style="visibility: hidden;position: absolute;width: 100%;top: 333px;height: 0;padding: 0 19px;margin-left: -19px;overflow: hidden;"></div>
            <div v-if="" class="message_empty">
                <i class="web_wechat_nomes_icon ng-hide" ng-hide="currentContact.getDisplayName()"></i>
                <p ng-show="currentContact.getDisplayName()" class="">暂时没有新消息</p>
                <p ng-hide="currentContact.getDisplayName()" class="ng-hide">未选择聊天</p>
            </div>
        </div>
    </div>
</template>

<script>
import util from '../../../utils/index.js'
export default {
    data(){
        return {

        }
    },
    created(){
        // let count = 0;
        // let createNot = setInterval(()=>{
        //     if(count > 10){
        //         clearInterval(createNot)
        //         return
        //     }
        //     let title = Math.random().toString(36).substr(2);
        //     let avatar = `http://localhost:7777/avatar/${Math.ceil(Math.random()*8)}.png`;
        //     let text  = '测试信息'+Math.random().toString(36).substr(2).repeat(5);
        //     util.createNewNot(title,avatar,text)
        //     count++
        // },500)
    }
}
</script>


<style lang="less" scoped>
.scroll-wrapper{
    position: absolute;
    bottom: 180px;
    top: 51px;
    left: 0;
    right: 0;
    overflow: hidden;
}

</style>

