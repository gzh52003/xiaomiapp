import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'

//全部引入
// import Vant from 'vant'
// import 'vant/lib/index.css';
// Vue.use(Vant)

//按需引入
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style;'
// Vue.use(Button);


//利用工具实现按需引入
//babel-plugin-import

Vue.config.productionTip = false
Vue.prototype.$request = request;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// designSize:设计图尺寸(传@1x倍图尺寸,例如设计图是750px,2倍图,那么传375),rootValue:比例,默认100
// function sethtml(designSize: number, rootValue: number) {
//   let rootV = 100;
//   if (rootValue) {
//     rootV = rootValue;
//   }
//   // 窗口宽度
//   const winWidth = window.document.documentElement.clientWidth;
//   // 如果窗口宽度超过1.5倍设计图了,则不再调整
//   if (winWidth > 1.5 * designSize) {
//     return;
//   }
//   // window.console.log(winWidth);
//   const htmlFontSize = winWidth * rootV / designSize;
//   window.document.documentElement.style.fontSize = htmlFontSize + 'px';
// }

// sethtml(375)