import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import HeaderComponent from './components/Header.vue'
import LotteryComponent from './components/Lottery.vue'
import DescriptionComponent from './components/description.vue'

let v = new Vue({
  el: '#app',
  template: `
        <v-app>
          <div>
              <header-component :title="title"/>
              <lottery-component />
              <description-component />
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
    'description-component': DescriptionComponent
  }
})
