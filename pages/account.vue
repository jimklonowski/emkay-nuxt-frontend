<template>
  <nuxt-child />
</template>

<script>
export default {
  name: 'Account',
  layout: 'account',
  head () {
    const title = this.$t('account_management')
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
