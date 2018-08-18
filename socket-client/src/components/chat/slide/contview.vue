<template>
    <div class="nav_view">
        <Component :is="nowComponent" />
    </div>
</template>

<script>
import SocketWrap from './socketWrap.vue'
import FriendWrap from './friendWrap.vue'
import GroupWrap from './groupWrap.vue'
export default {
    props: [ 'prop' ],
    data(){
        return {
            nowComponent: 'GroupWrap'
        }
    },
    components: {
        SocketWrap,
        FriendWrap,
        GroupWrap
    },
    updated() {
        console.log(this.prop)
    },
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
