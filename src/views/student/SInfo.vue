<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Welcome</div>
              <v-list-item-title class="headline mb-1">
                {{ this.student.user.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="rightCard">
          <v-list-item three-line>
            <v-list-item-content v-if="student.tutor">
              <div class="overline mb-4">Your tutor :</div>
              <v-list-item-title class="headline mb-1">
                {{ student.tutor.user.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-else>
              <div class="overline mb-4">You have not yet chosen a tutor</div>
              <v-list-item-title class="headline mb-1">
                please choose ~ as soon as possible
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
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
<style scoped>
.rightCard {
  margin-left: 10px;
}
</style>
