<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around">
      <v-col>
        <MyHeader id="MyHeader" />
      </v-col>
    </v-row>
    <v-spacer>
      <br />
      <br />
      <br />
    </v-spacer>
    <v-row align="stretch" justify="space-around" top="120">
      <v-col cols="3">
        <aSidebar id="aSidebar" v-if="isAdmin" />
        <tSidebar id="tSidebar" v-if="isTutor" />
        <sSidebar id="sSidebar" v-if="isStudent" />
      </v-col>
      <v-col cols="9">
        <router-view id="router" :key="$route.path"></router-view>
      </v-col>
    </v-row>
    <v-row>
      <MyFooter id="MyFooter" />
    </v-row>
  </v-container>
</template>
<script>
import MyFooter from "@/views/Footer.vue";
import MyHeader from "@/views/Header.vue";
import { mapState } from "vuex";

export default {
  components: {
    aSidebar: () => import("@/views/admin/ASidebar.vue"),
    tSidebar: () => import("@/views/tutor/TSidebar.vue"),
    sSidebar: () => import("@/views/student/SSidebar.vue"),
    // info: () => import("@/views/Info.vue"),
    MyHeader,
    MyFooter
  },
  computed: {
    ...mapState(["isLogin", "isTutor", "isAdmin", "isStudent"])
  }
};
</script>
