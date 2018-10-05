import Vue from 'vue'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import Axios from 'axios'
import Socket from 'socket.io-client'
import store from './store/index.js'

import App from './App.vue'

import './style/reset.css'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.use(Toast, {
    position: 'top',
    time: 1000
});

Vue.prototype.$io = Socket.connect('http://localhost:8888/');

Axios.defaults.withCredentials = true;
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    components: {
        App
    },
    template: '<App/>'
})