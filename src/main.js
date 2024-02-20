import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.scss'
import { Card, Form, FormItem, Input, Button, Message, Container, Aside, Menu, MenuItem, Header, Avatar, Link, Popconfirm, Main, Breadcrumb, BreadcrumbItem, Row, Col, Table, TableColumn } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Col)
Vue.use(Row)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)

Vue.use(Main)
Vue.use(Popconfirm)
Vue.use(Link)
Vue.use(Avatar)
Vue.use(Header)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Aside)
Vue.use(Container)
Vue.prototype.$message = Message
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
