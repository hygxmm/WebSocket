<template>
    <div class="tab" ng-class="{no_reader: !isShowReader}">
        <div class="tab_item">
            <a class="chat" ui-sref="chat" ng-dblclick="dblclickChat()" title="聊天" href="#"><i class="web_wechat_tab_chat web_wechat_tab_chat_hl" ng-class="{web_wechat_tab_chat_hl: $state.includes('chat')}"></i></a>
        </div>
        <!-- ngIf: isShowReader --><div class="tab_item ng-scope" ng-if="isShowReader">
            <a class="chat" ui-sref="read" title="阅读" href="#"><i class="web_wechat_tab_public" ng-class="{web_wechat_tab_public_hl: $state.includes('read')}"></i></a>
        </div><!-- end ngIf: isShowReader -->
        <div class="tab_item no_extra">
            <a class="chat" ui-sref="contact" title="通讯录" href="#"><i class="web_wechat_tab_friends" ng-class="{web_wechat_tab_friends_hl: $state.includes('contact')}"></i></a>
        </div>
    </div>
        
    
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>

