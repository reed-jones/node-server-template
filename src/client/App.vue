<template lang='pug'>
    div
        | Name:
        input(v-model="name" type="text")
        h1 Helo Component!
        p links:
        .top-right.links
          router-link(to="/") Home
          router-link(to="/secondpage") secondpage
          router-link(to="/error") 404 page
        hello-component(:name="name" :initialEnthusiasm="5")
        router-view
</template>


<script lang='ts'>
// In the current state, <script lang='ts'> works
// however it breaks HMR and causes full page refreshes

import Vue from 'vue'
import HelloComponent from './components/Hello.vue'

export default Vue.extend({
  data: () => ({
    name: '',
  }),
  mounted(): void {

  },
  components: {
    HelloComponent,
  },
})
</script>

<style lang="stylus">
body
    background #fff
</style>
