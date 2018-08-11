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
        this.socket = this.$io.connect('localhost:8888/')
    },
    mounted(){
        this.socket.emit('login',"6666")
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

