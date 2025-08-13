<template>
  <div>
    <h3 class="text-h6 mb-4">Regional Alerts</h3>
    
    <!-- Subscribe Section -->
    <v-card class="mb-4" elevation="2">
      <v-card-title class="bg-secondary text-white">
        <v-icon class="mr-2">mdi-bell-alert</v-icon>
        Get Notified
      </v-card-title>
      
      <v-card-text>
        <p class="text-body-2 mb-4">
          Subscribe to receive alerts for your region via email.
        </p>
        
        <v-form v-model="subscriptionFormValid" @submit.prevent="subscribe">
          <v-text-field
            v-model="subscriptionEmail"
            label="Email address"
            type="email"
            variant="outlined"
            density="compact"
            :rules="emailRules"
            class="mb-3"
          ></v-text-field>
          
          <v-select
            v-model="subscriptionRegions"
            :items="regionOptions"
            label="Select regions"
            multiple
            variant="outlined"
            density="compact"
            :rules="[v => v.length > 0 || 'Select at least one region']"
            class="mb-3"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 2" size="small">{{ item.title }}</v-chip>
              <span v-if="index === 2" class="text-caption text-medium-emphasis">
                (+{{ subscriptionRegions.length - 2 }} others)
              </span>
            </template>
          </v-select>
          
          <v-btn
            color="secondary"
            variant="elevated"
            block
            :disabled="!subscriptionFormValid"
            :loading="subscribing"
            @click="subscribe"
          >
            <v-icon class="mr-2">mdi-email-outline</v-icon>
            Subscribe
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Active Alerts -->
    <div>
      <h4 class="text-subtitle-1 mb-3">Active Alerts</h4>
      
      <div v-if="alerts.length === 0" class="text-center py-8">
        <v-icon size="48" color="grey" class="mb-2">mdi-bell-off</v-icon>
        <div class="text-medium-emphasis">No active alerts</div>
      </div>

      <v-card
        v-for="alert in alerts"
        :key="alert.id"
        class="mb-3"
        :color="getSeverityColor(alert.severity)"
        variant="tonal"
      >
        <v-card-text>
          <div class="d-flex align-center mb-2">
            <v-icon :color="getSeverityColor(alert.severity)" class="mr-2">
              {{ getSeverityIcon(alert.severity) }}
            </v-icon>
            <v-chip 
              :color="getSeverityColor(alert.severity)"
              size="small"
              class="mr-2"
            >
              {{ alert.severity }}
            </v-chip>
            <div class="text-subtitle-2 font-weight-bold">{{ alert.region }}</div>
          </div>
          
          <p class="text-body-2 mb-2">{{ alert.message }}</p>
          
          <div class="text-caption text-medium-emphasis">
            <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
            {{ formatDate(alert.createdAt) }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertsCard',
  props: {
    alerts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      subscriptionFormValid: false,
      subscribing: false,
      subscriptionEmail: '',
      subscriptionRegions: [],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      regionOptions: [
        { title: 'Attica', value: 'Attica' },
        { title: 'Central Macedonia', value: 'Central Macedonia' },
        { title: 'Thessaly', value: 'Thessaly' },
        { title: 'Crete', value: 'Crete' },
        { title: 'Western Greece', value: 'Western Greece' },
        { title: 'Central Greece', value: 'Central Greece' },
        { title: 'Peloponnese', value: 'Peloponnese' },
        { title: 'Epirus', value: 'Epirus' }
      ]
    }
  },
  methods: {
    getSeverityColor(severity) {
      const colors = {
        'INFO': 'blue',
        'WATCH': 'orange',
        'WARNING': 'red',
        'EVACUATE': 'red'
      }
      return colors[severity] || 'blue'
    },
    
    getSeverityIcon(severity) {
      const icons = {
        'INFO': 'mdi-information',
        'WATCH': 'mdi-eye',
        'WARNING': 'mdi-alert',
        'EVACUATE': 'mdi-run-fast'
      }
      return icons[severity] || 'mdi-information'
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    async subscribe() {
      if (!this.subscriptionFormValid) return
      
      this.subscribing = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Show success message
        this.$emit('show-toast', {
          message: 'Successfully subscribed to alerts!',
          color: 'success'
        })
        
        // Reset form
        this.subscriptionEmail = ''
        this.subscriptionRegions = []
        this.subscriptionFormValid = false
      } catch (error) {
        this.$emit('show-toast', {
          message: 'Failed to subscribe. Please try again.',
          color: 'error'
        })
      } finally {
        this.subscribing = false
      }
    }
  }
}
</script>