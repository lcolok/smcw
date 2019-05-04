import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import AV from './plugins/AVinit'
Vue.prototype.$AV = AV;

import custom_dev_port from '!raw-loader!../.leancloud/custom_dev_port';
if (process.env.NODE_ENV == "development") {//如果是处于开发状态的话
  AV._setServerURLs('http://localhost:' + custom_dev_port)//设置本地服务器端口(必须先进行 lean up 操作)
}

const routes = []

importPages(require.context('./vue', false, /\.vue$/))
function importPages(r) {

  var arr = r.keys();

  arr.forEach(key => {
    var meta = r(key).default.meta;
    // console.log(r(key).default);

    var filePath = (key.split('.'))[1];
    // var path = (key.toLowerCase().split('.'))[1];
    // var title = (key.split('.'))[1].split('/')[1];

    routes.push({
      path: (meta.staticPath || filePath).toLowerCase(),//如果有静态路径则用静态路径
      component: () => import("./vue" + filePath),
      meta: meta
    })

    routes
      .sort((a, b) => {//按照自定义的优先级来排序
        // console.log(a.meta.order);
        if ((a.meta.order || -1) < (b.meta.order || -1)) {
          return -1
        } else {
          return 0
        }
      })
      .sort((a, b) => {//置底404页面
        if (a.path == '*') {
          return -1
        } else {
          return 1
        }
      })
      .sort((a, b) => {//置顶首页
        if (b.path == '/') {
          return 1
        } else {
          return -1
        }
      })
  });
}

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {//to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  document.title = to.meta.title;//给出指定的标题名称

  if (to.path === '/login') { next() }  // 如果即将进入登录路由，则直接放行

  else {     //进入的不是登录路由

    if (to.meta.requiresAuth && !AV.User.current()) {
      console.log('还没登录');
      next({
        path: 'login',
        query: {
          redirect: to.fullPath//留下原来要到达的路径信息，等用户登录好之后，再进行跳转
        }
      })

    }

    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由

    else { next() }
  }  //如果不需要登录验证，或者已经登录成功，则直接放行

})

export default router