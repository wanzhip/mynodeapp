import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue'),
  },
  {
    path:'/blog',
    name:'blog',
    component:()=>import('@/components/blog/Index.vue'),
    redirect:'/blog/home',
    children:[
      {
        path:'/blog/home',
        name:'blogHome',
        component:()=>import('@/components/blog/Home.vue')
      }
    ]
  },
  {
    path:'/',
    component:()=>import('../views/Navbar'),
    redirect: '/home',
    children:[
      {
        path: "/home",
        name: "Home",
        component: () => import('../views/Home.vue')
      },{
        path: "/area",
        name: "Area",
        component: () => import('../views/Area.vue')
      },
    ]
  },
  
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
