import Vue from 'vue'

import HeaderComponent from './components/Header.vue'
import LotteryComponent from './components/Lottery.vue'

let v = new Vue({
  el: '#app',
  template: `
        <div>
            <header-component :title="title"/>
            <lottery-component />
        </div>
    `,
  data: () => {
    return{
      title: 'Vue lottery!!'
    }
  },
  components: {
    'header-component': HeaderComponent,
    'lottery-component': LotteryComponent
  }
})
