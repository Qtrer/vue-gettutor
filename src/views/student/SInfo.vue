<template>
  <div>
    <v-card>
      <v-system-bar></v-system-bar>
      <v-toolbar flat>
        <v-toolbar-title>{{ student.user.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-banner>
        Choose a tutor you'd like to study with.
        <template v-slot:actions>
          <v-btn text color="deep-purple accent-4">Get Online</v-btn>
        </template>
      </v-banner>
      <v-card-text class="grey lighten-4">
        <v-sheet max-width="950" height="450" class="mx-auto">
          <template v-if="student.tutor">
            <h2>Your tutor : {{ student.tutor.user.name }}</h2>
          </template>
          <template v-else>
            <h2>
              You have not yet chosen a tutor, please choose ~ as soon as
              possible
            </h2>
          </template>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { GET_INDEX_STUDENT } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["student", "tutors"])
  },
  created() {
    this.$store.dispatch(GET_INDEX_STUDENT);
  }
};
</script>
