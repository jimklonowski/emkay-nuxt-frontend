<template>
  <v-btn>management</v-btn>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    tab: 0,

    management_categories: [
      {
        key: 'common.fleet',
        items: [
          { key: 'navigation.manage_your_online_users', to: '/todo' },
          { key: 'navigation.manage_your_fleet_policies', to: '/todo' },
          { key: 'navigation.customize_your_fleet_labels', to: '/todo' },
          { key: 'navigation.manage_your_drivers', to: '/todo' },
          { key: 'navigation.manage_your_driver_fuel_pins', to: '/todo' },
          { key: 'navigation.manage_your_enotifications', to: '/todo' },
          { key: 'navigation.manage_your_cases', to: '/todo' },
          { key: 'navigation.view_your_fuel_auth_profiles', to: '/todo' }
        ]
      },
      {
        key: 'navigation.customization',
        items: [
          { key: 'navigation.approve_your_maintenance_repairs', to: '/todo' },
          { key: 'navigation.approve_your_driver_orders', to: '/todo' },
          { key: 'navigation.request_an_mvr', to: '/todo' },
          { key: 'reporting.upload_your_odometers', to: '/todo' }
        ]
      },
      {
        key: 'navigation.tools',
        items: [
          { key: 'navigation.locate_preferred_shops', to: '/todo' },
          { key: 'navigation.quote_a_transport', to: '/todo' },
          { key: 'navigation.lcca', to: '/todo' }
        ]
      }
    ]
  })
}
</script>
