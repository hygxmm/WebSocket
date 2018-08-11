import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import Axios from 'axios'

import './style/reset.css'
import 'muse-ui/dist/muse-ui.css'

import './socket'

Vue.use(MuseUI)
Vue.use(Toast, {
    position: 'top',
    time: 1000
});

Axios.defaults.withCredentials = true;
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')