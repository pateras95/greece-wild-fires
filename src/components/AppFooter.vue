<template>
  <v-footer class="bg-grey-lighten-4 pa-4" elevation="4">
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="8">
          <div class="text-caption text-medium-emphasis mb-2">
            <v-icon size="16" class="mr-1">mdi-alert-circle-outline</v-icon>
            <strong>Disclaimer:</strong> Information here may be crowdsourced. 
            Follow official instructions from Civil Protection.
          </div>
          <div class="text-caption text-medium-emphasis">
            Data sources: Citizen reports, Official agencies, Weather services
          </div>
        </v-col>
        
        <v-col cols="12" md="4" class="text-md-right">
          <div class="text-caption text-medium-emphasis mb-2">
            <strong>Emergency:</strong> 199 (Fire) • 112 (General)
          </div>
          <div class="text-caption">
            <v-btn 
              href="mailto:contact@wildfire-watch.gr" 
              variant="text" 
              size="small"
              class="text-caption"
            >
              Contact Us
            </v-btn>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-3"></v-divider>
      
      <div class="text-center">
        <div class="text-caption text-medium-emphasis">
          © {{ currentYear }} Wildfire Watch Greece. Built to protect our communities.
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>