<template>
  <q-page class="flex flex-center">
    <q-input v-model="filmTitle" />
    <q-list>
      <q-item v-for="film in itemsFilms" :key="film.imdbID">
        <q-item-side :image="film.Poster" />
        <q-item-main>
          <q-item-tile label>{{film.Title}}</q-item-tile>
          <q-item-tile sublabel>{{film.Year}}</q-item-tile>
        </q-item-main>
        <q-item-side right icon="movie" />
      </q-item>
    </q-list>
    <!-- Перебираем через цикл массив pages, чтобы вывести каждый номер страницы -->
    {{itemsFilms}}
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
    this.getFilms(this.page, this.filmTitle)
    this.page = this.pageCount / 10
    // minPages: 1,
    // maxPages: this.pageCount / 10
  },
  mounted () {
  },
  methods: {
    getFilms (pageIndex, filmName) {
      console.log(pageIndex)
      if (pageIndex === 0 && pageIndex === null) {
        pageIndex = 1
      }

      console.log(pageIndex)
      axios
        .get(this.$store.state.API.mainURL + `&s=` + filmName + `&page=` + pageIndex)
        .then(response => {
          if (response.data) {
            this.itemsFilms = response.data.Search
            this.pageCount = response.data.totalResults
            console.log(pageIndex)
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
