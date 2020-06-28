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
    <br />
    <br />

    <v-toolbar flat color="white">
      <v-toolbar-title>{{ myTutor.user.name }}</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">totalNumber</th>
            <th class="text-left">instructedNumber</th>
            <th class="text-left">State</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ myTutor.totalNumber }}</td>
            <td>{{ myTutor.instructedNumber }}</td>
            <td>{{ state(myTutor) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />

    <v-toolbar flat color="white">
      <v-toolbar-title>Tutor's Courses</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">lowestScore</th>
            <th class="text-left">Your Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in courseScoreVOSDe" :key="item.name">
            <td>{{ item.course.name }}</td>
            <td>{{ item.course.lowestScore }}</td>
            <td>{{ score(item.score) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <v-toolbar flat color="white">
      <v-toolbar-title>Student's Ranking</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      Number of Qualified Students : -------{{ myTutor.reservedRange }} -------
      / Your rankingIndex :-------{{ rankingIndex }}-------
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">No.</th>
            <th class="text-left">Name</th>
            <th class="text-left">State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, index) in studentsDe" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ s.user.name }}</td>
            <td v-if="index + 1 <= myTutor.reservedRange">合格</td>
            <td v-else />
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
