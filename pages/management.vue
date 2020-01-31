<template>
  <nuxt-child />
</template>

<script>
export default {
  name: 'Management',
  layout: 'management',
  head () {
    const title = this.$t('management')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  scrollToTop: false
}
</script>
