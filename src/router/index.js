import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";

Vue.use(VueRouter);

// 没有角色要求的默认路由
const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

// --------------------------
// 后期追加的路由配置
let adminRoutes = [
  {
    path: "/adminInformation",
    component: () => import("@/views/admin/AInfo.vue")
  }
];

let tutorRoutes = [
  {
    path: "/tutorInformation",
    component: () => import("@/views/tutor/TInfo.vue")
  },
  {
    path: "/tutorCourse",
    component: () => import("@/views/tutor/TCourse.vue")
  },
  {
    path: "/tutorStudent",
    component: () => import("@/views/tutor/TStudent.vue")
  },
  {
    path: "/tutorGradeManage",
    component: () => import("@/views/tutor/TScore.vue")
  }
];

let studentRoutes = [
  {
    path: "/studentInformation",
    component: () => import("@/views/student/SInfo.vue")
  },
  {
    path: "/studentApplication/:tid",
    component: () => import("@/views/student/SApplication.vue")
  },
  {
    path: "/studentTutor",
    component: () => import("@/views/student/STutor.vue")
  },
  {
    path: "/information/:tid",
    component: () => import("@/views/student/STutorDetail.vue")
  }
];

// 必须与后端提前约定。按角色，动态加载路由信息
// 使其他角色即使知道路由路径，也无法加载对应的组件
const adminRole = "f2ffae3f953b4983fe0f";
const teacherRole = "6983f953b49c88210cb9";
const studentRole = "bb63e5f7e0f2ffae845c";

// 暴露该方法。登录后，有vuex调用，通知更新路由信息
export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case adminRole:
      router.addRoutes(adminRoutes);
      break;
    case teacherRole:
      router.addRoutes(tutorRoutes);
      break;
    case studentRole:
      router.addRoutes(studentRoutes);
      break;
  }
}
// 再此文件模块加载时，也执行。用户登陆后刷新页面时，按sessionstorage中数据初始化
// 没有找到sessionstorage的监听事件
updateRoutes();
