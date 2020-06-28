<template>
  <v-card class="mx-auto" width="380" min-height="620" outlined>
    <v-list>
      <v-list-item to="/tutorInformation">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item to="/tutorCourse">
        <v-list-item-icon>
          <v-icon>mdi-card-text</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Courses</v-list-item-title>
      </v-list-item>
      <v-list-item to="/tutorStudent">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Students</v-list-item-title>
      </v-list-item>
      <v-list-item to="/tutorGradeManage">
        <v-list-item-icon>
          <v-icon>mdi-chart-line</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Score</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
