<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="8">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Welcome</div>
                <v-list-item-title class="headline mb-1">
                  {{ this.tutor.user.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Number</th>
                    <th class="text-left">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in myStudents" :key="item.name">
                    <td>{{ item.user.name }}</td>
                    <td>{{ item.user.number }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-container fluid>
              <v-text-field
                v-model="tutor.totalNumber"
                label="Please enter the total number"
                required
                @input="$v.totalNumber.$touch()"
                @blur="$v.totalNumber.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="tutor.reservedRange"
                label="Please enter the reserved number"
                required
                @input="$v.reservedRange.$touch()"
                @blur="$v.reservedRange.$touch()"
              ></v-text-field>
              <v-text>instructed number: {{ tutor.instructedNumber }}</v-text>
            </v-container>

            <v-card-actions>
              <v-btn text @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_INDEX_TUTOR } from "@/store/types.js";
import { UPDATE_RANGE_TUTOR } from "@/store/types.js";
export default {
  computed: {
    ...mapState(["myStudents", "tutor"])
  },
  created() {
    this.$store.dispatch(GET_INDEX_TUTOR);
    this.initialize();
  },
  methods: {
    submit() {
      console.log(this.tutor.totalNumber);
      console.log(this.tutor.reservedRange);

      this.$store.dispatch(UPDATE_RANGE_TUTOR, {
        totalNumber: this.tutor.totalNumber,
        reservedRange: this.tutor.reservedRange
      });
    }
  },
  data() {
    return {
      totalNumber: 0,
      reservedRange: 0,
      instructedNumber: 0,
      name: "",
      max: 30
    };
  }
};
</script>
