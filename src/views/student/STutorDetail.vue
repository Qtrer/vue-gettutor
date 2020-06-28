<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title v-if="qualified">
        You are qualified!
      </v-toolbar-title>
      <v-toolbar-title v-else>
        Sorry, you don't meet the application criteria.
      </v-toolbar-title>

      <v-divider class="mx-4" inset vertical></v-divider>

      <v-btn
        class="ma-2"
        outlined
        color="teal"
        :to="`/studentApplication/${myTutor.id}`"
        v-if="qualified"
      >
        Apply
      </v-btn>
      <v-btn text to="/studentTutor">
        Return
      </v-btn>
    </v-toolbar>

    <v-simple-table v-if="!qualified">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>There may be several reasons：</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>1. You already have mentors</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            2.The number of students the teacher can take has reached the limit
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            3. The grade of the course you have chosen is not at the minimum
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            4. Your overall ranking doesn't meet the requirements
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-simple-table>
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
            <th class="text-left">Ranges</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">State</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ myTutor.ranges }}</td>
            <td>{{ myTutor.quantity }}</td>
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
            <th class="text-left">lowestMark</th>
            <th class="text-left">Your Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in courseGradeVOSDe" :key="item.name">
            <td>{{ item.course.name }}</td>
            <td>{{ item.course.lowestMark }}</td>
            <td>{{ grade(item.grade) }}</td>
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
      "courseGradeVOSDe",
      "studentsDe",
      "qualified",
      "myTutor",
      "student",
      "rankingIndex"
    ]),
    grade() {
      return date => (date == 0 ? "none" : date);
    },
    state() {
      return date => (date.quantity < date.ranges ? "可选" : "已满");
    }
  }
};
</script>
