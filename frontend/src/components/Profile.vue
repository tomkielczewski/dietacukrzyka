<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card dark color="#a8c256">
        <v-card-title class="headline">
          Czy na pewno chcesz wygenerować nową dietę?
          <p style="font-size: 18px">
            Wprowadzone dane zostaną zapisane
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="createNewDiet">
            Tak
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Nie
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      :top="y === 'top'"
      timeout="4000"
      :color="color"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          <v-icon color="blue">{{ 'mdi-close-circle-outline ' }}</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-container>
      <v-row class="mb-1 no-gutters">
        <v-sheet
          class="mx-auto rounded-corner"
          elevation="8"
          width="100%"
          color="rgba(116,34,60,0.8)"
        >
          <v-row>
            <v-col>
              <h2 class="ml-5">Twoje Konto</h2>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="mb-1 no-gutters">
        <v-sheet
          class="mx-auto rounded-corner"
          elevation="8"
          width="100%"
          color="rgba(28,29,30,0.8)"
          style="position: relative;"
        >
          <v-overlay :absolute="true" :value="loading">
            <Loader />
          </v-overlay>
          <v-row>
            <v-col>
              <v-tabs
                background-color="rgba(28,29,30,0)"
                color="#98AF4F"
                centered
                v-model="tabs"
              >
                <v-tab><h4>Ustawienia Konta</h4></v-tab>
                <v-tab><h4>Dane fizyczne</h4></v-tab>
                <v-tab><h4>Preferencje żywieniowe</h4></v-tab>
                <v-tab><h4>Dokumenty</h4></v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <v-card color="rgba(116,34,60)">
                    <v-row>
                      <v-col class="ml-3">
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Imię"
                          v-model="data.name"
                        >
                        </v-text-field>
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Wiek"
                          v-model="data.age"
                        >
                        </v-text-field>
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Adres Email"
                          v-model="data.email"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col class="mr-3">
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Nazwisko"
                          v-model="data.last_name"
                        >
                        </v-text-field>
                        <v-select
                          :items="gender"
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Płeć"
                          v-model="selected_gender"
                        ></v-select>
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Kraj zamieszkania"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="rgba(116,34,60)">
                    <v-row>
                      <v-col class="mx-10">
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          type="number"
                          label="Masa ciała"
                          @change="calculateBmi"
                          v-model="data.weight"
                        >
                        </v-text-field>
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          type="number"
                          label="Wzrost"
                          @change="calculateBmi"
                          v-model="data.height"
                        >
                        </v-text-field>
                        <v-select
                          :items="activity_text"
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          rounded
                          label="Aktywność fizyczna"
                          v-model="selected_activity"
                        ></v-select>
                        <v-text-field
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          filled
                          readonly
                          rounded
                          label="BMI"
                          v-model="bmi"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="rgba(116,34,60)">
                    <v-row>
                      <v-col class="mx-10">
                        <v-select
                          :items="getIngredients"
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="ingredients_field_height[0]"
                          filled
                          rounded
                          chips
                          multiple
                          label="Ulubione składniki"
                          v-model="preferred_ingredients"
                          @change="changeFieldHeight(0, preferred_ingredients)"
                        ></v-select>
                        <v-select
                          :items="getIngredients"
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="ingredients_field_height[1]"
                          filled
                          rounded
                          chips
                          multiple
                          label="Standardowe składniki"
                          v-model="standard_ingredients"
                          @change="changeFieldHeight(1, standard_ingredients)"
                        ></v-select>
                        <v-select
                          :items="getAllergens"
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="ingredients_field_height[2]"
                          filled
                          rounded
                          chips
                          multiple
                          label="Alergeny"
                          v-model="allergens"
                          @change="changeFieldHeight(2, allergens)"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="rgba(116,34,60)">
                    <v-row>
                      <v-col class="mx-10">
                        <v-progress-linear
                          class="rounded-corner"
                          :value="progress"
                          color="#a8c256"
                          height="40"
                          dark
                        >
                          <strong>{{ progress }} %</strong>
                        </v-progress-linear>
                        <v-file-input
                          class="rounded-corner"
                          label="Wybierz dokument"
                          background-color="light-green lighten-1"
                          color="light-green darken-4"
                          :height="field_height"
                          v-model="file"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-btn
                        :disabled="isFileLoading"
                        @click="upload"
                        color="orange"
                        class="mb-3 white--text"
                        >{{ 'Prześlij dokument' }}</v-btn
                      >
                    </v-row>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
              <v-row>
                <v-col>
                  <v-row align="center" justify="center">
                    <v-btn
                      :disabled="isFileLoading"
                      color="orange"
                      class="ma-3 white--text"
                      @click="saveNewDetails"
                      >{{ 'Zapisz' }}</v-btn
                    >
                    <v-btn
                      :disabled="isFileLoading"
                      @click="dialog = true"
                      color="#98AF4F"
                      class="ma-3 white--text"
                      >{{ 'Generuj nową dietę' }}</v-btn
                    >
                  </v-row>
                  <v-row align="center" justify="center"> </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { uploadDocument } from '../services/api'
