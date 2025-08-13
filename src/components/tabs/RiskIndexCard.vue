<template>
  <div>
    <h3 class="text-h6 mb-4">Today's Fire Risk</h3>
    
    <v-card class="mb-4" elevation="2">
      <v-card-text>
        <div class="text-center mb-4">
          <v-avatar :color="getRiskColor(riskData?.level)" size="80" class="mb-3">
            <v-icon color="white" size="40">{{ getRiskIcon(riskData?.level) }}</v-icon>
          </v-avatar>
          <h2 class="text-h4 font-weight-bold" :class="`text-${getRiskColor(riskData?.level)}`">
            {{ riskData?.level || 'UNKNOWN' }}
          </h2>
          <div class="text-subtitle-1 text-medium-emphasis">
            Fire Risk Level
          </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <div v-if="riskData">
          <h4 class="text-subtitle-1 mb-3">Current Conditions</h4>
          
          <v-row>
            <v-col cols="6">
              <div class="condition-item">
                <v-icon color="red" class="mr-2">mdi-thermometer</v-icon>
                <div>
                  <div class="text-body-2 font-weight-medium">{{ riskData.tempC }}°C</div>
                  <div class="text-caption text-medium-emphasis">Temperature</div>
                </div>
              </div>
            </v-col>
            
            <v-col cols="6">
              <div class="condition-item">
                <v-icon color="blue" class="mr-2">mdi-water-percent</v-icon>
                <div>
                  <div class="text-body-2 font-weight-medium">{{ riskData.humidity }}%</div>
                  <div class="text-caption text-medium-emphasis">Humidity</div>
                </div>
              </div>
            </v-col>
            
            <v-col cols="12">
              <div class="condition-item">
                <v-icon color="grey" class="mr-2">mdi-weather-windy</v-icon>
                <div>
                  <div class="text-body-2 font-weight-medium">{{ riskData.windKph }} km/h</div>
                  <div class="text-caption text-medium-emphasis">Wind Speed</div>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div class="text-caption text-medium-emphasis">
            Last updated: {{ formatDate(riskData.date) }}
          </div>
        </div>

        <div v-else class="text-center py-4">
          <v-icon size="48" color="grey" class="mb-2">mdi-alert-circle-outline</v-icon>
          <div class="text-medium-emphasis">Risk data unavailable</div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Risk Level Explanations -->
    <v-expansion-panels variant="accordion">
      <v-expansion-panel title="Risk Level Guide">
        <v-expansion-panel-text>
          <div class="risk-guide">
            <div class="risk-level mb-3">
              <v-chip color="green" size="small" class="mr-2">LOW</v-chip>
              <span class="text-body-2">Minimal fire risk. Conditions are favorable.</span>
            </div>
            
            <div class="risk-level mb-3">
              <v-chip color="yellow" size="small" class="mr-2">MODERATE</v-chip>
              <span class="text-body-2">Some fire risk. Use caution with open flames.</span>
            </div>
            
            <div class="risk-level mb-3">
              <v-chip color="orange" size="small" class="mr-2">HIGH</v-chip>
              <span class="text-body-2">Elevated fire risk. Avoid outdoor burning.</span>
            </div>
            
            <div class="risk-level">
              <v-chip color="red" size="small" class="mr-2">EXTREME</v-chip>
              <span class="text-body-2">Dangerous conditions. Total fire ban in effect.</span>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'RiskIndexCard',
  props: {
    riskData: {
      type: Object,
      default: null
    }
  },
  methods: {
    getRiskColor(level) {
      const colors = {
        'LOW': 'green',
        'MODERATE': 'yellow',
        'HIGH': 'orange', 
        'EXTREME': 'red'
      }
      return colors[level] || 'grey'
    },
    
    getRiskIcon(level) {
      const icons = {
        'LOW': 'mdi-shield-check',
        'MODERATE': 'mdi-alert',
        'HIGH': 'mdi-fire',
        'EXTREME': 'mdi-fire-alert'
      }
      return icons[level] || 'mdi-help-circle'
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Unknown'
      return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.condition-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.risk-guide .risk-level {
  display: flex;
  align-items: center;
}
</style>