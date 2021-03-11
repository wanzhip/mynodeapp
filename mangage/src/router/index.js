import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path:'/',
  //   name:'login',
  //   component:()=>import('../views/Login.vue'),
  // },
  {
    path:'/',
    component:()=>import('../views/Navbar'),
    redirect: '/home',
    children:[
      {
        path: "home",
        name: "Home",
        component: () => import('../views/Home.vue')
      },{
        path: "area",
        name: "area",
        component: () => import('../views/Area.vue')
      }
    ]
    
  },
  
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
