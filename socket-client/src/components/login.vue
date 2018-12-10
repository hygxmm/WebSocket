<template>
    <div class="we-login">
        <mu-container>
            <mu-tabs :value.sync="active" color="primary" indicator-color="pink" full-width>
                <mu-tab>登陆</mu-tab>
                <mu-tab>注册</mu-tab>
            </mu-tabs>
            <div class="we-login-content" v-if="active === 0">
                <mu-text-field v-model="username" label="UserName" label-float icon="account_circle" max-length="12"></mu-text-field>
                <mu-text-field v-model="password" label="Password" label-float icon="locked" max-length="12"></mu-text-field>
                <mu-button color="primary" @click="handleLogin">登陆</mu-button>
            </div>
            <div class="we-login-content" v-if="active === 1">
                <mu-text-field v-model="username" label="UserName" label-float icon="account_circle" max-length="12"></mu-text-field>
                <mu-text-field v-model="password" label="Password" label-float icon="locked" max-length="12"></mu-text-field>
                <mu-button color="primary" @click="handleRegister">注册</mu-button>
            </div>
        </mu-container>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active: 0,
            username: '',
            password: '',
        }
    },
    methods: {
        handleLogin(){
            if(this.username && this.password){
                this.$io.emit('login',{
                    username: this.username,
                    password: this.password,
                    os: navigator.platform,
                    browser: navigator.appCodeName,
                    environment: navigator.appVersion
                })
                this.$io.on('login',(data) => {
                    if(data.success){
                        this.$toast.success(data.message)
                    }else{
                        this.$toast.error(data.message)
                        this.password = '';
                    }
                })
            }
        },
        handleRegister(){
            if(this.username && this.password){

                this.$io.emit('register',{
                    username: this.username,
                    password: this.password,
                    os: navigator.platform,
                    browser: navigator.appCodeName,
                    environment: navigator.appVersion
                })
                this.$io.on('register',(data) => {
                    if(data.success){
                        this.$toast.success(data.message)
                        this.active = 0;
                        this.password = '';
                    }else{
                        this.$toast.error(data.message)
                        this.username = '';
                        this.password = '';
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.we-login{
    width: 380px;
    height: 320px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
}
.we-login-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>


