<template>
  <q-page class="center">
    <div class="row">
      <div class="col-12">
        <q-search v-model="searchFilm" @input="isTyping = true" :stack-label="'Total results:' + (totalResults|isEmpty)"/>
      </div>
    </div>
    <q-list>
      <q-item v-for="film in orderedItemsFilms" :key="film.imdbID" class="kp-film-item ">
        <q-item-side v-if="film.Poster !== 'N/A'" :image="film.Poster" class="kp-film-poster rounded" />
        <q-item-side v-else icon="movie" />
        <q-item-main>
          <q-item-tile label><router-link :to="{ name: 'film', params: { id: film.imdbID }}">{{film.Title}}</router-link></q-item-tile>
          <q-item-tile sublabel>{{film.Year}} (type: {{film.Type }})</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </q-page>
</template>

<style lang="stylus">
  .q-list
    flex-direction: row
    display: flex
    -webkit-justify-content: space-around
    justify-content: space-around
    align-content: stretch
    -webkit-align-content: stretch
    flex-wrap: wrap

  .kp-film-item
    width: 200px
    display: inline-block

    .q-item-icon
      font-size: 7rem

    .q-item-section
      margin-left: 0

    .kp-film-poster
      img
        width: auto
        max-height: 150px
        min-width: 75px
        border-radius 5px
</style>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'PageIndex',
  data () {
    return {
      itemsFilms: [],
      page: 1,
      pages: [],
      searchFilm: '',
      isTyping: false,
      info: [],
      totalResults: 0,
      isPoster: false
    }
  },
  filters: {
    isEmpty: (value) => {
      if (value === undefined) {
        return 0
      }
    }
  },
  computed: {
    orderedItemsFilms: function () {
      return _.orderBy(this.itemsFilms, 'Year', 'desc') // TODO need to add different sorting for results
    }
  },
  methods: {
    getFilms (filmName) {
      axios
        .get(this.$store.state.API.mainURL + `&s=` + filmName)
        .then(response => {
          if (response.data) {
            this.itemsFilms = []
            this.totalResults = response.data.totalResults
            for (let pageIndex = 1; pageIndex <= Math.ceil(response.data.totalResults / 10); pageIndex++) {
              axios
                .get(this.$store.state.API.mainURL + `&s=` + filmName + `&page=` + pageIndex)
                .then(response => {
                  if (response.data) {
                    this.itemsFilms.push(...response.data.Search)
                  }
                })
                .catch(response => {
                  console.log(response)
                })
            }
          }
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  watch: {
    searchFilm: _.debounce(function () {
      this.isTyping = false
    }, 1000),
    isTyping: function (value) {
      if (!value) {
        this.getFilms(this.searchFilm)
      }
    }
  }
}
</script>
