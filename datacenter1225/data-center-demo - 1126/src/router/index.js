import Vue from 'vue'
import VueRouter from 'vue-router'
import Banner from '../components/Banner'
import DataResource from '../views/DataResource'
import Search from '../views/Search'
import DataBag from '../views/DataBag'
import OnlineServe from '../views/OnlineServe'
// import Forum from '../views/Forum'
/* import PublicData from '../views/PublicData'
import Business from '../views/Business'
import DataTotal from '../views/DataTotal' */
import One from '../components/One'
// import Two from '../components/Two'
import PublicData from '../views/PublicData'
import GF5 from '../views/GF5'
import ZY1E from '../views/ZY1E'
// import NavList from '../views/NavList'
import SatalliteList from '../views/SatalliteList'
import Login from '../views/Login'
import ResetPassword from '../views/ResetPassword'
import XuQiuHui from '../views/XuQiuHui/XuQiuHui'
import RenWuHui from '../views/RenWuHui'
import Register from '../views/Register'
import DataTotal from '../views/DataTotal'
import Profile from '../views/Profile'
import UserInfo from '../components/UserInfo'
import Two from '../components/Two'
// import Login1 from '../views/Login1'
// import Forum from '../views/Forum'
import HJ2A from '../views/HJ2A'
import HJ2B from '../views/HJ2B'
import ZY1EL0 from '../views/ZY1EL0'
import Collection from '../views/Collection'
import Business from '../views/Business'
import Forum from '../views/Forum'
import OnServer from '../views/OnServer'
// import Login from '../views/Login/Login'
// import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/banner' },
  { path: '/banner', component: Banner },
  {
    path: '/dataresource',
    name: 'dataresource',
    component: DataResource,
    children: [
      // { path: '', redirect: '/dataresource/1' },
      { path: '/dataresource/1', component: PublicData },
      { path: '/dataresource/2', component: Business },
      { path: '/dataresource/3', component: DataTotal },
      { path: '/dataresource/GF5', component: GF5 },
      { path: '/dataresource/ZY1E', component: ZY1E },
      { path: '/dataresource/HJ2A', component: HJ2A },
      { path: '/dataresource/HJ2B', component: HJ2B },
      { path: '/dataresource/satallite', component: SatalliteList },
      { path: '/dataresource/ZY1EL0', component: ZY1EL0 }
    ]
  },
  { path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/databag',
    name: 'databag',
    component: DataBag,
    children: [
      { path: '/databag/1', component: XuQiuHui },
      { path: '/databag/2', component: RenWuHui }
    ]
  },
  { path: '/onlineserve',
    name: 'onlineserve',
    component: OnServer,
    children: [
      { path: '/onlineserve/1', component: OnlineServe },
      { path: '/onlineserve/2', component: One }
    ]
  },
  { path: '/forum',
    name: 'forum',
    component: Forum
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'login', component: Register },
  { path: '/reset_password', name: 'reset_password', component: ResetPassword },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    children: [
      { path: '', redirect: '/profile/4' },
      { path: '/profile/1', component: One },
      { path: '/profile/2', component: Collection },
      { path: '/profile/3', component: Two },
      { path: '/profile/4', component: UserInfo }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',   history模式打包部署之后是无法刷新的，会报404错误
  routes // (缩写) 相当于 routes: routes
})

export default router
