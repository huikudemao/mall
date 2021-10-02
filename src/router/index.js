import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
//const  Home=()=>import('../views/home/Home')
const  Home=()=>import('@/views/home/Home')
const  Cart=()=>import('@/views/cart/Cart')
const  Category=()=>import('@/views/category/Category')
const  Profile=()=>import('@/views/profile/Profile')
const  Detail=()=>import('@/views/detail/Detail')
//安装插件
Vue.use(VueRouter)


//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.replace;
//修改原型对象中的push方法
//push无效,改为replace
//replace跳转不会形成history，不可返回到上一层。
//push跳转会形成history，可返回到上一层。
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

//创建router
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:id',
    component:Detail
  }
]
const router =new VueRouter({
  routes,
  mode:'history'
})

export default router
