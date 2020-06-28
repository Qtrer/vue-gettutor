<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Welcome</div>
          <v-list-item-title class="headline mb-1">
            {{ this.student.user.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text class="grey lighten-4">
        <template v-if="student.tutor">
          <h2>Your tutor : {{ student.tutor.user.name }}</h2>
        </template>
        <template v-else>
          <h2>
            You have not yet chosen a tutor, please choose ~ as soon as possible
          </h2>
        </template>
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
