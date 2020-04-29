import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from '../components/Events'
import About from '../views/About'

Vue.use(VueRouter)



export default new VueRouter ({
  routes : [
    {
      path: '/',
      name: 'events',
      component: Events
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
