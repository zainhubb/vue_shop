import Vue from 'vue'
import
    { 
        Form,FormItem,Input,Button,Message,
        Container,Aside,Main,Header,Footer,
        Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,
        Card,Row,Col,Table,TableColumn,Switch,Tooltip,
        Pagination,Dialog,MessageBox,Tag,Notification,
        Tree,Select,Option,Cascader,Alert,Tabs,TabPane

    } 
    from 'element-ui'


Vue.use(Button)
Vue.use(Dialog)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Alert)
Vue.use(Form)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Select)
Vue.use(Card)
Vue.use(Switch)
Vue.use(Table)
Vue.use(Cascader)
Vue.use(Option)
Vue.use(Tree)
Vue.use(TableColumn)
Vue.use(Aside)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification