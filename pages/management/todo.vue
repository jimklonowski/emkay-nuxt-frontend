<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <add-or-edit-driver-form :driver-id="'AABBCC'" />
        <!-- <add-driver-form /> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AddOrEditDriverForm from '@/components/management/AddOrEditDriverForm'
export default {
  components: { AddOrEditDriverForm }
}
</script>
