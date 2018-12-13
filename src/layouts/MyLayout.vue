<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-toolbar-title>
          Kinopoint
          <q-field :label="someState"></q-field>
        </q-toolbar-title>
      </q-toolbar>
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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    someState: {
      get () {
        return this.$store.state.defaultState.moduler
      }
    }
  }
}
</script>

<style>
</style>
