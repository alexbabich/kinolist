<template>
    <q-page class="flex flex-center">
        <div class="row">
            <q-btn
                color="primary"
                @click="goBack"
                label="go back to search"
            />
        </div>
        <div class="row">
            <q-card inline style="width: 500px">
                <q-card-media>
                    <img :src="info.Poster" />
                </q-card-media>
                <q-card-separator />
                <q-card-title>
                    {{info.Title}}
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <p>{{info.Year}}</p>
                    <p class="text-faded">{{info.Plot}}</p>
                </q-card-main>
            </q-card>
        </div>
        {{info}}
    </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'Film',
  data () {
    return {
      info: '',
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
