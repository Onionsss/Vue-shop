import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem,Container,Header,Aside,Main,Menu,MenuItem,Submenu,MenuItemGroup } from 'element-ui'
import { Input } from 'element-ui'
import { Message } from "element-ui";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.prototype.$message = Message

