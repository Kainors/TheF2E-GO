import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home.vue';
import TodoList from '../pages/TodoList.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/TodoList', component: TodoList },
  ]
});

export default router;
