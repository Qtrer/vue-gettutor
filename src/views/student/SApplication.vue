<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Choose directions
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Confirm to apply for
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          这里是选择方向的·····
        </v-card>

        <v-btn color="primary" @click="e1 = 2">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="lighten-1" height="200px">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Please confirm that:
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                1. If you are a qualified student, you will be selected
                successfully after applying
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                2. If you need to change the tutor after the selection, please
                contact the tutor for modification
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-btn color="primary" @click="apply">
          Apply
        </v-btn>
        <v-btn text to="/studentTutor">
          Return
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { GET_TUTOR_STUDENT } from "@/store/types.js";
export default {
  props: ["tid"],
  data() {
    return {
      e1: 1
    };
  },
  methods: {
    apply() {
      this.$store.dispatch(GET_TUTOR_STUDENT, {
        tid: this.$route.params.tid
      });
    }
  }
};
</script>
