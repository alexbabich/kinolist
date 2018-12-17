<template>
    <q-page class="flex flex-center">
        <div class="row">
            <q-btn
                color="deep-orange"
                @click="goBack"
                label="go back to search"
                class="kp-back-btn"
            />
        </div>
        <div class="row">
            <div class="col-4 text-center">
                <img :src="info.Poster" class="img-fluid kp-img-thumbnail" :alt="info.Poster"/>
            </div>
            <div class="col-8">
                <p><b>{{info.Title}}</b></p>
                <hr>
                <p><b>Released:</b> {{info.Released}}</p>
                <p><b>Runtime:</b> {{info.Runtime}}</p>
                <p><b>Genre:</b> {{info.Genre}}</p>
                <p><b>Country:</b> {{info.Country}}</p>
                <p><b>Actors:</b> {{info.Actors}}</p>
                <p><b>IMDB rating:</b><q-rating v-model="info.imdbRating" disable :max="10" icon="thumb_up" class="kp-raiting-wrapper"/></p>
                <hr>
                <p class="text-faded">{{info.Plot}}</p>
            </div>
        </div>
    </q-page>
</template>

<style lang="stylus">
    .kp-back-btn
      position absolute
      top: -20px
    .kp-img-thumbnail
      width: auto
      max-width: calc(100% - 20px)
      margin: 10px
    .kp-raiting-wrapper
      font-size 1.6rem
      color: red
</style>

<script>
import axios from 'axios'

export default {
  name: 'Film',
  data () {
    return {
      info: [],
      filmId: this.$route.params.id
    }
  },
  methods: {
    getFilms (filmId) {
      axios
        .get(this.$store.state.API.mainURL + `&i=` + filmId + `&plot=full`)
        .then(response => (this.info = response.data))
        .catch(response => {
          console.log(response)
        })
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  beforeMount () {
    this.getFilms(this.filmId)
  }
}
</script>
