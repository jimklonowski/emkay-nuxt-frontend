<template>
  <nuxt-child />
</template>

<script>
export default {
  name: 'Management',
  layout: 'management',
  middleware: ['auth', 'account'],
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
