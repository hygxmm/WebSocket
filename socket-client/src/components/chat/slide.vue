<template>
    <div class="we-slide">
        <User />
        <Search />
        <Tab @switchCont="switchCont" />
        <ContView :prop="nowCont" />
    </div>
</template>

<script>
import User from './slide/user.vue'
import Search from './slide/search.vue'
import Tab from './slide/tab.vue'
import ContView from './slide/contView.vue'

export default {
    data(){
        return {
            nowCont: 'Socket'
        }
    },
    methods: {
        switchCont(type){
            this.nowCont = type
        }
    },
    components: {
        Search,
        User,
        Tab,
        ContView
    },
}
</script>


<style lang="less" scoped>
.we-slide{
    width: 280px;
    background-color: rgb(46, 50, 56);
    position: relative;
}
</style>

