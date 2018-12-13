<template>
    <q-page class="flex flex-center">
        <q-list>
            <q-item>
                <q-item-side :image="info.Poster" />
                <q-item-main>
                    <q-item-tile label>{{info.Title}}</q-item-tile>
                    <q-item-tile sublabel>{{info.Year}}</q-item-tile>
                </q-item-main>
                <q-item-side right icon="movie" />
            </q-item>
        </q-list>
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
      info: null
    }
  },
  mounted () {
    axios
      .get(this.$store.state.API.mainURL + `&t=movie 43&plot=full`)
      .then(response => (this.info = response.data))
  }
}
</script>
