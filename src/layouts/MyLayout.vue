<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-toolbar-title>
          Kinopoint
          <q-field :label="mess"></q-field>
        </q-toolbar-title>
      </q-toolbar>
      <q-btn
        color="primary"
        @click="goBack"
        label="go back to search"
      />
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      mess: this.$store.state.defaultState.moduler,
      defaultId: this.$store.state.defaultState.defaultId,
      leftDrawerOpen: this.$q.platform.is.desktop,
      filmId: this.$route.params.id
    }
  },
  computed: {
    someState: {
      get () {
        return this.$store.state.defaultState.moduler
      }
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  beforeMount () {
    console.log(this.$route.params.id)
  }
}
</script>

<style>
</style>
