import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            id: null,
            name: null,
            avatar: null,
        },
        friends: {

        },
        groups: {

        },
        sockets: {

        }
    },
    mutations: {
        setUser(state,data){
            state.user = {...data}
        },
        setFriends(state,data){

        },
        setGroups(state,data){

        },
        setSockets(state,data){
            
        }
    }
})