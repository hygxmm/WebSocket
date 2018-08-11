<template>
    <div id="app">
        <div class="main">
            <Login v-if="!isLogin" @login="login"/>
            <Chat v-else />
        </div>
    </div>
</template>

<script>
import Login from '@/components/login.vue'
import Chat from '@/components/chat.vue'
export default {
    name: "app",
    data(){
        return {
            isLogin: false
        }
    },
    methods: {
        login(){
            this.isLogin = true
        }
    },
    components: {
        Login,
        Chat
    },
    created(){


    },
};
</script>

<style>
body{
    font-family: Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    background: url('./assets/bg.jpg') no-repeat 50%;
    background-size: cover;
}
#app{
    width: 100%;
    height: 100%;
}
.main{
    width: 1000px;
    height: 800px;
    color: #2c3e50;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
}
</style>
