// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import filter from './filter/filter'
import { Message } from 'element-ui';
import '../static/sass/all.scss';


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(filter);

/* ExtendPlugin */
import ExtendPlugin from './plugins/vue.ext.js'
Vue.use(ExtendPlugin)

//全局方法 begin
Vue.prototype.getUserOrgId = function(){
  return JSON.parse(sessionStorage.getItem('userInfo')).org_id;
};

Vue.prototype.checkDate = function (startDate, endDate) {
  if (endDate < startDate) {
    return false;
  } else {
    return true;
  }
}
//全局方法 end


/* lodashPlugin */
import _ from './service/lodashService'
Vue.use(_)

/* iconfont */
import '../static/lib/iconfont/iconfont.css'

router.afterEach(route => {
  setTimeout(function () {
    window.app.title = route.meta.name
  }, 0)
});

//拦截器
axios.interceptors.request.use(function (config){
  var token = null;
  if(sessionStorage.getItem('userInfo')){
    token = JSON.parse(sessionStorage.getItem('userInfo')).token;
  }
  if(token){
    config.headers.Authorization = 'Bearer'+' '+ token;
  }
  //console.log(config);
  return config;
}, function (error){
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response){
  //console.log(response);//注意200成功，但自定义状态码不是00000的请求，具体规范询问后端
  if(response.data.code!='00000'){
    Message(response.data.msg);
  }
  return response;
}, function (error){
  //console.log(error.response)
  Message.error(error.response.data.message);
  if(error.response.status==401){
    sessionStorage.clear();
    router.push({ name: 'Login'});
  }
  return Promise.reject(error);
});

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  data: {
    title: '工作台'
  },
  router,
  template: '<App/>',
  components: {App}
});
