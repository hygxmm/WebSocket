<template>
    <div class="we-slide">
        <User />
        <Search />

    </div>
</template>

<script>
import User from './slide/user.vue'
import Search from './slide/search.vue'
export default {
    components: {
        Search,
        User
    }
    
}
</script>


<style lang="less" scoped>
.we-slide{
    width: 280px;
    background-color: rgb(46, 50, 56);
}
</style>

