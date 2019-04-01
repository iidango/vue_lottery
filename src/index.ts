import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import HeaderComponent from './components/Header.vue'
import LotteryComponent from './components/Lottery.vue'
import TestComponent from './components/test.vue'

let v = new Vue({
  el: '#app',
  template: `
        <v-app>
          <div>
              <header-component :title="title"/>
              <lottery-component />
              <test-component />
          </div>
        </v-app>
    `,
  data: () => {
    return{
      title: 'Vue lottery!!'
    }
  },
  components: {
    'header-component': HeaderComponent,
    'lottery-component': LotteryComponent,
    'test-component': TestComponent
  }
})
