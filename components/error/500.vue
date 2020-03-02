<template>
  <div class="error-500">
    <h1>This page doesn't exist ({{ error.statusCode }})</h1>
    <p>{{ error.message }}</p>
  </div>
</template>
<script>
export default {
  name: 'error-500',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    debugger
  }
}
</script>
