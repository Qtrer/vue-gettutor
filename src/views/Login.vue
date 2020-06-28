<template>
  <div>
    <br />
    <br />
    <br />
    <template>
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="title">Welcome to Get Tutor System</v-card-title>
        <v-card-text class="text">
          <form>
            <v-text-field
              v-model="number"
              label="Please enter the number"
              required
              @input="$v.number.$touch()"
              @blur="$v.number.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Please enter the password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="login">submit</v-btn>
          </form>
        </v-card-text>
      </v-card>
      <v-row justify="center">
        <v-card></v-card>
      </v-row>
    </template>
  </div>
</template>

<script>
import { LOGIN } from "@/store/types.js";
import { mapState } from "vuex";

export default {
  data: () => ({
    number: null,
    password: null
  }),

  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        number: this.number,
        password: this.password
      });
      this.$refs.form.reset();
      if (this.isLogin != null) {
        this.dialog = false;
      }
    }
  }
};
</script>

<style acoped>
.title {
  text-align: center;
  color: white;
  background: gray;
}
.input {
  display: flex;
  width: 350px;
  padding: 3px;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
