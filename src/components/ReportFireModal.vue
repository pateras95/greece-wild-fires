<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="600px"
    persistent
  >
    <v-card class="report-modal">
      <v-card-title class="bg-primary text-white">
        <v-icon class="mr-2">mdi-fire</v-icon>
        Report a Suspected Wildfire
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="closeModal"
        ></v-btn>
      </v-card-title>
      
      <v-card-subtitle class="pa-4 bg-orange-lighten-5 text-orange-darken-2">
        <v-icon class="mr-2">mdi-alert</v-icon>
        Share location and a photo if safe. Do not take risks.
      </v-card-subtitle>

      <v-card-text class="pa-6">
        <v-form ref="form" v-model="formValid">
          <!-- Location Section -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">
              <v-icon class="mr-2">mdi-map-marker</v-icon>
              Location
            </h3>
            
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="locationText"
                  label="Current Location"
                  readonly
                  variant="outlined"
                  density="compact"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="success" v-if="hasLocation">mdi-check-circle</v-icon>
                    <v-icon color="warning" v-else>mdi-alert-circle</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  color="primary"
                  variant="outlined"
                  block
                  @click="getCurrentLocation"
                  :loading="gettingLocation"
                >
                  <v-icon class="mr-1">mdi-crosshairs-gps</v-icon>
                  Get GPS
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- Photo Upload -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">
              <v-icon class="mr-2">mdi-camera</v-icon>
              Photo (Optional)
            </h3>
            <v-file-input
              v-model="photo"
              label="Upload photo of the incident"
              accept="image/*"
              variant="outlined"
              density="compact"
              prepend-icon="mdi-camera"
              :rules="photoRules"
            ></v-file-input>
          </div>

          <!-- What do you see? -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">What do you see?</h3>
            <v-radio-group
              v-model="whatSeen"
              inline
              :rules="[v => !!v || 'Please select what you see']"
            >
              <v-radio label="Smoke" value="SMOKE" color="primary"></v-radio>
              <v-radio label="Flames" value="FLAMES" color="primary"></v-radio>
              <v-radio label="Both" value="BOTH" color="primary"></v-radio>
            </v-radio-group>
          </div>

          <!-- Size Estimate -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Size Estimate</h3>
            <v-radio-group
              v-model="sizeEstimate"
              inline
              :rules="[v => !!v || 'Please estimate the size']"
            >
              <v-radio label="Small" value="SMALL" color="primary"></v-radio>
              <v-radio label="Medium" value="MEDIUM" color="primary"></v-radio>
              <v-radio label="Large" value="LARGE" color="primary"></v-radio>
            </v-radio-group>
          </div>

          <!-- Wind -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Wind Present?</h3>
            <v-radio-group
              v-model="windPresent"
              inline
            >
              <v-radio label="Yes" :value="true" color="primary"></v-radio>
              <v-radio label="No" :value="false" color="primary"></v-radio>
            </v-radio-group>
          </div>

          <!-- Notes -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Additional Notes</h3>
            <v-textarea
              v-model="notes"
              label="Dense smoke near pine forest..."
              variant="outlined"
              rows="3"
              no-resize
            ></v-textarea>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-btn
          variant="outlined"
          @click="closeModal"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!formValid || !hasLocation"
          :loading="submitting"
          @click="submitReport"
        >
          <v-icon class="mr-2">mdi-send</v-icon>
          Submit Report
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReportFireModal',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'submit'],
  data() {
    return {
      formValid: false,
      gettingLocation: false,
      submitting: false,
      location: null,
      locationText: '',
      hasLocation: false,
      photo: null,
      whatSeen: null,
      sizeEstimate: null,
      windPresent: null,
      notes: '',
      photoRules: [
        value => !value || value.length === 0 || value[0].size < 5000000 || 'Photo size should be less than 5 MB!'
      ]
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.getCurrentLocation()
      } else {
        this.resetForm()
      }
    }
  },
  methods: {
    async getCurrentLocation() {
      if (!navigator.geolocation) {
        this.locationText = 'Geolocation not supported'
        return
      }

      this.gettingLocation = true
      
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000
          })
        })
        
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
        
        this.locationText = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
        this.hasLocation = true
      } catch (error) {
        this.locationText = 'Unable to get location'
        this.hasLocation = false
      } finally {
        this.gettingLocation = false
      }
    },
    
    async submitReport() {
      if (!this.formValid || !this.hasLocation) return
      
      this.submitting = true
      
      const reportData = {
        location: this.location,
        report: {
          what: this.whatSeen,
          size: this.sizeEstimate,
          wind: this.windPresent || false,
          notes: this.notes || null,
          photos: [] // In a real app, this would include uploaded photo URLs
        },
        source: 'CITIZEN'
      }
      
      try {
        this.$emit('submit', reportData)
      } finally {
        this.submitting = false
      }
    },
    
    closeModal() {
      this.$emit('update:modelValue', false)
    },
    
    resetForm() {
      this.location = null
      this.locationText = ''
      this.hasLocation = false
      this.photo = null
      this.whatSeen = null
      this.sizeEstimate = null
      this.windPresent = null
      this.notes = ''
      this.formValid = false
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style scoped>
.report-modal {
  border-radius: 16px;
  overflow: hidden;
}
</style>