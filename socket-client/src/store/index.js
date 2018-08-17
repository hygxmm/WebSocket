import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            id: null,
            name: null,
            avatar: null,
        },
        friends: [],
        groups: [],
        sockets: [],
        nowChat: {
            type: '',//私聊还是群组
            id: '',
        }
    },
    mutations: {
        setUser(state,data){
            state.user = {...data}
        },
        setFriends(state,data){
            state.friends = [...data]
        },
        setGroups(state,data){
            state.groups = [...data]
        },
        setSockets(state,data){
            state.sockets = [...data]
        }
    }
})