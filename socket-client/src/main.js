import Vue from 'vue'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import Axios from 'axios'
import socket from 'socket.io-client'
import store from './store/index.js'

import App from './App.vue'

import './style/reset.css'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.use(Toast, {
    position: 'top',
    time: 1000
});

Axios.defaults.withCredentials = true;
Vue.prototype.$io = socket;
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