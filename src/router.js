import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import AV from './plugins/AVinit'
Vue.prototype.$AV = AV;

import custom_dev_port from '!raw-loader!../.leancloud/custom_dev_port';
if (process.env.NODE_ENV == "development") {//如果是处于开发状态的话
  AV._setServerURLs('http://localhost:' + custom_dev_port)//设置本地服务器端口(必须先进行 lean up 操作)
}

// const router = new Router({
//   // mode: 'history',
//   routes: [
//     {
//       path: '/map',
//       name: '路由表导航',
//       component: () => import('./vue/Map.vue'),
//       meta: {
//         title: '路由表导航',
//       }
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: Login,
//       meta: {
//         title: '登录',
//       }
//     },
//     {
//       path: '/signup',
//       name: 'SignUp',
//       component: SignUp,
//       meta: {
//         title: '注册',
//       }
//     },
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//       meta: {
//         title: '首页入口',
//         // requiresAuth: true,
//       }
//     },
//     {
//       path: '/u',
//       name: 'upload',
//       component: Upload,
//       meta: {
//         title: '七牛上传',
//         requiresAuth: true,
//       }
//     },
//     {
//       path: '/sortable',
//       name: 'sortable',
//       component: Sortable,
//       meta: {
//         title: 'Sortable',
//         // requiresAuth: true,
//       }
//     },
//     {
//       path: '/mescroll',
//       name: 'Mescroll',
//       meta: {
//         title: 'mescroll测试页'
//       },
//       component: () => {
//         import('./vue/Mescroll.vue');

//       }
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       //路线级别代码分隔
//       // this generates a separate chunk (about.[hash].js) for this route
//       //这将为该路由生成一个单独的块(大约.[hash].js)
//       // which is lazy-loaded when the route is visited.
//       //当访问路由时，它会进行懒加载加载。
//       component: () => import(/* webpackChunkName: "about" */ './vue/About.vue')
//     },
//     {
//       /* Not Found 路由，必须是最后一个路由 */
//       path: '*',
//       name: 'NotFound',
//       component: NotFound,
//       meta: {
//         title: '404 Not Found'
//       }
//     },
//   ]

// })

const routes = []

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: () => import('./vue/Home.vue'),
//     meta: {
//       title: '首页入口',
//       // requiresAuth: true,
//     }
//   },
// ];

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
        console.log(a.meta.order);
        if ((a.meta.order||-1) < (b.meta.order||-1)) {
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

// routes.push({
//   /* Not Found 路由，必须是最后一个路由 */
//   path: '*',
//   name: 'NotFound',
//   component: () => import('./vue/NotFound.vue'),
//   meta: {
//     title: '404 Not Found',
//     // hideOnTheMap: true
//   }
// })

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