import Loader from '@/components/Loader'
export default {
  name: 'Menu',
  data: () => ({
    file: null,
    progress: 0,
    dialog: false,
    snackbar: false,
    color: '',
    text: '',
    y: 'top',
    tabs: null,
    data: {},
    activity_text: [
      'Bezruch, niska aktywność fizyczna',
      'Umiarkowana aktywność fizyczna (1 − 3 razy w tygodniu trening lub dużo chodzenia w ciągu dnia)',
      'Średnia aktywność (3 − 5 treningów w tygodniu)',
      'Bardzo aktywny tryb życia',
      'Bardzo aktywny tryb życia + praca fizyczna',
    ],
    selected_activity: '',
    loading: false,
    complete_ok: false,
    new_diet: false,
    gender: ['Kobieta', 'Mężczyzna', 'Inna'],
    selected_gender: '',
    bmi: 0,
    preferred_ingredients: [],
    standard_ingredients: [],
    allergens: [],
    field_height: 70,
    ingredients_field_height: [70, 70, 70],
    field_row: [1, 1, 1],
    data_saved: false,
    isFileLoading: false,
  }),
  components: {
    Loader,
  },
  computed: mapGetters([
    'getClientInfoFromStore',
    'getIngredients',
    'getAllergens',
  ]),
  methods: {
    ...mapActions([
      'saveClientInfoOnServer',
      'getClientInfoFromServer',
      'getAllIngredientsFromServer',
      'obtainNewDiet',
    ]),
    ...mapMutations(['saveClientInfoInStore']),
    async upload() {
      if (!this.file) {
        this.setSnackBar('Proszę wybrać plik', '#C62828')
      } else {
        this.isFileLoading = true
        try {
          await uploadDocument(this.file, (event) => {
            this.progress = Math.round((100 * event.loaded) / event.total)
          })
          this.setSnackBar(
            'Dokument został pomyślnie przesłany. Proszę czekać na odpowiedź',
            '#2E7D32'
          )
        } catch (e) {
          this.progress = 0
          this.setSnackBar('Nie udało się przesłać pliku', '#C62828')
        }
        this.isFileLoading = false
      }
    },
    setSnackBar(text, color) {
      this.text = text
      this.color = color
      this.snackbar = true
    },
    changeFieldHeight(item_number, ingredients) {
      var ingredients_string = ''
      ingredients.forEach((ingredient) => {
        ingredients_string += ingredient
      })
      if (ingredients_string.length > 100 * this.field_row[item_number]) {
        this.ingredients_field_height[item_number] += 60
        this.field_row[item_number]++
      }
    },
    async saveNewDetails() {
      this.data_saved = false
      if (
        this.data.weight === '0' ||
        this.data.weight === 0 ||
        this.data.height === '0' ||
        this.data.height === 0
      ) {
        this.setSnackBar('Proszę uzupełnić dane fizyczne', '#C62828')
      } else {
        this.data['physical_activity'] = this.activity_text.indexOf(
          this.selected_activity
        )
        this.data['preferred_ingredients'] = this.preferred_ingredients
        this.data['standard_ingredients'] = this.standard_ingredients
        this.data['allergens'] = this.allergens
        this.data.weight = parseInt(this.data.weight, 10)
        this.data.height = parseInt(this.data.height, 10)
        this.saveClientInfoInStore(this.data)
        this.loading = true
        this.genderTranslator(this.selected_gender)
        try {
          await this.saveClientInfoOnServer(this.data)
          this.loading = false
          this.setSnackBar('Dane zostały pomyślnie zaktualizowane', '#2E7D32')
          this.data_saved = true
        } catch (e) {
          this.loading = false
          this.setSnackBar('Adres email nie jest dostępny', '#C62828')
        }
      }
    },
    calculateBmi() {
      this.bmi =
        Math.round(
          (parseInt(this.data.weight, 10) /
            Math.pow(parseInt(this.data.height, 10) / 100, 2)) *
            100
        ) / 100
    },
    genderTranslator(gender) {
      switch (gender) {
        case 'male':
          this.selected_gender = 'Mężczyzna'
          break
        case 'female':
          this.selected_gender = 'Kobieta'
          break
        case 'other':
          this.selected_gender = 'Inna'
          break
        case 'Mężczyzna':
          this.data.gender = 'male'
          break
        case 'Kobieta':
          this.data.gender = 'female'
          break
        case 'Inna':
          this.data.gender = 'other'
          break
        default:
          break
      }
    },
    async fetchData() {
      await this.getClientInfoFromServer()
      this.data = this.getClientInfoFromStore
      console.log(this.data)
      this.preferred_ingredients = this.data.preferred_ingredients
      this.standard_ingredients = this.data.standard_ingredients
      this.allergens = this.data.client_allergens
      this.selected_activity = this.activity_text[this.data.physical_activity]
      this.genderTranslator(this.data.gender)
      this.calculateBmi()
    },
    async createNewDiet() {
      this.dialog = false
      await this.saveNewDetails()
      if (this.data_saved) {
        this.loading = true
        await this.obtainNewDiet()
        this.loading = false
        this.setSnackBar('Nowa dieta została pomyślnie wygenerowana', '#2E7D32')
        this.data_saved = false
      }
    },
  },
  async mounted() {
    this.fetchData()
    await this.getAllIngredientsFromServer()
  },
}
</script>

<style scoped>
.rounded-corner {
  border-radius: 20px;
}
h2,
h4 {
  color: white;
}
h3 {
  color: white;
}
.transparent-body {
  background: transparent;
}
.theme--light.v-list {
  background: #c2f588;
}
</style>
