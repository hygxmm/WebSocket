<template>
    <div class="we-chat">
        <Slide />
        <Content />
    </div>
</template>

<script>
import Slide from '@/components/chat/slide.vue'
import Content from '@/components/chat/content.vue'
export default {
    data(){
        return {
            socket: null
        }
    },
    components: {
        Slide,
        Content
    },
    created(){
        this.socket = this.$io.connect('http://localhost:8888/');
        if(window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')){
            window.Notification.requestPermission()
        }
    },
    mounted(){
        
    },
    destroyed(){
        this.socket = null
    }
}
</script>

<style lang="less" scoped>
.we-chat{
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
}

</style>

