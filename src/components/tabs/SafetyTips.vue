<template>
  <div>
    <h3 class="text-h6 mb-4">Fire Safety Guide</h3>
    
    <v-expansion-panels variant="accordion" multiple>
      <!-- Before a Fire -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon color="green" class="mr-3">mdi-shield-check</v-icon>
          <strong>Before a Fire</strong>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="green" size="small">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Create a defensible space around your home by clearing vegetation
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="green" size="small">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Install smoke detectors and check batteries regularly
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="green" size="small">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Prepare an emergency kit with water, food, medications, and documents
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="green" size="small">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Plan evacuation routes and practice with family members
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="green" size="small">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Keep fire extinguishers accessible and service them annually
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- During a Fire -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon color="red" class="mr-3">mdi-fire-alert</v-icon>
          <strong>During a Fire</strong>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-alert color="red" variant="tonal" class="mb-4">
            <v-icon slot="prepend">mdi-alert</v-icon>
            <strong>If you see fire or smoke, call emergency services immediately: 199</strong>
          </v-alert>
          
          <v-list density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="red" size="small">mdi-alert-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Follow evacuation orders immediately - do not delay
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="red" size="small">mdi-alert-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                If trapped, call for help and signal from windows
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="red" size="small">mdi-alert-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Stay low to avoid smoke inhalation
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="red" size="small">mdi-alert-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Cover nose and mouth with damp cloth if smoke is present
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="red" size="small">mdi-alert-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Do not use elevators during evacuation
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- After a Fire -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon color="blue" class="mr-3">mdi-home-search</v-icon>
          <strong>After a Fire</strong>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="blue" size="small">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Wait for official clearance before returning home
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="blue" size="small">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Check for structural damage before entering buildings
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="blue" size="small">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Document damage with photos for insurance claims
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="blue" size="small">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Be aware of hazards like downed power lines and unstable trees
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="blue" size="small">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                Watch for flare-ups and report any new fires immediately
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Emergency Contacts -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon color="purple" class="mr-3">mdi-phone-alert</v-icon>
          <strong>Emergency Contacts</strong>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="red">
                  <v-icon color="white">mdi-fire-truck</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">Fire Brigade</v-list-item-title>
              <v-list-item-subtitle>199</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="blue">
                  <v-icon color="white">mdi-police-badge</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">Police</v-list-item-title>
              <v-list-item-subtitle>100</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="green">
                  <v-icon color="white">mdi-ambulance</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">Medical Emergency</v-list-item-title>
              <v-list-item-subtitle>166</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="orange">
                  <v-icon color="white">mdi-shield-alert</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">Civil Protection</v-list-item-title>
              <v-list-item-subtitle>112</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'SafetyTips'
}
</script>