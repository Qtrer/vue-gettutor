<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title v-if="qualified">
        You are qualified!
      </v-toolbar-title>
      <v-toolbar-title v-else>
        Sorry, you haven't qualified.
      </v-toolbar-title>

      <v-divider class="mx-4" inset vertical></v-divider>

      <v-btn
        class="ma-2"
        outlined
        color="grey"
        dark
        :to="`/studentApplication/${myTutor.id}`"
        v-if="qualified"
      >
        Apply
      </v-btn>
      <v-btn color="grey" outlined text to="/studentTutor">
        Return
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
import { GET_TUTORDETAIL_STUDENT } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  props: ["tid"],
  created() {
    this.$store.dispatch(GET_TUTORDETAIL_STUDENT, {
      tid: this.$route.params.tid
    });
  },
  computed: {
    ...mapState([
      "courseScoreVOSDe",
      "studentsDe",
      "qualified",
      "myTutor",
      "student",
      "rankingIndex"
    ]),
    score() {
      return date => (date == 0 ? "none" : date);
    },
    state() {
      return date =>
        date.instructedNumber < date.totalNumber ? "可选" : "已满";
    }
  }
};
</script>
