<template>
    <div>
        <div v-for="group in groups">
            <div class="contact_item" @click="addToSocket(group)">
                <div class="avatar">
                    <img class="img" :src="group.avatar">
                </div>
                <div class="info">
                    <h4 class="nickname" v-text="group.name"></h4>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        addToSocket(data){
            console.log(data,"--------------")

        }
    },
    computed: {
        groups(){
            return this.$store.state.groups
        }
    }
}
</script>

<style lang="less" scoped>
.contact_item{

}

</style>
