<template>
  <q-page class="center">
    <div class="row">
      <div class="col-4">
        <q-search v-model="filmTitle" />
      </div>
      <div class="col-4">
        {{this.pageCount}}
      </div>
    </div>
    <div class="row">
      <q-list>
        <q-item v-for="film in itemsFilms" :key="film.imdbID">
          <q-item-side :image="film.Poster" />
          <q-item-main>
            <q-item-tile label><router-link :to="{ name: 'film', params: { id: film.imdbID }}">{{film.Title}}</router-link></q-item-tile>
            <q-item-tile sublabel>{{film.Year}}</q-item-tile>
          </q-item-main>
          <q-item-side right icon="movie" />
        </q-item>
      </q-list>
    </div>
    <div class="row">
      {{itemsFilms}}
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      itemsFilms: null,
      pageCount: null,
      page: 1,
      pages: [],
      perPage: 10,
      filmTitle: ''
    }
  },
  created () {
    // this.getFilms(this.page, this.filmTitle)
    // this.page = this.pageCount / 10
    // minPages: 1,
    // maxPages: this.pageCount / 10
  },
  mounted () {
  },
  methods: {
    getFilms (pageIndex, filmName) {
      if (pageIndex === 0 && pageIndex === null) {
        pageIndex = 1
      }
      axios
        .get(this.$store.state.API.mainURL + `&s=` + filmName + `&page=` + pageIndex)
        .then(response => {
          if (response.data) {
            this.itemsFilms = response.data.Search
            this.pageCount = response.data.totalResults
          }
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  computed: {
    displayedPosts () {
      return this.paginate(this.posts)
    }
  },
  watch: {
    filmTitle () {
      this.getFilms(this.page, this.filmTitle)
    }
  }
}
</script>
