<template>
  <nuxt-child />
</template>

<script>
/**
 * Vehicle Dashboard wrapper
 */
export default {
  name: 'VehicleDashboard',
  layout: 'vehicle',
  middleware: ['auth', 'vehicle-dashboard', 'account']
}
</script>
