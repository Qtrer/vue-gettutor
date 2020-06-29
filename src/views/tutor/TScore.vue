<template>
  <div>
    <template v-if="studentsEle">
      <v-card-text>course: {{ course }}</v-card-text>
      <v-btn color="grey" dark class="mb-2" @click="submit">SUBMIT</v-btn>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Number</th>
              <th class="text-left">Name</th>
              <th class="text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in studentsEle" :key="item.name">
              <td>{{ item.number }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.grade }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-divider></v-divider>
    </template>
    <v-divider></v-divider>
    <v-card-text></v-card-text>
    <v-data-table
      :headers="headers"
      :items="rankStudents"
      sort-by="weightedGrade"
      sort-desc="true"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Score</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <form>
            <label class="upload">
              <input
                class="file"
                display="false"
                type="file"
                @change="readFile"
                accept=".xls, .xlsx"
              />
              IMPORT
            </label>
          </form>
          <v-spacer></v-spacer>
          <v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="StudentName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.number"
                        label="Number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.weightedGrade"
                        label="WeightedGrade"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="grey darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="grey" dark @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { readStudentFile } from "@/util/ExcelUtils.js";
import { LIST_RANKING_STUDENTS_TUTOR } from "@/store/types.js";
import { ADD_ELECTIVES_TUTOR } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  data: () => ({
    studentsEle: null,
    course: "",
    search: "",
    dialog: false,
    headers: [
      {
        text: "StudentName*",
        align: "start",
        sortable: false,
        value: "user.name"
      },
      { text: "Number*", value: "user.number" },
      { text: "WeightedGrade", value: "weightedGrade" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      number: 0
    },
    defaultItem: {
      name: "",
      number: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["rankStudents"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.$store.dispatch(LIST_RANKING_STUDENTS_TUTOR);
  },

  methods: {
    initialize() {
      this.desserts = this.rankStudents;
    },

    submit() {
      var eles = [];
      var j = 0;
      var len = this.studentsEle.length;
      for (j; j < len; j++) {
        var ele = {
          grade: 0,
          student: {
            user: {
              number: 0,
              name: ""
            }
          },
          course: {
            name: ""
          }
        };
        ele.student.user.number = this.studentsEle[j].number;
        ele.student.user.name = this.studentsEle[j].name;
        ele.grade = this.studentsEle[j].grade;
        ele.course.name = this.course;
        eles.push(ele);
      }

      this.$store.dispatch(ADD_ELECTIVES_TUTOR, eles);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    readFile(event) {
      let file = event.target.files[0];
      readStudentFile(file).then(data => {
        this.studentsEle = data[0];
        this.course = data[1];
      });
    },

    downloadTemplate() {
      window.open("./file/TranscriptTemplate.xls");
    }
  }
};
</script>

<style scoped>
.upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  border: 1px solid #999;
  text-decoration: none;
  color: #666;
}
.file {
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
