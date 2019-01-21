<template lang="pug">
.content
  .title.m-b-md {{ $store.getters.appName }}
  .links
      a(v-for='link in links'
        :href='link.url')
        | {{ link.name }}
</template>

<script lang='ts'>
export default {
  data: () => ({
    links: [
      {
        url: '#',
        name: 'Documentation'
      },
      {
        url: '#',
        name: 'News'
      }
    ]
  })
}
</script>