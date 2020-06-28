<template>
  <v-card class="mx-auto" width="380" min-height="620" outlined>
    <v-list>
      <v-list-item to="/studentInformation">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item to="studentTutor">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Tutors</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
