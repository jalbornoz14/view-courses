import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/backoffice",
    name: "backoffice",
    component: () =>
      import(
        /* webpackChunkName: "BackofficeView" */ "../views/BackofficeView.vue"
      ),
  },
  {
    path: "*",
    name: "notfound",
    component: () =>
      import(
        /* webpackChunkName: "NotFoundView" */ "../views/NotFoundView.vue"
      ),
  },
  {
    path: "/course/:id",
    name: "course-by-id",
    component: () =>
      import(
        /* webpackChunkName: "ViewCourseById" */ "../views/ViewCourseById.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "LoginView" */ "../views/login/LoginView.vue"
      ),
  },
  {
    path: "/login-backoffice",
    name: "login-backoffice",
    component: () =>
      import(
        /* webpackChunkName: "LoginBackOffice" */ "../views/login/LoginBackOffice.vue"
      ),
  },
  {
    path: "/my-courses",
    name: "my-courses",
    component: () =>
      import(
        /* webpackChunkName: "MyCoursesView" */ "../views/MyCoursesView.vue"
      ),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "RegisterView" */ "../views/register/RegisterView.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
