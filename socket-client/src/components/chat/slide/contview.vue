<template>
    <div class="nav_view">
        <Component :is="nowComponent" />
    </div>
</template>

<script>
import Socket from './socketWrap.vue'
import Friend from './friendWrap.vue'
import Group from './groupWrap.vue'
export default {
    props: {
        prop: {
            type: String,
            default(){
                return 'Socket'
            }
        }
    },
    components: {
        Socket,
        Friend,
        Group
    },
    computed: {
        nowComponent(){
            return this.prop
        }
    }
}
</script>

<style lang="less" scoped>
.nav_view{
    position: absolute;
    top: 154px;
    right: 0;
    bottom: 0;
    left: 0;
}

</style>
