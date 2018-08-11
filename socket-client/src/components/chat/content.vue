<template>
    <div class="we-content">
        <Head />
        <Body />
        <Foot />
        <!-- <div class="catch-drop-area"></div> -->
    </div>
</template>

<script>
import Head from './content/head.vue'
import Body from './content/body.vue'
import Foot from './content/foot.vue'
export default {
    methods: {
        test(){
            let title = Math.random().toString(36)
            let msg = Math.random().toString(36)+Math.random().toString(36)+Math.random().toString(36)
            this.createNotice(title,msg)
        },
        createNotice(title,msg){
            const Notification = window.Notification || window.mozNotification || window.webkitNotification;
            let data = {
                body: msg,
                icon: ''
            }
            if(Notification && Notification.permission == "granted"){
                const instance = new Notification(title, data);
                instance.onclick = () => {
                    instance.close()
                }
            }else{
                Notification.requestPermission(status => {
                    if(status === "granted"){
                        const instance = new Notification(title, data);
                        instance.onclick = () => {
                            instance.close()
                        }
                    }else{
                        return false
                    }
                })
            }
        }
    },
    components: {
        Head,
        Body,
        Foot
    }
}
</script>

<style lang="less" scoped>
.we-content{
    flex: 1;
    position: relative;
    background-color: rgb(238, 238, 238);
    overflow: hidden;
}
.catch-drop-area{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 501;
}
</style>


