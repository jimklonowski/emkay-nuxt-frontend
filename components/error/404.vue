<template>
  <div class="error-404">
    <h1>This page doesn't exist ({{ error.statusCode }})</h1>
    <p>{{ error.message }}</p>
  </div>
</template>
<script>
export default {
  name: 'error-404',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
