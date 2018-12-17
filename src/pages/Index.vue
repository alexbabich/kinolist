<template>
  <q-page class="center">
    <div class="row">
      <div class="col-4">
        <q-search v-model="searchFilm" @input="isTyping = true" />
      </div>
      <div class="col-4">
        {{this.totalResults}}
      </div>
    </div>
    <q-list>
      <q-item v-for="film in itemsFilms" :key="film.imdbID" class="kp-film-item ">
        <q-item-side v-if="film.Poster !== 'N/A'" :image="film.Poster" class="kp-film-poster"/>
        <q-item-side v-else icon="movie" />
        <q-item-main>
          <q-item-tile label><router-link :to="{ name: 'film', params: { id: film.imdbID }}">{{film.Title}}</router-link></q-item-tile>
          <q-item-tile sublabel>{{film.Year}}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <div class="row">
      <p>test array</p>
      <br/>
      {{itemsFilms}}
    </div>
    <!--<div class="row">
      {{itemsFilms}}
    </div>-->
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
    width: 25%
    display: inline-block

    .q-item-icon
      font-size: 7rem

    .q-item-section
      margin-left: 0

    .kp-film-poster
      img
        width: 100%
      + .q-item-section
        position: absolute
        bottom: 0
</style>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'PageIndex',
  data () {
    return {
      itemsFilms: [],
      pageCount: null,
      page: 1,
      pages: [],
      perPage: 10,
      searchFilm: '',
      isTyping: false,
      info: [],
      totalResults: '',
      isPoster: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getFilms (filmName) {
      axios
        .get(this.$store.state.API.mainURL + `&s=` + filmName)
        .then(response => {
          if (response.data) {
            for (let pageIndex = 1; pageIndex <= Math.ceil(response.data.totalResults / 10); pageIndex++) {
              axios
                .get(this.$store.state.API.mainURL + `&s=` + filmName + `&page=` + pageIndex)
                .then(response => {
                  if (response.data) {
                    this.itemsFilms.push(...response.data.Search)
                  }

                  var result = []
                  this.itemsFilms.forEach(function (item) {
                    if (result.indexOf(item) < 0) {
                      result.push(item)
                    }
                  })
                  this.itemsFilms = result
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
  computed: {
    // displayedPosts () {
    //   return this.paginate(this.posts)
    // }
  },
  watch: {
    searchFilm: _.debounce(function () {
      this.isTyping = false
    }, 2000),
    isTyping: function (value) {
      if (!value) {
        this.getFilms(this.searchFilm)
      }
    }
  }
}
</script>
