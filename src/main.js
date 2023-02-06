import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import { Container, Aside, Header, Main, Menu, Submenu, MenuItemGroup, MenuItem, Button, Dropdown, DropdownMenu, DropdownItem, Card, Row, Col, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Dialog, Form, FormItem, Input, Select, Option, DatePicker, MessageBox, Pagination } from 'element-ui'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import './api/mock'
Vue.use(VueRouter)
// import { Form } from 'element-ui'
// Vue.use(ElementUI)
//#region 
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Button.name, Button)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Card.name, Card)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Tag.name, Tag)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Pagination.name, Pagination)
//#endregion
Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message
// Vue.prototype.$message = MessageBox.message,
new Vue({
  router,
  store,

  render: h => h(App),
  created() {
    store.commit('addRouter', router)
  },

}).$mount('#app')
