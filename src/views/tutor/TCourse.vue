<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="courses"
      sort-by="weight"
      sort-desc="true"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Course</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="grey" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Course
              </v-btn>
            </template>

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
                        label="CourseName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.weight"
                        label="Weight"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lowestScore"
                        label="LowestScore"
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
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="grey" dark @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <br />
  </div>
</template>

<script>
import { LIST_COURSES_TUTOR } from "@/store/types.js";
import { UPDATE_COURSE_TUTOR } from "@/store/types.js";
import { ADD_COURSE_TUTOR } from "@/store/types.js";
import { DELETE_COURSE_TUTOR } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "CourseName",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Weight", value: "weight" },
      { text: "LowestScore", value: "lowestScore" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      weight: 0.5,
      lowestScore: 60
    },
    defaultItem: {
      name: "",
      weight: 0.5,
      lowestScore: 60
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["courses"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(LIST_COURSES_TUTOR);
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = this.courses;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
      this.$store.dispatch(DELETE_COURSE_TUTOR, {
        id: item.id
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var flag = true;
      if (
        isNaN(this.editedItem.weight) ||
        this.editedItem.weight > 1 ||
        this.editedItem.weight < 0 ||
        isNaN(this.editedItem.lowestScore) ||
        this.editedItem.lowestScore > 100 ||
        this.editedItem.lowestScore < 0
      ) {
        flag = false;
      }
      if (this.editedIndex > -1) {
        this.$store.dispatch(UPDATE_COURSE_TUTOR, {
          id: this.desserts[this.editedIndex].id,
          name: this.editedItem.name,
          weight: this.editedItem.weight,
          lowestScore: this.editedItem.lowestScore
        });
        if (flag)
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.$store.dispatch(ADD_COURSE_TUTOR, {
          name: this.editedItem.name,
          weight: this.editedItem.weight,
          lowestScore: this.editedItem.lowestScore
        });
        if (flag) this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
